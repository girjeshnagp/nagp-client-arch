import { Component } from '@angular/core';
import { CorsWorker as Worker } from './cors-worker';
import { CommonModule } from '@angular/common';
import { PolicyService } from '../../../insurance-container/src/app/shared/policy.service'

interface Policy {
  name: string;
  type: string;
  status: string;
  policyAmount: number;
  term: number;
  isActive: boolean;
  isDetailsLoading: boolean;
  policyNumber?: string;
  issueDate?: string;
  insuredValue?: number;
  statusDetails?: string;
  additionalNotes?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [CommonModule],
  providers: [PolicyService],
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  message: string = 'Loading data...';
  policies: Policy[] = [];
  policySentForPremium: boolean = false;

  constructor(private sharedService: PolicyService) {
    const corsWorker = new Worker(new URL('../../data-worker.worker', import.meta.url));
    const worker = corsWorker.getWorker();

    worker.onmessage = ({ data }) => {
      if (data.result) {
        this.message = '';
        this.policies = data.result.map((policy: Policy) => ({
          ...policy,
          isActive: false,
          isDetailsLoading: false,
        }));
      }
    };

    worker.postMessage({
      action: 'fetchData',
      payload: 'Policy details data',
    });
  }

  togglePolicyDetails(policy: Policy) {
    policy.isActive = !policy.isActive;

    if (policy.isActive && !policy.insuredValue) {
      this.loadPolicyDetails(policy);
    }
  }

  loadPolicyDetails(policy: Policy) {
    policy.isDetailsLoading = true;

    const corsWorker = new Worker(new URL('../../data-worker.worker', import.meta.url));
    const worker = corsWorker.getWorker();

    worker.onmessage = ({ data }) => {
      if (data.result) {
        policy.policyNumber = data.result.policyNumber;
        policy.issueDate = data.result.issueDate;
        policy.insuredValue = data.result.insuredValue;
        policy.statusDetails = data.result.statusDetails;
        policy.additionalNotes = data.result.additionalNotes;
        policy.isDetailsLoading = false;
      }
    };

    worker.postMessage({
      action: 'fetchPolicyDetails',
      payload: policy.name,
    });
  }

  calculatePremium(policy: Policy) {
    const event = new CustomEvent('transferPolicy', {
      detail: policy,
      bubbles: true,
    });
    window.dispatchEvent(event);
    this.policySentForPremium = true;
  }
}
