import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { AllproductsComponent } from './Components/allproducts/allproducts.component';
import { ProductdetailsComponent } from './Components/productdetails/productdetails.component';
import { CartComponent } from './Components/cart/cart.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
const routes: Routes = 
[
  { path: '', redirectTo: '/Home', pathMatch: 'full' },  //Make home as Root Page
  {path:'Home',component:HomeComponent},
  {path:'Products',component:AllproductsComponent},
  {path :'products/:id',component:ProductdetailsComponent},
  {path :'cart',component:CartComponent},
  {path :'login',component:LoginComponent},
  {path :'register',component:RegisterComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
