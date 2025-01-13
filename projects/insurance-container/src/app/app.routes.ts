import { Routes } from '@angular/router';
import { HomeComponent } from './basic/home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
      },
 
      {
        path: 'my-insurance',
        loadComponent: () => 
            import('insurancePolicyDetails/Component').then(m => m.AppComponent)
      },
      {
        path: 'my-payment',
        loadComponent: () => 
            import('insurancePremiumPayment/Component').then(m => m.AppComponent)
      },
];
