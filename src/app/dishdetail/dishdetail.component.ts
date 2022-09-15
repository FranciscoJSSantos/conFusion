import { Location } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs';
import { DishService } from '../services/dish.service';
import { Comment } from '../shared/comment';
import { Dish } from '../shared/dish';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
})
export class DishdetailComponent implements OnInit {
  dish: Dish | any;
  errMess?: string;
  dishIds: string[] | any;
  prev: string | undefined;
  next: string | undefined;
  commentForm!: FormGroup;
  comment!: Comment;

  dishcopy?: Dish | any;

  @ViewChild('fform') commentFormDirective: any;

  formErrors: any = {
    author: '',
    comment: '',
    rating: 5,
  };

  validationMessages: any = {
    author: {
      required: 'Author name is required.',
      minlength: 'Author name must beat least 2 characters long.',
      maxlength: 'Author name connot be more than 2 characters.',
    },
    comment: {
      required: 'Comment is required.',
      minlength: 'Comment must beat least 1 characters long.',
    },
  };

  constructor(
    private dishService: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') public BaseURL: any
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.dishService
      .getDishIds()
      .subscribe((dishIds) => (this.dishIds = dishIds));
    this.route.params
      .pipe(
        switchMap((params: Params) => this.dishService.getDish(params['id']))
      )
      .subscribe(
        (dish: any) => {
          this.dish = dish;
          this.dishcopy = dish;
          this.setPrevNext(dish.id);
        },
        (errmess) => (this.errMess = errmess)
      );
  }

  createForm() {
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2)]],
      rating: [5],
      comment: ['', [Validators.required, Validators.minLength(1)]],
    });

    this.commentForm.valueChanges.subscribe((data) =>
      this.onValueChanged(data)
    );

    this.onValueChanged(); //(re)set form validation messages
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) {
      return;
    }
    const form = this.commentForm;
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
    this.comment = this.commentForm.value;
    const d = new Date();
    let date = d.toISOString();

    this.comment.date = date;
    console.log(this.comment);
    this.dishcopy?.comments.push(this.comment);
    this.dishService.putDish(this.dishcopy).subscribe(
      (dish) => {
        this.dish = dish;
        this.dishcopy = dish;
      },
      (errmess) => {
        this.dish = null;
        this.dishcopy = null;
        this.errMess = errmess;
      }
    );
    this.commentFormDirective.resetForm();
    this.commentForm.reset({
      author: '',
      comment: '',
      rating: 5,
    });
  }

  setPrevNext(dishId: string) {
    const index: any = this.dishIds?.indexOf(dishId);
    this.prev =
      this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];

    this.next =
      this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }
}
