import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent implements OnInit {
  productForm: FormGroup;
  title = 'Create product';
  buttonText = 'Create';
  id: string | null;
  isEditingProduct: boolean = false;
  ngOnInit(): void {
    this.isEditing();
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _productService: ProductService,
    private aRouter: ActivatedRoute
  ) {
    this.productForm = this.fb.group({
      product: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      details: ['', Validators.required],
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  createProduct() {
    const PRODUCT: Product = {
      name: this.productForm.get('product')?.value,
      category: this.productForm.get('category')?.value,
      price: this.productForm.get('price')?.value,
      details: this.productForm.get('details')?.value,
    };
    if (!this.isEditingProduct) {
      this._productService.createProduct(PRODUCT).subscribe({
        next: () => {
          this.toastr.success(
            'The product was created successfully!',
            'Success!'
          );
          this.router.navigate(['/']);
        },
        error: (e) => {
          console.log(e);
          this.productForm.reset();
        },
      });
    } else if (this.id !== null && this.isEditingProduct) {
      this._productService.editProduct(this.id, PRODUCT).subscribe({
        next: () => {
          this.toastr.success(
            'The product was edited successfully!',
            'Success!'
          );
          this.router.navigate(['/']);
        },
        error: (e) => {
          console.log(e);
          this.productForm.reset();
        },
      });
    }
  }

  isEditing() {
    if (this.id !== null) {
      this.isEditingProduct = true;
      this.title = 'Editing product';
      this.buttonText = 'Edit';

      this._productService.getProduct(this.id).subscribe({
        next: (data) => {
          console.log(data);
          this.productForm.setValue({
            product: data.name,
            category: data.category,
            price: data.price,
            details: data.details,
          });
        },
      });
    }
  }
}
