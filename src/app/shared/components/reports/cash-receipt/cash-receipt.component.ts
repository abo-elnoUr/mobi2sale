import { Component, OnInit } from '@angular/core';

import { SalesMan } from 'src/app/shared/models/salesMan';

@Component({
  selector: 'app-cash-receipt',
  templateUrl: './cash-receipt.component.html',
  styleUrls: ['./cash-receipt.component.css']
})
export class CashReceiptComponent implements OnInit {

  salesmans: SalesMan[] = []
  cashReceipts: any[] = []

  constructor() { }

  ngOnInit(): void {
  }

  onAddSelectSalesmanId(event: any) {

  }

}
