import { Component, OnInit } from '@angular/core';
import { SalesOpreationsService } from 'src/app/core/services/sales-opreations.service';

import { SalesMan } from 'src/app/shared/models/salesMan';
import { Client } from 'src/app/shared/models/clients';
@Component({
  selector: 'app-sales-area',
  templateUrl: './sales-area.component.html',
  styleUrls: ['./sales-area.component.css']
})
export class SalesAreaComponent implements OnInit {

  salesArea: any[] = []
  salesmans: SalesMan[] = []
  clients: Client[] = []
  clients2: any[] = []
  salesmans2: any[] = []

  constructor(private _SalesOpreationsService: SalesOpreationsService) { }


  ngOnInit(): void {
  }

  openModal() {

  }

  onAddSelectSupervisorId(event: any) {

  }

  onAddSelectClientId(event: any) {

  }

  removeFromClientTable(index: number, client: any) {

  }

}
