import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  data: any;
  address: any = this.auth.address
  editMode: boolean = false;


  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile() {
    this.auth.getProfile().subscribe(
      (res) => {
        console.log(res);
        if (res.success) {
          this.data = res.data;

          if (this.data.address) {
            this.auth.getAddress().subscribe((res) => {
              this.data.address = res.data;
            },
            (err) => {
              console.log(err);
            }
            );
          }
        } else {
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  onAddressUpdated(updatedAddress: any) {
    this.auth.address = updatedAddress;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/dashboard']);
  }

  editAddress() {
    this.editMode = true;
    this.router.navigate(['/edit-address']);

  }

  saveAddress(addressLine1: string, city: string, state: string, postalCode: string){

    const updatedAddress = {
      ...this.address,
      addressLine1: addressLine1,
      city: city,
      state: state,
      postalCode: postalCode
    };

    this.auth.updateAddress(updatedAddress).subscribe(
    (res) => {
      console.log(res);
      this.editMode = false;
      this.address = res.data;
    },
    (err) => {
      console.log(err);
    }
  );
}


  cancelEdit() {
    this.editMode = false;
  }
}
