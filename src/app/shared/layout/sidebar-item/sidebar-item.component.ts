import { Component, Input, OnInit } from '@angular/core';
import { SidebarItem } from 'src/app/types/sidebar-item.type';

@Component({
  selector: 'app-sidebar-item',
  templateUrl: './sidebar-item.component.html',
  styleUrls: ['./sidebar-item.component.scss'],
})
export class SidebarItemComponent implements OnInit {
  @Input() item: SidebarItem;

  constructor() {}

  ngOnInit(): void {}
}
