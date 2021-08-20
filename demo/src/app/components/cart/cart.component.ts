import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.inteface';
import { AuthService } from 'src/app/sevices/auth.service';
import { CartService } from 'src/app/sevices/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  promotionImageURL: string = 'assets//static/images/lowest-price.png';
  imageURLPrefix: string = '/assets//';
  loginStatusSubscription: Subscription;
  totalItemCount: number = 0;
  cartArray: Product[] = [];
  totalCartPrice: number = 0;
  constructor(
    public readonly _activeModal: NgbActiveModal,
    private readonly _cartService: CartService,
    private readonly _authService: AuthService,
    private readonly _router: Router
  ) {
    this.loginStatusSubscription = this._authService
      .isLoggedIn()
      .subscribe((val: string | null) => {
        if (!val) {
          this._authService.routeToDefaultView();
        }
      });
  }

  ngOnInit(): void {
    this._cartService.getCartTotalCount().subscribe((val: number) => {
      this.totalItemCount = val;
    });
    this._cartService.getCartValue().subscribe((cart: any) => {
      this.cartArray = cart;
      this.totalCartPrice = this._cartService.getTotalCartPrice();
    });
  }
  increment(index: number): void {
    this.cartArray[index].quantity = this._cartService.incrementQty(index);
  }
  decrement(index: number): void {
    this.cartArray[index].quantity = this._cartService.decrementQty(index);
  }
  routeToProducts() {
    this._router.navigate(['/products']);
  }
  ngOnDestroy(): void {
    this.loginStatusSubscription.unsubscribe();
  }
}
