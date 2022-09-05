import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-coach-menu',
  templateUrl: './coach-menu.component.html',
  styleUrls: ['./coach-menu.component.scss'],
})
export class CoachMenuComponent implements OnInit {
  @Input() active: string;

  constructor() {}

  ngOnInit(): void {}
}
