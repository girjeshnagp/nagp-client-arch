import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PolicyService {
  private policySubject = new BehaviorSubject<any>(null);
  policy$ = this.policySubject.asObservable();

  setPolicy(policy: any) {
    this.policySubject.next(policy);
  }
}
