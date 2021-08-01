import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  yearRange: any[] = [];
  constructor() { }

  ngOnInit(): void {
    this.getYearRange();
  }
  getYearRange() {
    let date = new Date();
    this.yearRange[0] = date.getFullYear() - 1;
    this.yearRange[1] = date.getFullYear();
  }
}
