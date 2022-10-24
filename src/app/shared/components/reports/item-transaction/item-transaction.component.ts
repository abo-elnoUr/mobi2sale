import { Component, OnInit } from '@angular/core';

import { SubDepartment } from 'src/app/shared/models/subDepartment';
import { Item } from 'src/app/shared/models/item';


@Component({
  selector: 'app-item-transaction',
  templateUrl: './item-transaction.component.html',
  styleUrls: ['./item-transaction.component.css']
})
export class ItemTransactionComponent implements OnInit {

  categorys: any[] = []
  brands: SubDepartment[] = []
  products: Item[] = []
  itemTransactions: any[] = []

  constructor() { }

  ngOnInit(): void {
  }

  onAddSelectCatId(event: any) {

  }
  onAddSelectBrandId(event: any) {

  }
  onAddSelectProductId(event: any) {

  }

}
