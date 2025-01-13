import { CommonModule } from '@angular/common';
import { Component, OnDestroy, SecurityContext } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MessageService } from '../shared/message.service';
import { MessageComponent } from '../shared/component/message/message.component';

interface Policy {
  name: string;
  type: string;
  status: string;
  policyAmount: number;
  term: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [CommonModule, FormsModule, MessageComponent],
  providers: [MessageService],
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  policyName: string = '';
  policyAmount: number = 0;
  term: number = 0;
  email: string = '';
  calculatedPremium: number | null = null;
  isSelectedPolicy: boolean = false;

  constructor(private router: Router, 
    private sanitizer: DomSanitizer, 
    private messageService: MessageService) {
    const storedPolicy = localStorage.getItem('selectedPolicy');
    if (storedPolicy) {
      let policyDetail = JSON.parse(storedPolicy);
      this.populatePolicy(policyDetail);
    }
  }

  ngOnDestroy(): void {
    localStorage.clear();
  }

  populatePolicy(policyDetail: Policy) {
    this.isSelectedPolicy = true;
    this.policyName = policyDetail.name;
    this.policyAmount = policyDetail.policyAmount;
    this.term = policyDetail.term;
    this.email = 'user@myinsurance.com'
    this.calculatePremium();
  }

  calculatePremium() {
    const sanitizedEmail = this.sanitizeInput(this.email);
    if (sanitizedEmail !== this.email) {
      this.messageService.showMessage('Email contains potentially unsafe content. Action blocked!', 'error');
      return;
    }
    if (!this.isValidEmail(sanitizedEmail)) {
      this.messageService.showMessage('Invalid email address!', 'error');
      return;
    }
    this.policyAmount = parseFloat(this.sanitizeInput(this.policyAmount.toString()) || '0');
    this.term = parseInt(this.sanitizeInput(this.term.toString()) || '0', 10);
    const rate = 0.05;
    this.calculatedPremium = this.policyAmount * this.term * rate;
    this.messageService.showMessage(`Premium calculated successfully for email: ${sanitizedEmail}`, 'success');
  }

  payPremium() {
    if (this.calculatedPremium !== null) {
      this.messageService.showMessage(`Payment for $${this.calculatedPremium} for your policy is being processed.`, 'success');
    }
  }

  resetPolicy() {
    this.isSelectedPolicy = false;
    this.policyAmount = 0;
    this.term = 0;
    this.email = '';
    this.calculatedPremium = null;
    this.router.navigate(['/my-insurance']);
  }

  resetPremium() {
    this.calculatedPremium = null;
  }

  editPolicy() {
    this.isSelectedPolicy = false;
  }
  
  sanitizeInput(input: string | number): string {
    let inputString = input.toString();
    let sanitized = this.sanitizer.sanitize(SecurityContext.HTML, inputString);
    return sanitized || '';
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
