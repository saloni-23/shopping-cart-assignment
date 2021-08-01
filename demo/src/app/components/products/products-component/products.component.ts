import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Categories } from 'src/app/models/categories.interface';
import { Product } from 'src/app/models/product.inteface';
import { CartResponse } from 'src/app/models/response.inteface';
import { AuthService } from 'src/app/sevices/auth.service';
import { CartService } from 'src/app/sevices/cart.service';
import { HttpService } from 'src/app/sevices/http.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  categoryArray: Categories[] = [];
  productArray: Product[] = [];
  filteredArray: Product[] = [];
  navigationSubscription: any;
  cartSubscription: Subscription;
  imageURLPrefix: string = '/assets//';
  cartValue: number = 0;
  cartArray: Product[] = [];
  selectedCategoryId: string = '';
  selectedCategoryName = {} as Categories;
  constructor(
    private httpSrv: HttpService,
    private route: ActivatedRoute,
    private cartSrv: CartService,
    private router: Router,
    private _authService: AuthService
  ) {
    this.cartSubscription = this.cartSrv
      .getCartTotalCount()
      .subscribe((data) => {
        this.cartValue = data;
      });
    this.navigationSubscription = this.route.params.subscribe((route) => {
      this.selectedCategoryId = route['id'];
      if (this.selectedCategoryId) {
        this.filterProductsBasedOnId(this.selectedCategoryId);
      } else this.filteredArray = this.productArray;
    });
  }

  ngOnInit(): void {
    if (!this._authService.isLoggedIn()) this._authService.routeToDefaultView();
    this.getCategoryList();
    this.getProductList();

    this.cartSrv.getCartValue().subscribe((data) => {
      this.cartArray = data;
    });
  }
  getCategoryList(): void {
    this.httpSrv.getCategoriesList().subscribe((data: Categories[]) => {
      this.categoryArray = data;
      this.categoryArray.sort(
        (a: Categories, b: Categories) => a.order - b.order
      );
      if (this.selectedCategoryId) {
        this.selectedCategoryName = this.categoryArray.find(
          (val) => val.id == this.selectedCategoryId
        )!;
      } else this.selectedCategoryName.id = '';
    });
  }
  getProductList(): void {
    this.httpSrv.getProductsList().subscribe((data: Product[]) => {
      this.productArray = data;
      this.filteredArray = data;
      if (this.selectedCategoryId)
        this.filterProductsBasedOnId(this.selectedCategoryId);
    });
  }

  filterProductsBasedOnId(paramId: string): void {
    this.filteredArray = this.productArray.filter(
      (data: Product) => data.category == paramId
    );
  }

  addItemToCart(item: Product): void {
    this.httpSrv.addProductToCart(item.id).subscribe((res: CartResponse) => {
      if (res) {
        if (res.response === 'Success') {
          item['quantity'] = item?.quantity ? ++item.quantity : 1;
          item['totalPrice'] = this.cartSrv.getProductFinalPrice(
            item.quantity,
            item.price
          );
          const index = this.cartArray.findIndex(
            (val: Product) => val.id === item.id
          );
          if (index > -1) {
            this.cartArray[index] = item;
          } else {
            this.cartArray.push(item);
          }
          this.cartSrv.updateCartValue(this.cartArray);
        }
      }
    });
  }
  selectCategory(id: string): void {
    if (id) {
      this.router.navigate([`products/${id}`]);
    }
  }

  ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
    this.cartSubscription.unsubscribe();
  }
}
