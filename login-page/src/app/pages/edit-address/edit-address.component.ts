import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css']
})
export class EditAddressComponent implements OnInit {
  EditAddressForm: FormGroup;
  address: any;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private http: HttpClient
  ) {
    this.EditAddressForm = this.fb.group({
      addressLine1: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', Validators.required],
    });

    if (this.EditAddressForm) {
      this.EditAddressForm.patchValue(this.address);
    }


    this.EditAddressForm?.get('postalCode')?.valueChanges.subscribe((postalCode: string) => {
      if (postalCode.length === 6) {
        this.http.get<any>(`https://api.postalpincode.in/pincode/${postalCode}`).subscribe(res => {
          if (res[0].Status === "Success") {
            const postOffice = res[0].PostOffice[0];

            this.address = {
              addressLine1: postOffice.Name,
              city: postOffice.District,
              state: postOffice.State,
              postalCode: postalCode
            };
            this.EditAddressForm.patchValue(this.address);
          }
        });
      }
    });
  }

  ngOnInit(): void {

    this.EditAddressForm.patchValue(this.address);
  }

onSubmit() {
  this.auth.updateAddress(this.address);
  this.router.navigate(['/profile']);
}


}







