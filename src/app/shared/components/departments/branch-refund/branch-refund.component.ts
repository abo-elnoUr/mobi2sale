import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DepartmentsService } from 'src/app/core/services/departments.service';
import { Branch } from './../../../models/branchs';
import { SubDepartment } from './../../../models/subDepartment';
import { BranchRefund } from './../../../models/branchRefund';

@Component({
  selector: 'app-branch-refund',
  templateUrl: './branch-refund.component.html',
  styleUrls: ['./branch-refund.component.css']
})
export class BranchRefundComponent implements OnInit {

  brancheRefund: BranchRefund[] = []
  branches: Branch[] = []
  stores: SubDepartment[] = []
  serials: any = null

  constructor(private _DepartmentsService: DepartmentsService,
    private _ToastrService: ToastrService) { }

  ngOnInit(): void {

    // call functions
    this.getAllBranches()
    this.getAllSubDepartments()
    this.getAllSerials()
  }

  // get all branches
  getAllBranches(){
    this._DepartmentsService.getAllBranches().subscribe((allBranchs) => {
      this.branches = allBranchs
    })
  }

  // get all Stores (SubDepartments)
  getAllSubDepartments(){
    this._DepartmentsService.getAllSubDepartments().subscribe((subDepartmerts) => {
      this.stores = subDepartmerts
    })
  }

  // get all serial
  getAllSerials(){
    this._DepartmentsService.getAllSerials().subscribe((serials) => {
      this.serials = serials
    })
  }

}
