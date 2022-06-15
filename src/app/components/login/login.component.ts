import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  id = 3;
  loginUserData = {};
  constructor(private router: Router, private _authService: AuthService) {}
  onSubmit(form: NgForm) {
    this.loginUserData = form.value;
    console.log(this.loginUserData);
    console.log(this.loginUser());

  }
  ngOnInit(): void {}

  loginUser() {
    this._authService.loginUser(this.loginUserData).subscribe(
      
      (res) => {
        this.router.navigate(['home', res._id]);
      },
      (err) => console.log(err)
    );
    
  }
}
