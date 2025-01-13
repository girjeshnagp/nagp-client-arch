import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [CommonModule],
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  steps = [
    {
      title: 'Step 1: Choose Your Plan',
      description: 'Browse through our wide variety of insurance plans and choose the one that fits your needs.',
      icon: 'fas fa-check-circle'
    },
    {
      title: 'Step 2: Provide Your Details',
      description: 'Fill out a quick form with your personal and insurance details to get started.',
      icon: 'fas fa-user-edit'
    },
    {
      title: 'Step 3: Get Your Quote',
      description: 'Based on your details, we will generate a quote and provide options for your premium payments.',
      icon: 'fas fa-calculator'
    },
    {
      title: 'Step 4: Make Payment',
      description: 'Make a secure payment to confirm your insurance coverage.',
      icon: 'fas fa-credit-card'
    }
  ];
  currentStep: number = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    setInterval(() => {
      this.currentStep = (this.currentStep + 1) % this.steps.length;
    }, 1000);
  }

  goToStep(index: number): void {
    this.currentStep = index;
  }

  goToPolicyDetails() {
    this.router.navigate(['/my-insurance']);
  }

  goToPremiumPayment() {
    this.router.navigate(['/my-payment']);
  }
}
