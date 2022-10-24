import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { SalesOpreationsService } from 'src/app/core/services/sales-opreations.service';

import { SubDepartment } from 'src/app/shared/models/subDepartment';
import { Branch } from './../../../models/branchs';
import { Brand } from 'src/app/shared/models/brands';
import { Item } from 'src/app/shared/models/item';
import { SalesMan } from './../../../models/salesMan';

@Component({
  selector: 'app-exchange-voucher',
  templateUrl: './exchange-voucher.component.html',
  styleUrls: ['./exchange-voucher.component.css'],
  providers: [DatePipe]
})
export class ExchangeVoucherComponent implements OnInit {

  exchangVoucher: any[] = []
  exchangeVoucherBranchForm: FormGroup
  exchangeVoucherSalesmanForm: FormGroup
  supDepartments: SubDepartment[] = []
  branchs: Branch[] = []
  categorys: any[] = []
  brands: Brand[] = []
  products: Item[] = []
  salesman: SalesMan[] = []
  products1: any[] = []
  products2: any[] = []
  productsSales1: any[] = []
  productsSales2: any[] = []
  myDate: string
  activeUser: string = ''
  productId: any;
  proName: any;
  productPrice: number = 0



  constructor(private _SalesOpreationsService: SalesOpreationsService, private _DatePipe: DatePipe) { }



  ngOnInit(): void {
    this.activeUser = localStorage.getItem('loginUser')
    this.myDate = this._DatePipe.transform(new Date(), 'yyyy-MM-dd');

    this.exchangeVoucherBranchForm = new FormGroup({
      fromStoreId : new FormControl('', Validators.required),
      toStoreId : new FormControl('', Validators.required),
      quantity : new FormControl('', Validators.required),
      total : new FormControl('', Validators.required),
      isBranch : new FormControl(true, Validators.required),
      barCode : new FormControl('', Validators.required),
      exchangeVoucherDetails : new FormControl([], Validators.required),
    })

    this.exchangeVoucherSalesmanForm = new FormGroup({
      fromStoreId : new FormControl('', Validators.required),
      toStoreId : new FormControl('', Validators.required),
      quantity : new FormControl('', Validators.required),
      total : new FormControl('', Validators.required),
      isBranch : new FormControl(true, Validators.required),
      barCode : new FormControl('', Validators.required),
      exchangeVoucherDetails : new FormControl([], Validators.required),
    })

    // call functions

  }

  openModal(){
    this.getStores()
    this.getBranchs()
    this.getCategorys()
    this.getSalesMen()
  }

  // get all stores
  getStores(){
    this._SalesOpreationsService.getAllSubDepartments().subscribe((stores) => {
      this.supDepartments = stores
    })
  }

  // get all branchs
  getBranchs(){
    this._SalesOpreationsService.getAllBranches().subscribe((branchs) => {
      this.branchs = branchs
    })
  }

  // get all category
  getCategorys(){
    this._SalesOpreationsService.getAllCategory().subscribe((categorys) => {
      this.categorys = categorys
    })
  }

  // get all brands
  getBrands(id: string){
    this._SalesOpreationsService.getBrands(id).subscribe((brands) => {
      this.brands = brands
    })
  }

  // get all products
  getProducts(id: string){
    this._SalesOpreationsService.getAllItems(id).subscribe((product) => {
      this.products = product
    })
  }

  // get all salesman
  getSalesMen(){
    this._SalesOpreationsService.getSalesMen().subscribe((salesman) => {
      this.salesman = salesman
    })
  }

  // add exchange voucher
  onAddSelectStoreId(event: any){

  }

  onAddSelectBranchId(event: any){

  }

  onAddSelectSalesManId(event: any){

  }

  onAddSelectCatId(event: any){
    const categoryId = event.target.value
    this.getBrands(categoryId)
  }

  onAddSelectBrandId(event: any){
    const brandId = event.target.value
    this.getProducts(brandId)
  }

  onAddSelectProductId(event: any){
    const itemId = event.target.value
    this.productId = itemId
    const proName = this.products.find(item => itemId == item.id )
    this.proName = proName.name
  }

  addToProductTable(){
    const qty = this.exchangeVoucherBranchForm.get('quantity').getRawValue()
    const pro1 = {'product': this.productId,'quantity': qty, 'barCode': this.exchangeVoucherBranchForm.get('barCode').getRawValue() }
    const pro2 = {'product': this.proName, 'quantity': qty, 'barCode': this.exchangeVoucherBranchForm.get('barCode').getRawValue() }
    this.products1.push(pro1)
    this.products2.push(pro2)
    this._SalesOpreationsService.getOneItem(this.productId).subscribe((prod) => {
      this.productPrice = prod.supplyPrice
    })
  }

  addToProductTableSales(){
    const qty = this.exchangeVoucherSalesmanForm.get('quantity').getRawValue()
    const pro1 = {'product': this.productId,'quantity': qty, 'barCode': this.exchangeVoucherSalesmanForm.get('barCode').getRawValue() }
    const pro2 = {'product': this.proName, 'quantity': qty, 'barCode': this.exchangeVoucherSalesmanForm.get('barCode').getRawValue() }
    this.productsSales1.push(pro1)
    this.productsSales2.push(pro2)
    this._SalesOpreationsService.getOneItem(this.productId).subscribe((prod) => {
      this.productPrice = prod.supplyPrice
    })
  }

  removeFromProduct(index: number, pro: any){

  }

  removeFromProductSales(index: number, pro: any){

  }


}
