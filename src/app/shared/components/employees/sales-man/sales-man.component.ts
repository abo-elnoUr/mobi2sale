import { Employee } from './../../../models/employee';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sales-man',
  templateUrl: './sales-man.component.html',
  styleUrls: ['./sales-man.component.css']
})
export class SalesManComponent implements OnInit {

  salesMen: any[] = []
  addSalesManFrom: FormGroup
  employees: Employee[] = []

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

}
