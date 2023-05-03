import { Component,  OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']

})
export class DashboardComponent implements OnInit{
  signupForm!: FormGroup;


  constructor (private fb:FormBuilder ) {
    this.signupForm = this.fb.group({
      'displayName':['', Validators.required],
      'email':['', Validators.required],
      'password':['', Validators.required]
    })
  }

  ngOnInit(): void {
  }
  signup() {
    alert("Logged in Sucessfully")
  }


}
