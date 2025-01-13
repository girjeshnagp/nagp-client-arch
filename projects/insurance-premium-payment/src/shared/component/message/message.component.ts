import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from '../../message.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  imports: [CommonModule]
})
export class MessageComponent implements OnInit, OnDestroy {
  message: string = '';
  messageClass: string = '';
  private messageSubscription: Subscription | null = null;

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.messageSubscription = this.messageService.message$.subscribe(
      (message) => {
        this.message = message.text;
        this.messageClass = message.type === 'error' ? 'message-box error' : 'message-box';
        if (message.text) {
          setTimeout(() => {
            this.messageService.clearMessage();
          }, 5000);
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }

  private clearMessage(): void {
    const messageBox = document.querySelector('.message-box');
    if (messageBox) {
      messageBox.classList.add('fadeOut');
    }
    setTimeout(() => {
      this.message = '';
    }, 500);
  }

  closeMessage(): void {
    this.clearMessage();
  }
}
