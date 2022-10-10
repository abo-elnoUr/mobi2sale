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

  brandName: string = ''
  subCatId: string = ''
  apiSrc = 'http://algosys-001-site8.ctempurl.com'
  items: any = {}
  addItemForm: FormGroup

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
    // function call
    this.getItems()
  }

  // get items with subCatId
  getItems() {
    this._ProductService.getAllItems(this.subCatId).subscribe((item) => {
      this.items = item.data
      console.log(item.data[0].color);

    })
  }

  // add product

  onPickMainImage(event: any) {
    var imgFile = event.target.files[0]
    this.addItemForm.get('mainImage').setValue(imgFile)
  }

  onPickCoverImage(event: any) {
    var imgFil = event.target.files[0]
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

}
