import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Item } from 'src/app/shared/models/item';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items: Item[] = []
  brandName: string = ''
  subCatId: string = ''
  apiSrc = 'http://algosys-001-site8.ctempurl.com'
  addItemForm: FormGroup
  editItemForm: FormGroup
  itemId: string = ''
  searchText: string = ''

  constructor(private _ActivatedRoute: ActivatedRoute, private _ProductService: ProductService, private _ToastrService: ToastrService) {
    this.subCatId = this._ActivatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.addItemForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      supplyPrice: new FormControl('', Validators.required),
      retailPrice: new FormControl('', Validators.required),
      wholesalePrice: new FormControl('', Validators.required),
      color: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
      safeLimit: new FormControl('', Validators.required),
      mainImage: new FormControl('', Validators.required),
      coverImage: new FormControl('', Validators.required),
      subcategoryId: new FormControl('', Validators.required),
    });
    this.editItemForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      supplyPrice: new FormControl('', Validators.required),
      retailPrice: new FormControl('', Validators.required),
      wholesalePrice: new FormControl('', Validators.required),
      color: new FormControl('', Validators.required),
      code: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
      safeLimit: new FormControl('', Validators.required),
      mainImage: new FormControl('', Validators.required),
      coverImage: new FormControl('', Validators.required),
      subcategoryId: new FormControl('', Validators.required),
    });
    // function call
    this.getItems()
    this.getBrand()
  }

  // get items with subCatId
  getItems() {
    this._ProductService.getAllItemsWithSearch(this.subCatId, this.searchText).subscribe((item) => {
      this.items = item.data
    })
  }

  // search in items
  onSearch(event: any){
    const text = event.target.value
    this.searchText = text
  }
  getItemsByText(){
    this._ProductService.getAllItemsWithSearch(this.subCatId, this.searchText).subscribe((item) => {
      this.items = item.data
    })
  }

  // get brand
  getBrand(){
    this._ProductService.getBrand(this.subCatId).subscribe((brand) => {
      this.brandName = brand.name
    })
  }


  // get one item
  getproduct(id: string){
    this._ProductService.getOneItem(id).subscribe((product) => {
      this.itemId = product.id
      this.editItemForm.patchValue({
        name: product.name,
        description: product.description,
        supplyPrice: product.supplyPrice,
        retailPrice: product.retailPrice,
        wholesalePrice: product.wholesalePrice,
        color: product.color,
        code: product.code,
        quantity: product.quantity,
        safeLimit: product.safeLimit,
        mainImage: product.mainImage,
        coverImage: product.coverImage
      })
    })
  }


  // add product
  onPickMainImage(event: any) {
    const imgFile = event.target.files[0]
    this.addItemForm.get('mainImage').setValue(imgFile)
  }

  onPickCoverImage(event: any) {
    const imgFil = event.target.files[0]
    this.addItemForm.get('coverImage').setValue(imgFil)
  }

  addItem() {
    const productForm = new FormData()
    productForm.append('name', this.addItemForm.get('name').getRawValue())
    productForm.append('description', this.addItemForm.get('description').getRawValue())
    productForm.append('supplyPrice', this.addItemForm.get('supplyPrice').getRawValue())
    productForm.append('retailPrice', this.addItemForm.get('retailPrice').getRawValue())
    productForm.append('wholesalePrice', this.addItemForm.get('wholesalePrice').getRawValue())
    productForm.append('color', this.addItemForm.get('color').getRawValue())
    productForm.append('quantity', this.addItemForm.get('quantity').getRawValue())
    productForm.append('safeLimit', this.addItemForm.get('safeLimit').getRawValue())
    productForm.append('mainImage', this.addItemForm.get('mainImage').getRawValue())
    productForm.append('coverImage', this.addItemForm.get('coverImage').getRawValue())
    productForm.append('subcategoryId', this.subCatId)

    this._ProductService.addItem(productForm).subscribe((added) => {
      this._ToastrService.success('product added 👍');
      this.addItemForm.reset();
      this.getItems();
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

  // edit product
  onEditMainImage(event: any) {
    var imgFile = event.target.files[0]
    this.editItemForm.get('mainImage').setValue(imgFile)
  }

  onEditCoverImage(event: any) {
    var imgFil = event.target.files[0]
    this.editItemForm.get('coverImage').setValue(imgFil)
  }


  editItem(){
    const editProduct = new FormData()
    editProduct.append('id', this.itemId)
    editProduct.append('name', this.editItemForm.get('name').getRawValue())
    editProduct.append('description', this.editItemForm.get('description').getRawValue())
    editProduct.append('supplyPrice', this.editItemForm.get('supplyPrice').getRawValue())
    editProduct.append('retailPrice', this.editItemForm.get('retailPrice').getRawValue())
    editProduct.append('wholesalePrice', this.editItemForm.get('wholesalePrice').getRawValue())
    editProduct.append('color', this.editItemForm.get('color').getRawValue())
    editProduct.append('code', this.editItemForm.get('code').getRawValue())
    editProduct.append('quantity', this.editItemForm.get('quantity').getRawValue())
    editProduct.append('safeLimit', this.editItemForm.get('safeLimit').getRawValue())
    editProduct.append('mainImage', this.editItemForm.get('mainImage').getRawValue())
    editProduct.append('coverImage', this.editItemForm.get('coverImage').getRawValue())
    editProduct.append('subcategoryId', this.subCatId)

    this._ProductService.updateItem(editProduct, this.itemId).subscribe((added) => {
      this._ToastrService.info('product updated 👏');
      this.editItemForm.reset();
      this.getItems();
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

  // delete product
  deleteProduct(id: string){
    this._ProductService.deleteItem(id).subscribe((del) => {
      this._ToastrService.error('product deleted 😭');
      this.getItems();
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
