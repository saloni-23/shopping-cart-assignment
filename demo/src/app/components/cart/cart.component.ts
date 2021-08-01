import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/sevices/auth.service';
import { CartService } from 'src/app/sevices/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  promotionImageURL: string = 'assets//static/images/lowest-price.png';
  constructor(
    public _activeModal: NgbActiveModal,
    private readonly _cartService: CartService,
    private readonly _authService: AuthService
  ) {}
  totalItemCount: number = 0;
  cartArray: any = [];
  totalCartPrice: number = 0;
  imageURLPrefix: string = '/assets//';

  ngOnInit(): void {
    if (!this._authService.isLoggedIn()) this._authService.routeToDefaultView();

    this._cartService.getCartTotalCount().subscribe((val: number) => {
      this.totalItemCount = val;
    });
    this._cartService.getCartValue().subscribe((cart: any) => {
      this.cartArray = cart;
      this.totalCartPrice = this._cartService.getTotalCartPrice();
    });
  }
  increment(index: number): void {
    this._cartService.incrementQty(index);
  }
  decrement(index: number): void {
    this._cartService.decrementQty(index);
  }
}
