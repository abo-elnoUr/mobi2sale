import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';

import * as $ from "jquery";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  token = localStorage.getItem('token')

  constructor(public _ProductService:ProductService, private _Router: Router) {
    if (this.token) {
      _ProductService.isLogin = true
    } else {
      _ProductService.isLogin = false
    }
   }

  ngOnInit(): void {
    $(document).ready(function(){
			$(".notification_icon .fa-bell").click(function(){
				$(".dropdown").toggleClass("active");
			})
		});
  }

  logout(){
      this._ProductService.isLogin = false
      this._ProductService.showNav = false
      window.location.reload()
      localStorage.removeItem('idUser')
      localStorage.removeItem('token')
      localStorage.removeItem('loginUser')
      this._Router.navigate(['login'])
  }
}
