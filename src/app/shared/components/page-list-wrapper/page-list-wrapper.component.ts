import { Component, Input, OnInit } from '@angular/core';
import { Animations } from '../../animations';

@Component({
  selector: 'app-page-list-wrapper[title][error][found][isLoading]',
  templateUrl: './page-list-wrapper.component.html',
  styleUrls: ['./page-list-wrapper.component.scss'],
  animations: Animations,
})
export class PageListWrapperComponent implements OnInit {
  @Input() isLoading: boolean;

  @Input() error: any;

  @Input() found: boolean;

  @Input() title: string;

  @Input() animated: boolean = true;

  constructor() {}

  ngOnInit(): void {}
}
