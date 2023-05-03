import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  address: any;

  constructor(private http: HttpClient) {}

  signup(data: any): Observable<any> {
    return this.http.post(`${environment.URL}/auth/register`, data);
  }

  signin(data: any): Observable<any> {
    return this.http.post(`${environment.URL}/auth/login`, data);
  }


  getProfile(): Observable<any> {
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    };
    return this.http.get(`${environment.URL}/auth/profile`, {
      headers: headers,
    }).pipe(
      tap((res: any) => {
        if (res.success) {
          this.address = res.data.address;
        }
      })
    );
  }



  updateAddress(address: any): Observable<any> {
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    };

    return this.http.put(`${environment.URL}/auth/address`, this.address = address,  {
      headers: headers,
    }).pipe(
      tap((res: any) => {
        this.address = res.data;
      })
    );
  }


  getAddress(): Observable<any> {
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    };
    return this.http.get(`${environment.URL}/auth/address`, {
      headers: headers,
    });
  }


}
