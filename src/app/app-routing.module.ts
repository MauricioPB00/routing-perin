import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { StoreComponent } from './store/store.component';
import { CustomerComponent} from './customer/customer.component'
import { InvoicingComponent } from './invoicing/invoicing.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent},
  { path: 'store', component: StoreComponent},
  { path: 'customer', component: CustomerComponent},
  { path: 'invoicing', component: InvoicingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
