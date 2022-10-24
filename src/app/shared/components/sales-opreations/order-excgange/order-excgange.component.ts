import { Component, OnInit } from '@angular/core';
import { SalesOpreationsService } from 'src/app/core/services/sales-opreations.service';

import { Client } from 'src/app/shared/models/clients';
@Component({
  selector: 'app-order-excgange',
  templateUrl: './order-excgange.component.html',
  styleUrls: ['./order-excgange.component.css']
})
export class OrderExcgangeComponent implements OnInit {

  orders: any[] = []
  clients: Client[] = []

  constructor(private _SalesOpreationsService: SalesOpreationsService) { }

  ngOnInit(): void {
    // call functions
    this.getClients()
    this.getOrderExchange()
  }

  // get all order exchange
  getOrderExchange() {
    this._SalesOpreationsService.getOrderExchange().subscribe((order) => {
      this.orders = order
    })
  }

  // get all clients
  getClients() {
    this._SalesOpreationsService.getClients().subscribe((clients) => {
      this.clients = clients
    })
  }

  onAddSelectClientId(event: any) {

  }

}
