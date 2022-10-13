import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  token = localStorage.getItem('token')

  constructor(private _ProductService: ProductService, private _ToastrService: ToastrService, private _Router: Router) {
    if (this.token) {
      this._Router.navigate([''])
    }
  }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    applicationName: new FormControl('web', Validators.required)
  })

  get loginFormValidate() {
    return this.loginForm.controls
  }



  onLogin() {
    this._ProductService.login(this.loginForm.value).subscribe(login => {
      this._ToastrService.success('login succesfully💛')
      this._ProductService.isLogin = true
      localStorage.setItem('token', login.token)
      localStorage.setItem('idUser', login.id)
      localStorage.setItem('loginUser', login.userName)
      this._Router.navigate([''])
      this.loginForm.reset()
      this._ProductService.showHide(true)
    },
      (error) => {
        switch (error.status) {
          case 500:
            this._ToastrService.error(error.error.errors as string);
            break
          case 401:
            for (const [key, value] of Object.entries(error.error.errors)) {
              this._ToastrService.error(value as string);
            }
            break
          case 400:
            for (const [key, value] of Object.entries(error.error.errors)) {
              this._ToastrService.error(value as string);
            }
            break
        }
      }, () => { })

  }

}
