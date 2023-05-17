import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  id: string | null;
  name: string = '';
  category: string = '';
  price: number = 0;
  details: string = '';
  token: string = this.cookieService.get('jwt');
  constructor(
    private _productService: ProductService,
    private toastr: ToastrService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private cookieService: CookieService
  ) {
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    if (this.id !== null) {
      this._productService.getProduct(this.id).subscribe({
        next: (data) => {
          this.name = data.name;
          this.category = data.category;
          this.price = data.price;
          this.details = data.details;
        },
        error: (e) => console.log(e),
      });
    }
  }
  deleteProduct() {
    if (this.id !== null && this.token) {
      this._productService.deleteProduct(this.id, this.token).subscribe({
        next: () => {
          this.toastr.success(
            'The product was deleted successfully',
            'Product deleted'
          );
          this.cookieService.delete('jwt', '/');
          this.router.navigate(['/']);
        },
        error: (e) => {
          console.log(e);
        },
      });
    } else {
      this.toastr.error('You need a token to delete this item', 'Token needed');
      this.router.navigate(['/get-token/' + this.id]);
    }
  }
}
