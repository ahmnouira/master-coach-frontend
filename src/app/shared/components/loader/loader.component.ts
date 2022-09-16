import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  @Input() marginTop: string = '';

  @Input() showText: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
