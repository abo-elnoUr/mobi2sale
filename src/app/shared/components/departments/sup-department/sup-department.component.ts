import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DepartmentsService } from 'src/app/core/services/departments.service';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sup-department',
  templateUrl: './sup-department.component.html',
  styleUrls: ['./sup-department.component.css'],
})
export class SupDepartmentComponent implements OnInit {
  @ViewChild('departmentId') departmentId!: ElementRef;
  @ViewChild('mgrId') mgrId!: ElementRef;
  @ViewChild('departId') departId!: ElementRef;

  sup_departments: any[] = [];
  departments: any[] = [];
  depId: any = null;
  text: any = '';
  employees: any[] = [];
  subDepartId: any = null;
  editSubDepartmentForm: FormGroup;
  addSubDepartmentForm: FormGroup;

  constructor(
    private _DepartmentsService: DepartmentsService,
    private _ToastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.editSubDepartmentForm = new FormGroup({
      id: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      managerID: new FormControl('', Validators.required),
      departmentID: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
    });

    this.addSubDepartmentForm = new FormGroup({
      name: new FormControl('', Validators.required),
      managerID: new FormControl('', Validators.required),
      departmentID: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      isStore: new FormControl(true, Validators.required),
    });

    this.getDepartments();
    this.getEmployees();
  }

  // get all Departments
  getDepartments() {
    this._DepartmentsService.getDepartments().subscribe((departments) => {
      this.departments = departments;
    });
  }

  //  get subDepartment by departmentId
  onSelectDepartmentId(event: any) {
    const departmentId = this.departmentId.nativeElement.value;
    this.depId = departmentId;
  }

  getSupdepartmentById() {
    this._DepartmentsService
      .getSupdepartmentById(this.depId)
      .subscribe((subdepartments) => {
        this.sup_departments = subdepartments.data;
      });
  }

  onSearch(event: any) {
    const txt = event.target.value;
    this.text = txt;
  }

  getSupdepartmentByText() {
    this._DepartmentsService
      .getSupdepartmentByText(this.text, this.depId)
      .subscribe((subdepartments) => {
        this.sup_departments = subdepartments.data;
      });
  }

  // get  subDepartment by id
  getSubDepartmentById(id: any) {
    this._DepartmentsService.getSubDepartmentById(id).subscribe((subDepart) => {
      this.subDepartId = id;
      this.editSubDepartmentForm.patchValue(subDepart);
    });
  }

  // emplyees
  getEmployees() {
    this._DepartmentsService.getEmployees().subscribe((employees) => {
      this.employees = employees;
    });
  }

  // add subDepartment
  addSubDepartment(){
    this._DepartmentsService.addSubDepartment(this.addSubDepartmentForm.value).subscribe((addSubdepartment) => {
      this._ToastrService.success('added 💛');
          this.getDepartments();
          this.getSupdepartmentById();
          this.addSubDepartmentForm.reset();
    },
    (error) => {
      switch (error.error.status) {
        case 400:
          for (const [key, value] of Object.entries(error.error.errors)) {
            this._ToastrService.error(value as string);
          }
          break;
      }
    },
    () => {})
  }

  // edit subDepartment
  onEditSelectMgrId(event: any) {
    const mgrId = this.mgrId.nativeElement.value;
    this.editSubDepartmentForm.get('managerID').setValue(mgrId);
  }

  onEditSelectDepId(event: any) {
    const departId = this.departId.nativeElement.value;
    this.editSubDepartmentForm.get('departmentID').setValue(departId);
  }

  editSubDepartment() {
    this.editSubDepartmentForm.get('id').setValue(this.subDepartId);
    this._DepartmentsService
      .editSubDepartment(this.editSubDepartmentForm.value, this.subDepartId)
      .subscribe(
        (edited) => {
          this._ToastrService.info('edited 💙');
          this.getDepartments();
          this.getSupdepartmentById();
          this.editSubDepartmentForm.reset();
        },
        (error) => {
          switch (error.error.status) {
            case 400:
              for (const [key, value] of Object.entries(error.error.errors)) {
                this._ToastrService.error(value as string);
              }
              break;
          }
        },
        () => {}
      );
  }

  // delete supDepartment
  deleteSupDepartment(id: string) {
    this._DepartmentsService.deleteSupDepartment(id).subscribe((deleted) => {
      this._ToastrService.error('deleted 🖤');
      this.getDepartments();
      this.getSupdepartmentById();
    });
  }
}
