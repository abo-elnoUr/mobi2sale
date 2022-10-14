import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DepartmentsService } from 'src/app/core/services/departments.service';
import { ToastrService } from 'ngx-toastr';

import { Branch } from './../../../models/branchs';
import { SubDepartment } from 'src/app/shared/models/subDepartment';

@Component({
  selector: 'app-branch-refund-to-store',
  templateUrl: './branch-refund-to-store.component.html',
  styleUrls: ['./branch-refund-to-store.component.css']
})
export class BranchRefundToStoreComponent implements OnInit {

  brancheRefundToStore: any[] = []
  addBranchRefundToStoreForm: FormGroup
  branchs: Branch[] = []
  stores: SubDepartment[] = []
  serials: any[] = []
  enableManual: boolean = true

  constructor(private _DepartmentsService: DepartmentsService, private _ToastrService: ToastrService) { }

  ngOnInit(): void {

    this.addBranchRefundToStoreForm = new FormGroup({
      branchId: new FormControl('', Validators.required),
      storeId: new FormControl('', Validators.required),
      employeeId: new FormControl('', Validators.required),
      totalPrice: new FormControl('', Validators.required),
      costPrice: new FormControl('', Validators.required),
      serialNo: new FormControl('', Validators.required),
      details: new FormControl([], Validators.required),
    })

    // call functions
    this.getBranchRefundsToStore()
  }

  // get all branchs
  getBranchs() {
    this._DepartmentsService.getAllBranches().subscribe((branch) => {
      this.branchs = branch
    })
  }

  // get all stores
  getSubDepartments() {
    this._DepartmentsService.getAllSubDepartments().subscribe((subDep) => {
      this.stores = subDep
    })
  }

  // get all employee
  getEmployee() {
    this._DepartmentsService.getAllSubDepartments().subscribe((subDep) => {
      this.stores = subDep
    })
  }

  // get serials
  getSerials() {
    this._DepartmentsService.getSerialToRefundStore().subscribe((serial) => {
      this.serials = serial
    })
  }

  // get all branch refund to store
  getBranchRefundsToStore() {
    this._DepartmentsService.getBranchRefundsToStore().subscribe((refund) => {
      this.brancheRefundToStore = refund.data
    })
  }

  openBranchRefundToStore() {
    this.getBranchs()
    this.getSubDepartments()
    this.getSerials()
  }

  // switch manual barcode flag
  manualBarcode() {
    this.enableManual = false
  }

  switchButton() {
    this.enableManual = true
  }

  // add banch refund to store
  onAddSelectBranch(event: any) {
    const branchId = event.target.value
    this.addBranchRefundToStoreForm.get('branchId').setValue(branchId)
  }

  onAddSelectStore(event: any) {
    const storeId = event.target.value
    this.addBranchRefundToStoreForm.get('storeId').setValue(storeId)
  }

  addRefundToStore() {
    const userId = localStorage.getItem('idUser')
    this.addBranchRefundToStoreForm.get('employeeId').setValue(userId)
  }

}
