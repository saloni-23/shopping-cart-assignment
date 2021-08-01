import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from 'src/app/sevices/cart.service';
import { CartComponent } from '../../components/cart/cart.component';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/sevices/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  cartSubscription: Subscription;
  showMenuFlag: boolean = false;
  itemCount: number = 0;

  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
    if (this.showMenuFlag && window.innerWidth > 900)
      this.showMenuFlag = false;
  }
  constructor(
    private _cartService: CartService,
    private _modalService: NgbModal,
    private _authService : AuthService,
    private _library: FaIconLibrary
  ) {
    this.cartSubscription =    this._cartService.getCartTotalCount().subscribe((val: number) => {
      this.itemCount = val;
    })
    _library.addIcons(faBars);
    this.onResize();
  }
  ngOnInit(): void {
    console.log(
      'Headerrr',
      localStorage.getItem('email'),
      localStorage.getItem('password')
    );
  }

  toggleMenuList(): void {
    this.showMenuFlag = !this.showMenuFlag;
  }
  openCart(): void {
    this._modalService.open(CartComponent, {
      size: 'lg',
      centered: true,
    });
  }
  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }
}
