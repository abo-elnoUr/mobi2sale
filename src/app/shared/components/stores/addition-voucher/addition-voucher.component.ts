import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { StoresService } from 'src/app/core/services/stores.service';

import { AdditionVoucher } from './../../../models/additionVoucher';
import { Employee } from './../../../models/employee';
import { Supplier } from './../../../models/supplier';
import { SubDepartment } from './../../../models/subDepartment';
import { Item } from 'src/app/shared/models/item';
import { Brand } from 'src/app/shared/models/brands';

@Component({
  selector: 'app-addition-voucher',
  templateUrl: './addition-voucher.component.html',
  styleUrls: ['./addition-voucher.component.css']
})
export class AdditionVoucherComponent implements OnInit {

  addAdditionVoucherForm: FormGroup
  additionVoucher: AdditionVoucher[] = []
  employees: Employee[] = []
  brands: Brand[] = []
  items: Item[] = []
  supliers: Supplier[] = []
  stores: SubDepartment[] = []
  categoryes :any[] = []
  vouchers: any[] = []
  vouchers2: any[] = []
  productId: any = null
  proName: any = null
  serial : any = null
  productPrice: number = 0
  empId : string = ''
  loginUser : string = ''
  detaiiiils? : any[] = []

  constructor(private _StoresService:StoresService, private _ToastrService:ToastrService) { }

  ngOnInit(): void {

    this.empId = localStorage.getItem('idUser')
    this.loginUser = localStorage.getItem('loginUser')

    this.addAdditionVoucherForm = new FormGroup({
      storeId: new FormControl('', Validators.required),
      employeeId: new FormControl('', Validators.required),
      supplierId: new FormControl('', Validators.required),
      total: new FormControl('', Validators.required),
      serialNo: new FormControl('', Validators.required),
      quantity: new FormControl(1, Validators.required),
      details: new FormControl([], Validators.required),
    });

    //  call functions
    this.getSuppliers()
    this.getAllSubDepartments()
    this.getEmployees()
    this.getCategory()
    this.getSerial()
    this.getAdditionVoucher()
  }

  // get addition voucher
  getAdditionVoucher(){
    this._StoresService.getAdditionVouchers().subscribe((addition) => {
      this.additionVoucher = addition
    })
  }

  // get serial
  getSerial(){
    this._StoresService.getSerial().subscribe((serial) => {
      this.serial = serial
    })
  }

  // get all employees
  getEmployees(){
    this._StoresService.getEmployees().subscribe((emp) => {
      this.employees = emp
    })
  }

  // get all suppliers
  getSuppliers(){
    this._StoresService.getSuppliers().subscribe((supplier) => {
      this.supliers = supplier
    })
  }

  // get all stores
  getAllSubDepartments(){
    this._StoresService.getAllSubDepartments().subscribe((stores) => {
      this.stores = stores
    })
  }

  // get all category
  getCategory(){
    this._StoresService.getAllCategory().subscribe((categ) => {
      this.categoryes = categ
    })
  }

  // get all brands
  getBrands(id: string){
    this._StoresService.getBrands(id).subscribe((brand) => {
      this.brands = brand
    })
  }

  // get all items
  getItems(id: string){
    this._StoresService.getAllItems(id).subscribe((items) => {
      this.items = items
    })
  }

  // add to voucher
  addToVoucher(){
    const qty = this.addAdditionVoucherForm.get('quantity').getRawValue()
    const voch = {'product': this.productId,'quantity': qty}
    const voch2 = {'product': this.proName, 'quantity': qty}
    this.vouchers.push(voch)
    this.vouchers2.push(voch2)
    this._StoresService.getOneItem(this.productId).subscribe((prod) => {
      this.productPrice = prod.supplyPrice
    })
  }

  // remove from voucher
  removeFromVoucher(index: any){
    if (index !== -1) {
      this.vouchers.push(this.vouchers2.splice(index, 1)[0]);
    }
  }


  // add addition voucher
  onAddSelectSup(event: any){
    const sup = event.target.value
    this.addAdditionVoucherForm.get('supplierId').setValue(sup)
  }

  onAddSelectStore(event: any){
    const storeId = event.target.value
    this.addAdditionVoucherForm.get('storeId').setValue(storeId)
  }

  onAddSelectCateg(event: any){
    const catId = event.target.value
    this.getBrands(catId)
  }

  onAddSelectBrand(event: any){
    const brandId = event.target.value
    this.getItems(brandId)
  }
  onAddSelectItem(event: any){
    const itemId = event.target.value
    this.productId = itemId
    const proName = this.items.find(item => itemId == item.id )
    this.proName = proName.name

  }

  addAdditionVoucher(){
    this.addAdditionVoucherForm.get('serialNo').setValue(this.serial)
    const qty = this.addAdditionVoucherForm.get('quantity').getRawValue()
    const detail = {'itemId': this.productId, 'quantity': qty}
    this.detaiiiils.push(detail)

    this.addAdditionVoucherForm.get('details').setValue(this.detaiiiils)
    const totalPrice = this.productPrice * qty
    this.addAdditionVoucherForm.get('total').setValue(totalPrice)
    this.addAdditionVoucherForm.get('employeeId').setValue(this.empId)

    this._StoresService.addAdditionVoucher(this.addAdditionVoucherForm.value).subscribe((addit) => {
      this._ToastrService.success('addition voucher added 👍')
      this.getAdditionVoucher()
      this.addAdditionVoucherForm.reset()
    },
    (error) => {
      switch (error.status) {
        case 500:
          this._ToastrService.error(error.error.errors as string);
          break
          case 400:
          this._ToastrService.error(error.error.errors as string);
          break
      }
    },
    () => {})

  }

}
