import { NgModule } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditAddressComponent } from "./pages/edit-address/edit-address.component";
import { ProfileComponent } from "./pages/profile/profile.component";


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'edit-address', component: EditAddressComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '**', component: DashboardComponent },

];

@NgModule({ declarations: [
  DashboardComponent,
  LoginComponent,
  RegisterComponent,
  ProfileComponent,
  EditAddressComponent

],
  imports: [BrowserModule,ReactiveFormsModule,FormsModule,RouterModule.forRoot(routes)],
  exports: [RouterModule,ReactiveFormsModule,FormsModule]
})
export class AppRoutingModule {}
