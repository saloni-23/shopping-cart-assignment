import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, HttpClientModule, RouterModule,FontAwesomeModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
