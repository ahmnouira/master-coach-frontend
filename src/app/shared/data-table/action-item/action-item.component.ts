import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-action-item[icon][path]',
  templateUrl: './action-item.component.html',
  styleUrls: ['./action-item.component.scss'],
})
export class ActionItemComponent implements OnInit {
  @Input() icon: string;
  @Input() path: string;

  constructor() {
    console.log('route::::::::::::', this.path, this.icon);
  }

  ngOnInit(): void {
    this.getIcon();
  }

  getIcon() {
    if (this.icon === 'view') {
      this.icon = 'assets/img/common/view%20(1).svg';
    } else if (this.icon === 'delete') {
      this.icon = 'assets/img/common/trash-bin.svg';
    } else if (this.icon === 'edit') {
      this.icon = 'assets/img/common/Layer%2092.svg';
    }
  }
}
