import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SalesOpreationsService } from 'src/app/core/services/sales-opreations.service';


import { SalesMan } from 'src/app/shared/models/salesMan';
import { SubDepartment } from 'src/app/shared/models/subDepartment';
@Component({
  selector: 'app-sales-refund',
  templateUrl: './sales-refund.component.html',
  styleUrls: ['./sales-refund.component.css'],
  providers: [DatePipe]
})
export class SalesRefundComponent implements OnInit {

  salesRefunds: any[] = []
  myDate: string
  activeUser: string = ''
  salesmans: SalesMan[] = []
  stores: SubDepartment[] = []
  showManual: boolean = true
  products2: any[] = []


  constructor(private _SalesOpreationsService: SalesOpreationsService, private _DatePipe: DatePipe) { }

  ngOnInit(): void {
    this.activeUser = localStorage.getItem('loginUser')
    this.myDate = this._DatePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  openModal() {

  }

  toggleManual(val: boolean) {
    this.showManual = val
  }

  onAddSelectSalesmanId(event: any) {

  }

  onAddSelectStoreId(event: any) {

  }

  removeFromProduct(index: number, pro: any) {

  }

}
