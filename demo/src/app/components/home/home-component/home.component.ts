import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Banner } from 'src/app/models/banner.interface';
import { Categories } from 'src/app/models/categories.interface';
import { AuthService } from 'src/app/sevices/auth.service';
import { CartService } from 'src/app/sevices/cart.service';
import { HttpService } from 'src/app/sevices/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  imageURLPrefix: string = '/assets//';
  imageArray: Banner[] = [];
  categoryArray: Categories[] = [];
  loginStatusSubscription: Subscription;
  constructor(
    private readonly _httpSrv: HttpService,
    private readonly _authService: AuthService
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
    this.getBanners();
    this.getCategoryList();
  }
  getBanners(): void {
    this._httpSrv.getBannersList().subscribe((res: Banner[]) => {
      this.imageArray = res;
    });
  }

  getCategoryList(): void {
    this._httpSrv.getCategoriesList().subscribe((res: Categories[]) => {
      this.categoryArray = res;
    });
  }
  ngOnDestroy(): void {
    this.loginStatusSubscription.unsubscribe();
  }
}
