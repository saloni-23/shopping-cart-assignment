import { Component, HostListener, OnDestroy } from '@angular/core';
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
export class HeaderComponent implements OnDestroy {
  cartSubscription: Subscription;
  loginStatusSubscription: Subscription;
  showMenuFlag: boolean = false;
  itemCount: number = 0;
  isUserLoggedIn = false;
  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
    if (this.showMenuFlag && window.innerWidth > 900) this.showMenuFlag = false;
  }
  constructor(
    private readonly _cartService: CartService,
    private readonly _modalService: NgbModal,
    private readonly _authService: AuthService,
    private readonly _library: FaIconLibrary
  ) {
    this.cartSubscription = this._cartService
      .getCartTotalCount()
      .subscribe((val: number) => {
        this.itemCount = val;
      });
    this._library.addIcons(faBars);
    this.onResize();
    this.loginStatusSubscription = this._authService
      .isLoggedIn()
      .subscribe((val: string | null) => {
        this.isUserLoggedIn = val ? true : false;
      });
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
  signOut() {
    this._authService.setUserLoggedInStatus(null);
    this._authService.routeToDefaultView();
  }
  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
    this.loginStatusSubscription.unsubscribe();
  }
}
