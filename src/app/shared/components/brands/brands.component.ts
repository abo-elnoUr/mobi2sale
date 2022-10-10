import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';
import { ActivatedRoute, Params } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Brand } from '../../models/brands';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {

  idProduct: any = null;
  productName: any = ''
  brands: Brand[] = []
  idBrand: any = null
  apiSrc = 'http://algosys-001-site8.ctempurl.com'
  imageUrl:any = ''



  constructor(private _ProductService:ProductService, private _ActivatedRoute:ActivatedRoute, private _ToastrService:ToastrService) {
    this.idProduct = this._ActivatedRoute.snapshot.params['id'];

   }

  brandForm = new FormGroup({
    id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    file: new FormControl(''),
    fileUrl: new FormControl(''),
    categoryId: new FormControl('')
  })

  ngOnInit(): void {

    this.getProduct(this.idProduct);
    this.getBrands();

  }

  // get product with id

  getProduct(id: any){
    this._ProductService.getOneCategory(id).subscribe((product) => {
     this.idProduct = product.id;
     this.productName = product.name;
  }
  )}

  // view image
  viewImage(imageUrl: any){
    this.imageUrl = imageUrl
  }

  // get all brands

  getBrands(){
    this.idProduct = this._ActivatedRoute.snapshot.params['id'];
    this._ProductService.getBrands(this.idProduct).subscribe((brands) => {
      this.brands = brands
      console.log(brands);

    })
  }

  // get brand

  getBrand(id: any){
    this._ProductService.getBrand(id).subscribe((brand) => {
      this.idBrand = brand.id;
      this.brandForm.patchValue({
        name: brand.name,
        description: brand.description,
        categoryId: brand.categoryId,
        file: brand.imageUrl
      })
    })
  }

  // add brand

  onPickImage(event: any) {
    var image = event.target.files[0];
    this.brandForm.get('file')?.setValue(image);
  }


  addBrand(){
    this.brandForm.get('id')?.setValue(this.idBrand);
    const addFormData = new FormData()
    var file = this.brandForm.get('file').getRawValue()
    addFormData.append('name', this.brandForm.get('name').getRawValue())
    addFormData.append('description', this.brandForm.get('description').getRawValue())
    addFormData.append('categoryId', this.idProduct)
    addFormData.append('file', file)

    this._ProductService.addBrand(addFormData).subscribe((addBrand) => {
      this._ToastrService.success('added 💛')
      this.brandForm.reset();
      this.getBrands()
    },(error) => {
      this._ToastrService.error('error!');
    },
    () => {})

  }

  // update brand

  onPickUpdateImage(event: any) {
    var file = event.target.files[0];
    this.brandForm.get('file').setValue(file);
  }


  updateBrand(){
    this.brandForm.get('id')?.setValue(this.idBrand);
    const updateFormData = new FormData();
    var image = this.brandForm.get('file')?.getRawValue();
    updateFormData.append('file', image);
    updateFormData.append('id', this.idBrand);
    updateFormData.append('name', this.brandForm.get('name')?.getRawValue());
    updateFormData.append(
      'description',
      this.brandForm.get('description')?.getRawValue()
    );
    updateFormData.append('categoryId', this.idProduct)

    this._ProductService.updateBrand(updateFormData, this.idBrand).subscribe((updated) => {
      this._ToastrService.info('updated 💛')
      this.brandForm.reset();
      this.getBrands()
    })

  }

  // delete brand

  deleteBrand(id: any){
    this._ProductService.deleteBrand(id).subscribe((deleteBrand) => {
      this._ToastrService.error('deleted 💛')
      this.getBrands()

    })
  }

}
