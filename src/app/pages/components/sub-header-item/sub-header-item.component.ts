import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sub-header-item',
  templateUrl: './sub-header-item.component.html',
  styleUrls: ['./sub-header-item.component.scss'],
})
export class SubHeaderItemComponent implements OnInit {
  @Input() items: any[];

  @Input() name: string;

  icon: string = '';

  constructor() {}

  ngOnInit(): void {
    this.getIcon();
  }

  getIcon() {
    switch (this.name) {
      case 'notification':
        this.icon = 'assets/img/common/notification%20(4).svg';
        break;
      case 'orders':
        this.icon = 'assets/img/common/bag.svg';
        break;
      default:
        break;
    }
  }
}
