import { Component, OnInit } from '@angular/core';
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
export class HomeComponent implements OnInit {
  imageURLPrefix: string = '/assets//';
  imageArray: Banner[] = [];
  categoryArray: Categories[] = [];
  constructor(
    private httpSrv: HttpService,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    if (!this._authService.isLoggedIn()) this._authService.routeToDefaultView();
    this.getBanners();
    this.getCategoryList();
  }
  getBanners(): void {
    this.httpSrv.getBannersList().subscribe((res: Banner[]) => {
      this.imageArray = res;
    });
  }

  getCategoryList(): void {
    this.httpSrv.getCategoriesList().subscribe((res: Categories[]) => {
      this.categoryArray = res;
    });
  }
}
