import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from './../../models/products';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  id: any = null;
  apiSrc = 'http://algosys-001-site8.ctempurl.com';

  constructor(
    private _ProductService: ProductService,
    private _ToastrService: ToastrService
  ) { }

  productForm = new FormGroup({
    id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    image: new FormControl(''),
    imageUrl: new FormControl(''),
    description: new FormControl('', Validators.required),
  });

  addProductForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    file: new FormControl('')
  })

  get productFormValidate() {
    return this.productForm.controls;
  }
  ngOnInit(): void {
    this.getAllProducts();
  }

  // get all category

  getAllProducts() {
    this._ProductService.getAllCategory().subscribe(
      (products) => {
        this.products = products;
      },
      (error) => {
        this._ToastrService.error('error!');
      },
      () => { }
    );
  }

  // get category

  getProduct(id: any) {
    this._ProductService.getOneCategory(id).subscribe((product) => {
      this.id = product.id;
      this.productForm.patchValue({
        id: product.id,
        name: product.name,
        imageUrl: product.imageUrl,
        description: product.description,
      });
    });
  }

  // update category

  onPickImage(event: any) {
    var file = event.target.files[0];
    this.productForm.get('image')?.setValue(file);
  }
  updateProduct() {
    this.productForm.get('id')?.setValue(this.id);
    const formData = new FormData();
    var image = this.productForm.get('image')?.getRawValue();
    formData.append('image', image);
    formData.append('id', this.id);
    formData.append('name', this.productForm.get('name')?.getRawValue());
    formData.append(
      'description',
      this.productForm.get('description')?.getRawValue()
    );
    this._ProductService.updateCategory(formData, this.id).subscribe(
      (updated) => {
        this._ToastrService.info('updated 💛');
        this.productForm.reset();
        this.getAllProducts();
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
            for (const [key, value] of Object.entries(error.error.errors)) {
              this._ToastrService.error(value as string);
            }
            // this._ToastrService.error(error.error.errors as string);
            break
        }
      },
      () => { }
    );
  }

  // add category

  onPickAddImage(event: any) {
    var image = event.target.files[0];
    this.addProductForm.get('file')?.setValue(image);
  }

  addCategory() {
    const addFormData = new FormData()
    var file = this.addProductForm.get('file').getRawValue()
    addFormData.append('name', this.addProductForm.get('name').getRawValue())
    addFormData.append('description', this.addProductForm.get('description').getRawValue())
    addFormData.append('file', file)

    this._ProductService.addCategory(addFormData).subscribe((addCategory) => {
      this._ToastrService.success('added 💛');
      this.addProductForm.reset();
      this.getAllProducts();
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
            for (const [key, value] of Object.entries(error.error.errors)) {
              this._ToastrService.error(value as string);
            }
            // this._ToastrService.error(error.error.errors as string);
            break
        }
      },
      () => { })
  }

  // delete category

  deleteCategory(id: any) {
    this._ProductService.deleteCategory(id).subscribe((deleteCategory) => {
      this._ToastrService.error('deleted 💛')
      this.getAllProducts()
    })
  }

}
