import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service';
import { User } from '../models/user';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  constructor(
    private registerService: RegisterService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  registerUser: User = {
    email: '',
    password: ''
  }

  ngOnInit() {
  }

  register(form: NgForm) {
    if(!form.valid) {
      this.toastr.error("The form is invalid", "Error", {positionClass: 'toast-bottom-right'})
      return;
    }
    this.registerService.register(this.registerUser)
      .subscribe(
        res => {
          localStorage.setItem('token', res.token)
          this.toastr.success('Success', 'Registration is completed', {positionClass: 'toast-bottom-right'});
          console.log('register succes: ' + JSON.stringify(res))
          this.router.navigate(['tasks'])
        },
        err => console.log('Error: ' + err)
      )
  }


}
