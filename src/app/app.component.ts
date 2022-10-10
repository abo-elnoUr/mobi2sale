import { Component } from '@angular/core';
import { ProductService } from './core/services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dashboard';
  showNav: boolean = false

  constructor(private _ProductService: ProductService){
    const token = localStorage.getItem('token')
    if(token){
      this._ProductService.showNav = true
      this.showNav = this._ProductService.showNav
    }
  }
}


