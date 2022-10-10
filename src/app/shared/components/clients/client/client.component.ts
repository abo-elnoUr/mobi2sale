import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ClientsService } from 'src/app/core/services/clients.service';
import { Client } from './../../../models/clients';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  addClientForm: FormGroup
  governorate : any[] = []
  districtId : any[] = []
  clients : Client[] = []

  constructor(private _ClientsService: ClientsService, private _ToastrService: ToastrService) { }

  ngOnInit(): void {
    this.addClientForm = new FormGroup({
      name: new FormControl('', Validators.required),
      mangerName: new FormControl('', Validators.required),
      mobile1: new FormControl('', Validators.required),
      mobile2: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      fax: new FormControl('', Validators.required),
      taxRecordNumber: new FormControl('', Validators.required),
      tradeRecordNumber: new FormControl('', Validators.required),
      taxRecordImage: new FormControl('', Validators.required),
      tradeRecordImage: new FormControl('', Validators.required),
      districtId: new FormControl('', Validators.required),
      governorate: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });

    // functions call
    this.getGovernorate()
    this.getDistrict()
    this.getClients()
  }

  // get all governorate
  getGovernorate(){
    this._ClientsService.getGovernorate().subscribe((governorate) => {
      this.governorate = governorate
    })
  }

  // get all district
  getDistrict(){
    this._ClientsService.getAllDistrict('1').subscribe((districtId) => {
      this.districtId = districtId
    })
  }

  // get all clients
  getClients(){
    this._ClientsService.getClients().subscribe((clients) => {
      this.clients = clients
    })
  }

  // add client
  onAddSelectGover(event: any){
    const governorate = event.target.value
    this.addClientForm.get('governorate').setValue(governorate)
  }

  onAddSelectDistr(event: any){
    const districtId = event.target.value
    this.addClientForm.get('districtId').setValue(districtId)
  }

  onPickImageTax(event: any){
    var imgFile = event.target.files[0]
    this.addClientForm.get('taxRecordImage').setValue(imgFile)
  }

  onPickImageTrade(event: any){
    var imgFile = event.target.files[0]
    this.addClientForm.get('tradeRecordImage').setValue(imgFile)

  }

  addClient(){
    const clientFormData = new FormData()
    clientFormData.append('name', this.addClientForm.get('name').getRawValue())
    clientFormData.append('mangerName', this.addClientForm.get('mangerName').getRawValue())
    clientFormData.append('mobile1', this.addClientForm.get('mobile1').getRawValue())
    clientFormData.append('mobile2', this.addClientForm.get('mobile2').getRawValue())
    clientFormData.append('phone', this.addClientForm.get('phone').getRawValue())
    clientFormData.append('email', this.addClientForm.get('email').getRawValue())
    clientFormData.append('fax', this.addClientForm.get('fax').getRawValue())
    clientFormData.append('taxRecordNumber', this.addClientForm.get('taxRecordNumber').getRawValue())
    clientFormData.append('tradeRecordNumber', this.addClientForm.get('tradeRecordNumber').getRawValue())
    clientFormData.append('taxRecordImage', this.addClientForm.get('taxRecordImage').getRawValue())
    clientFormData.append('tradeRecordImage', this.addClientForm.get('tradeRecordImage').getRawValue())
    clientFormData.append('districtId', this.addClientForm.get('districtId').getRawValue())
    clientFormData.append('governorate', this.addClientForm.get('governorate').getRawValue())
    clientFormData.append('address', this.addClientForm.get('address').getRawValue())
    clientFormData.append('password', this.addClientForm.get('password').getRawValue())

    this._ClientsService.addClient(clientFormData).subscribe((added) => {
      this._ToastrService.success('client added 😀')
      this.addClientForm.reset()
      this.getClients()
    },(error) => {
      switch (error.error.status) {
        case 400:
          for (const [key, value] of Object.entries(error.error.errors)) {
            this._ToastrService.error(value as string);
          }
          break;
        case 500:
          for (const [key, value] of Object.entries(error.error.errors)) {
            this._ToastrService.error(value as string);
          }
          break;
      }
    },
    () => {})

  }

}
