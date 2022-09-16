import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-info',
  templateUrl: './text-info.component.html',
  styleUrls: ['./text-info.component.scss'],
})
export class TextInfoComponent implements OnInit {
  @Input() title: string;
  @Input() value: string;

  constructor() {}

  ngOnInit(): void {}
}
