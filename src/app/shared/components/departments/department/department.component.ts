import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DepartmentsService } from 'src/app/core/services/departments.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  @ViewChild('mgrId') mgrId!: ElementRef;
  @ViewChild('mgrId2') mgrId2!: ElementRef;

  departments: any[] = []
  employees: any[] = []
  id: any = null

  constructor(private _DepartmentsService:DepartmentsService, private _ToastrService:ToastrService) { }

  addDepartmentForm = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    manger: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  })

  editDepartmentForm = new FormGroup({
    id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    manger: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  })

  get editDepartmentFormValidate() {
    return this.editDepartmentForm.controls
  }


  ngOnInit(): void {
    this.getDepartments()
    this.getEmployees()
  }

  // emplyees

  getEmployees(){
    this._DepartmentsService.getEmployees().subscribe((employees) => {
      this.employees = employees
    })
  }

  // get departments

  getDepartments(){
    this._DepartmentsService.getDepartments().subscribe((departments) => {
      this.departments = departments;
    })
  }

  // add department

  onSelectMgrId(event: any){
    const mgrId = this.mgrId.nativeElement.value
    this.addDepartmentForm.get('manger').setValue(mgrId)

  }

  addDepartment(){
    const formData = new FormData()
    const idManger = this.addDepartmentForm.get('manger').getRawValue()
    formData.append('name', this.addDepartmentForm.get('name').getRawValue())
    formData.append('description', this.addDepartmentForm.get('description').getRawValue())
    formData.append('phone', this.addDepartmentForm.get('phone').getRawValue())
    formData.append('mgrid', idManger)

    this._DepartmentsService.addDepartment(formData).subscribe((addDepartment) => {
      this._ToastrService.success('added 💛')
      this.getDepartments()
      this.addDepartmentForm.reset()
    },(error) => {
      this._ToastrService.error('error!');
    },
    () => {})

  }

  // get department

  getDepartmrnt(id: any){
    this._DepartmentsService.getOneDepartment(id).subscribe((getDepartment) => {
      this.id = getDepartment.id
      this.editDepartmentForm.patchValue({
        name: getDepartment.name,
        phone: getDepartment.phone,
        description: getDepartment.description,
      })
    })
  }

  // edit department

  onEditSelectMgrId(event: any){
    const mgrId = this.mgrId2.nativeElement.value
    this.editDepartmentForm.get('manger').setValue(mgrId)
  }

  editDepartment(){
    this.editDepartmentForm.get('id').setValue(this.id)
    const formData = new FormData()
    formData.append('id', this.editDepartmentForm.get('id').getRawValue())
    formData.append('name', this.editDepartmentForm.get('name').getRawValue())
    formData.append('mgrid', this.editDepartmentForm.get('manger').getRawValue())
    formData.append('description', this.editDepartmentForm.get('description').getRawValue())
    formData.append('phone', this.editDepartmentForm.get('phone').getRawValue())
    this._DepartmentsService.editDepartment(formData, this.id).subscribe((edited) => {
      this._ToastrService.info('edit 🤍')
      this.getDepartments()
      this.editDepartmentForm.reset()
    })
  }

  // delete department

  deleteDepartment(id: any){
    this._DepartmentsService.deleteDepartment(id).subscribe((deleteDepartment) => {
      this._ToastrService.error('deleted 🖤')
      this.getDepartments()
    })
  }

}
