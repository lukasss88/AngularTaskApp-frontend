import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { User } from '../models/user';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private toastr: ToastrService,
    private router: Router  
  ) { }

  loginUser: User = { email: '', password: '' }  

  ngOnInit() {
  }

  login(form: NgForm) {
    if(!form.valid) {
      this.toastr.error("The form is invalid", "Error", {positionClass: 'toast-bottom-right'})
      return;
    }

    this.loginService.login(this.loginUser)
      .subscribe(
        res => {
          localStorage.setItem('token', res.token)
          this.toastr.success("User logged in successfully", "Success",  {positionClass: 'toast-bottom-right'}),
          this.router.navigate(['/tasks'])
        },
        err => console.log('Error: ' + err)
      )
  }

}
