import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SalesOpreationsService } from 'src/app/core/services/sales-opreations.service';

import { Branch } from 'src/app/shared/models/branchs';

@Component({
  selector: 'app-indoor-invoice',
  templateUrl: './indoor-invoice.component.html',
  styleUrls: ['./indoor-invoice.component.css'],
  providers: [DatePipe]
})
export class IndoorInvoiceComponent implements OnInit {

  myDate: string
  activeUser: string = ''
  branchs: Branch[] = []
  showManual: boolean = true
  invoices: any[] = []
  products: any[] = []
  products2: any[] = []

  constructor(private _SalesOpreationsService: SalesOpreationsService, private _DatePipe: DatePipe) { }

  ngOnInit(): void {
    this.activeUser = localStorage.getItem('loginUser')
    this.myDate = this._DatePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  openModal() {
    this.getBranchs()
  }

  // get all branchs
  getBranchs() {
    this._SalesOpreationsService.getAllBranches().subscribe((branchs) => {
      this.branchs = branchs
    })
  }

  // add invoice

  toggleManual(val: boolean) {
    this.showManual = val
  }

  onAddSelectBranchId(event: any) {

  }

  removeFromProduct(index: number, product: any) {

  }

}
