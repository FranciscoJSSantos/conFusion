import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ÉµNgSelectMultipleOption,
} from '@angular/forms';
import { expand, flyInOut } from '../animations/app.animation';
import { FeedbackService } from '../services/feedback.service';
import { ContactType, Feedback } from '../shared/feedback';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    style: 'display: block;',
  },
  animations: [flyInOut(), expand()],
})
export class ContactComponent implements OnInit {
  feedbackForm!: FormGroup;
  feedback!: Feedback | null;
  contactType = ContactType;
  @ViewChild('fform') feedbackFormDirective: any;
  errMess?: string;

  feedbacks: Feedback[] | undefined;
  feedbackcopy: Feedback | null = null;
  showSpinner = false;
  showFeedbackForm = true;
  showFeedback = false;

  formErrors: any = {
    firstname: '',
    lastname: '',
    telnum: '',
    email: '',
  };

  validationMessages: any = {
    firstname: {
      required: 'First name is required.',
      minlength: 'First name must beat least 2 characters long.',
      maxlength: 'First name connot be more than 2 characters.',
    },
    lastname: {
      required: 'Last name is required.',
      minlength: 'Last name must beat least 2 characters long.',
      maxlength: 'Last name connot be more than 2 characters.',
    },
    telnum: {
      required: 'Tel. number is required.',
      pattern: 'Tel. number must contain only numbers.',
    },
    email: {
      required: 'Email  is required.',
      email: 'Email not in valid format.',
    },
  };

  constructor(
    private fb: FormBuilder,
    private feedbackService: FeedbackService
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25),
        ],
      ],
      lastname: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25),
        ],
      ],
      telnum: [0, [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      agree: false,
      contacttype: 'None',
      message: '',
    });

    this.feedbackForm.valueChanges.subscribe((data) =>
      this.onValueChanged(data)
    );

    this.onValueChanged(); //(re)set form validation messages
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) {
      return;
    }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        //clear previous erro message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.feedback = this.feedbackForm.value;
    this.feedbackService.submitFeedback(this.feedback);

    setTimeout(() => {
      this.showFeedbackForm = true;
      this.feedbackcopy = this.feedback;
    }, 5000);

    this.showFeedbackForm = false;
    this.feedbackcopy = null;

    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: 0,
      email: '',
      agree: false,
      contacttype: 'None',
      message: '',
    });

    this.feedbackFormDirective.resetForm();
  }
}
