import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { baseURL } from '../shared/baseurl';
import { Feedback } from '../shared/feedback';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) {}

  submitFeedback(feedback: Feedback | null): Observable<Feedback | any> {
    return this.http
      .post<Feedback | undefined>(baseURL + 'feeedback', feedback)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeedbacksIds(): Observable<string[] | any> {
    return this.getFeedbacks()
      .pipe(map((feedback) => feedback?.map((feedback) => feedback.id)))
      .pipe(catchError((error) => error));
  }

  getFeedbacks(): Observable<Feedback[] | undefined> {
    return this.http
      .get<Feedback[]>(baseURL + 'feedback')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
