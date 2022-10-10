import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DepartmentsService } from 'src/app/core/services/departments.service';
import { Branch } from './../../../models/branchs';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {

  @ViewChild('mgrId') mgrId!: ElementRef;
  @ViewChild('salsId') salsId!: ElementRef;


  addBranchForm: FormGroup;
  editBranchForm: FormGroup;
  employeees1: any[] = []
  employeees2: any[] = []
  employeeesEdit: any[] = []
  tableData: any = []
  tableDataEdit: any = []
  salesMan: any[] = []
  salesManEdit: any[] = []
  branches: Branch[] = []
  branchesById: any = {}
  branchId: any = null


  constructor(private _DepartmentsService: DepartmentsService,
    private _ToastrService: ToastrService) { }

  ngOnInit(): void {
    this.addBranchForm = new FormGroup({
      name: new FormControl('', Validators.required),
      mgrid: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      salesId: new FormControl('', Validators.required),
      employees: new FormControl('', Validators.required),
    });
    this.editBranchForm = new FormGroup({
      id: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      mgrid: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      employees: new FormControl('', Validators.required),
    });

    // call function
    this.getEmployees()
    this.getAllBranches()
  }

  // emplyees
  getEmployees() {
    this._DepartmentsService.getEmployees().subscribe((employees) => {
      this.employeees1 = employees;
      this.employeees2 = employees;
      this.employeeesEdit = employees;
    });
  }

  // get all branches
  getAllBranches(){
    this._DepartmentsService.getAllBranches().subscribe((allBranchs) => {
      this.branches = allBranchs
    })
  }

  // remove from sales man array
  removeFromSales(index: any, sale: any){
    if (index !== -1) {
      this.employeees2.push(this.salesMan.splice(index, 1)[0]);
    }

  }

  // add branch
  onAddSelectMgrId(event: any){
    const mgrId = this.mgrId.nativeElement.value;
    this.addBranchForm.get('mgrid').setValue(mgrId);
  }

  onAddSelectSalesId(event: any){
    this.employeees2.forEach((emp, i) => {
      if(event.target.value == emp.id){
        const emplyee = this.employeees2.splice(i , 1)[0];
        this.tableData.push(emplyee.id);
        this.salesMan.push(emplyee);
        this.addBranchForm.get('salesId').setValue(event.target.value);
      }
    })
  }



  addBranch(){
    this.addBranchForm.get('employees').setValue(this.tableData)
    this._DepartmentsService.addBranch(this.addBranchForm.value).subscribe((added) => {
      this._ToastrService.success('added 💛')
      this.getAllBranches()
      this.addBranchForm.reset()
    },
    (error) => {
      switch (error.status) {
        case 500:
          //   for (const [key, value] of Object.entries(error.error.errors)) {
          //   this._ToastrService.error(value as string);
          // }
          this._ToastrService.error(error.error.errors as string);
          break
          case 400:
          this._ToastrService.error(error.error.errors as string);
          break
      }
    },
    () => {})
  }

  // get branch with id
  getBranchWithId(id: string){
    this._DepartmentsService.getBranchById(id).subscribe((branchById) => {
      this.branchesById = branchById
      this.branchId = branchById.id
      this.editBranchForm.patchValue({
        name: branchById.name,
        mgrid: branchById.mgrid,
        description: branchById.description,
        phone: branchById.phone,
      })
    })
  }

  // edit branch
  onEditSelectSalesId(event: any){
    this.employeeesEdit.forEach((emp, i) => {
      if(event.target.value == emp.id){
        const emplyee = this.employeeesEdit.splice(i , 1)[0];
        this.tableDataEdit.push(emplyee.id);
        this.salesManEdit.push(emplyee);
      }
    })
  }

  removeFromSalesEdit(index: any){
    if (index !== -1) {
      this.employeeesEdit.push(this.salesManEdit.splice(index, 1)[0]);
    }
  }

  editBranch(){
    this.editBranchForm.get('id').setValue(this.branchId)
    this.editBranchForm.get('employees').setValue(this.tableDataEdit)
    this._DepartmentsService.editBranch(this.branchId, this.editBranchForm.value).subscribe((edited) => {
      this._ToastrService.success('added 💛')
      this.editBranchForm.reset()
      this.getAllBranches()
    },
    (error) => {
      switch (error.status) {
        case 500:
            for (const [key, value] of Object.entries(error.error.errors)) {
            this._ToastrService.error(value as string);
          }
          // this._ToastrService.error(error.error.errors as string);
          break
          case 400:
            for (const [key, value] of Object.entries(error.error.errors)) {
              this._ToastrService.error(value as string);
            }
          // this._ToastrService.error(error.error.errors as string);
          break
      }
    },
    () => {})
  }


  // delete branch
  deleteBranch(id: string){
    this._DepartmentsService.deleteBranch(id).subscribe((deleted) => {
      this._ToastrService.error('delted 🖤')
      this.getAllBranches()
    })
  }

}
