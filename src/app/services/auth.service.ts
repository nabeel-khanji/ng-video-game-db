import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
   headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    'Authorization': 'Bearer szdp79a2kz4wh4frjzuqu4sz6qeth8m3',
  });
  // private _baseUrl!: ;

  constructor(private http: HttpClient) {}
  // registerUser(user: any) {
  //   return this.http.post<any>(`${this._baseUrl}/users/register`, user);
  // }

  loginUser(user: any) {
    console.log(user);
    return this.http.post<any>("/users/login", user,{'headers':this.headers});
  }
}
