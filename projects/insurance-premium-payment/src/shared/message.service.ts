import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

interface Message {
  text: string;
  type: 'success' | 'error';
}
@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messageSource = new BehaviorSubject<Message>({ text: '', type: 'success' });
  message$ = this.messageSource.asObservable();

  showMessage(message: string, type: 'success' | 'error') {
    this.messageSource.next({ text: message, type });
  }

  clearMessage() {
    this.messageSource.next({ text: '', type: 'success' });
  }
}
