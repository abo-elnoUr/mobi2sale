import { Component, OnInit } from '@angular/core';

import { SalesMan } from 'src/app/shared/models/salesMan';

@Component({
  selector: 'app-salesman-account',
  templateUrl: './salesman-account.component.html',
  styleUrls: ['./salesman-account.component.css']
})
export class SalesmanAccountComponent implements OnInit {

  salesmanAccounts: any[] = []
  salesmans: SalesMan[] = []

  constructor() { }

  ngOnInit(): void {
  }

  onAddSelectSalesmanId(event: any) {

  }

}
