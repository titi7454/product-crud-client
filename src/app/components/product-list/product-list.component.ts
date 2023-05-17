import {
  AfterViewInit,
  Component,
  OnInit,
  AfterContentInit,
} from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent
  implements OnInit, AfterViewInit, AfterContentInit
{
  productsList: Product[] = [];

  constructor(private _productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }
  ngAfterViewInit(): void {
    this.getProducts();
  }
  ngAfterContentInit(): void {
    this.getProducts();
  }
  getProducts() {
    this._productService.getProducts().subscribe({
      next: (data) => {
        this.productsList = data;
      },
      error: (e) => console.log(e),
    });
  }
}
