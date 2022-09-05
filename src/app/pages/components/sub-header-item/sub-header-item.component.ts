import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sub-header-item',
  templateUrl: './sub-header-item.component.html',
  styleUrls: ['./sub-header-item.component.scss'],
})
export class SubHeaderItemComponent implements OnInit {
  @Input() items: any[];

  constructor() {}

  ngOnInit(): void {}
}
