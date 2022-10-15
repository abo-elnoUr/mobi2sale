import { Employee } from './../../../models/employee';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { ToastrService } from 'ngx-toastr';

import { SalesMan } from './../../../models/salesMan';

@Component({
  selector: 'app-sales-man',
  templateUrl: './sales-man.component.html',
  styleUrls: ['./sales-man.component.css']
})
export class SalesManComponent implements OnInit {

  salesMen: SalesMan[] = []
  addSalesManFrom: FormGroup
  editSalesManFrom: FormGroup
  employees: Employee[] = []
  salesMan: SalesMan[] = []
  salesmanId: string = ''

  constructor(private _EmployeeService: EmployeeService, private _ToastrService: ToastrService) { }

  ngOnInit(): void {

    this.addSalesManFrom = new FormGroup({
      employeeId: new FormControl('', Validators.required),
      limit: new FormControl('', Validators.required),
      target: new FormControl('', Validators.required),
      targetSatrt: new FormControl('', Validators.required),
      targetEnd: new FormControl('', Validators.required),
      bonusBeforeTime: new FormControl('', Validators.required),
      bonus: new FormControl('', Validators.required),
    })

    this.editSalesManFrom = new FormGroup({
      id: new FormControl('', Validators.required),
      limit: new FormControl('', Validators.required),
      target: new FormControl('', Validators.required),
      targetSatrt: new FormControl('', Validators.required),
      targetEnd: new FormControl('', Validators.required),
      bonusBeforeTime: new FormControl('', Validators.required),
      bonus: new FormControl('', Validators.required),
    })

    // call functions
    this.getSalesMen()
  }

  // get all salesMen
  getSalesMen() {
    this._EmployeeService.getSalesMen().subscribe((sales) => {
      this.salesMen = sales
    })
  }

  // get all employees
  getEmployees() {
    this._EmployeeService.getEmployees().subscribe((emp) => {
      this.employees = emp
    })
  }

  getEmp() {
    this.getEmployees()
  }

  // get one sales man
  getOneSalesMan(id: string){
    this._EmployeeService.getOneSalesMan(id).subscribe((sales) => {
      this.salesMan = sales
      this.salesmanId = sales.id
      this.editSalesManFrom.patchValue({
        limit: sales.limit,
        target: sales.target,
        targetSatrt: sales.targetSatrt,
        targetEnd: sales.targetEnd,
        bonusBeforeTime: sales.bonusBeforeTime,
        bonus: sales.bonus,
      })
    })
  }

  // add salesman
  onSelectEmp(event: any) {
    const emp = event.target.value
    this.addSalesManFrom.get('employeeId').setValue(emp)
  }

  addSalesMan() {
    this._EmployeeService.addSalesMan(this.addSalesManFrom.value).subscribe((salesMan) => {
      this._ToastrService.success('salesMan added 👍')
      this.addSalesManFrom.reset()
      this.getSalesMen()
    },
      (error) => {
        switch (error.status) {
          case 500:
            this._ToastrService.error(error.error.errors as string);
            break
          case 400:
            for (const [key, value] of Object.entries(error.error.errors)) {
              this._ToastrService.error(value as string);
            }
            break
        }
      },
      () => { })
  }

  // edit slaes man
  editSalesMan(){
    this.editSalesManFrom.get('id').setValue(this.salesmanId)
    this._EmployeeService.updateSalesMan(this.salesmanId, this.editSalesManFrom.value).subscribe((editSales) => {
      this._ToastrService.info('salesMan updated 👏')
      this.getSalesMen()
    },
    (error) => {
      switch (error.status) {
        case 500:
          this._ToastrService.error(error.error.errors as string);
          break
        case 400:
          for (const [key, value] of Object.entries(error.error.errors)) {
            this._ToastrService.error(value as string);
          }
          break
      }
    },
    () => { })

  }

  // delete sales man
  deleteSalesMan(id: string){
    this._EmployeeService.deleteSalesMan(id).subscribe((del) => {
      this._ToastrService.error('salesMan deleted 😭')
      this.getSalesMen()
    },
    (error) => {
      switch (error.status) {
        case 500:
          this._ToastrService.error(error.error.errors as string);
          break
        case 400:
          for (const [key, value] of Object.entries(error.error.errors)) {
            this._ToastrService.error(value as string);
          }
          break
      }
    },
    () => { })
  }

}
