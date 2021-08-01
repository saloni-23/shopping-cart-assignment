import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CartComponent } from './components/cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterModule } from './components/register/register.module';
import { LoginModule } from './components/login/login.module';
import { HomeModule } from './components/home/home.module';
import { CartModule } from './components/cart/cart.module';
import { ProductsModule } from './components/products/products.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    // Lazy Loading Module
    SharedModule,
    RegisterModule,
    LoginModule,
    HomeModule,
    CartModule,
    ProductsModule,
  ],
  bootstrap: [AppComponent],
  entryComponents: [CartComponent],
})
export class AppModule {}
