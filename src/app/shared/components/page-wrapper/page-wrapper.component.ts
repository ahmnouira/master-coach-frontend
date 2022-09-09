import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-wrapper',
  templateUrl: './page-wrapper.component.html',
  styleUrls: ['./page-wrapper.component.scss'],
})
export class PageWrapperComponent implements OnInit {
  @Input() container: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
