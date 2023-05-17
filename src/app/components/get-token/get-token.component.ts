import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-get-token',
  templateUrl: './get-token.component.html',
  styleUrls: ['./get-token.component.css'],
})
export class GetTokenComponent implements OnInit {
  id: string | null;
  name: string = '';

  constructor(
    private _productService: ProductService,
    private router: Router,
    private toastr: ToastrService,
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
        },
        error: (e) => console.log(e),
      });
    }
  }

  getToken() {
    if (this.id !== null) {
      this._productService.getToken(this.id).subscribe({
        next: (data) => {
          this.toastr.success('The token was set successfully', 'Token set');
          this.router.navigate(['/product-details/' + this.id]);
          this.cookieService.set('jwt', data);
        },
        error: (e) => console.log(e),
      });
    }
  }
}
