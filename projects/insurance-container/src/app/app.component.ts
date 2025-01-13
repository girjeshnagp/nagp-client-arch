import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { fromEvent } from 'rxjs';

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
  imports: [RouterOutlet],
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'insurance-container';
  goToHome() {
    this.router.navigate(['/']);
  }
  constructor(private router: Router) {
    // fromEvent(window, 'transferPolicy').subscribe((event) => {
    //   alert(event);
    // })
    window.addEventListener('transferPolicy', this.handlePolicyEvent.bind(this));
  }

  handlePolicyEvent(event: any) {
    let policyDetail: Policy = event.detail;
    localStorage.setItem('selectedPolicy', JSON.stringify(policyDetail));
    this.router.navigate(['/my-payment']);
  }
}
