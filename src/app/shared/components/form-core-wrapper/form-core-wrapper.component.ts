import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-core-wrapper',
  templateUrl: './form-core-wrapper.component.html',
  styleUrls: ['./form-core-wrapper.component.scss'],
})
export class FormCoreWrapperComponent implements OnInit {
  @Input() title: string;

  image: string;

  constructor() {}

  ngOnInit(): void {
    this.image = 'assets/img/login/mastercoach.svg';
  }
}
