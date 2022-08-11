import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'loading-card',
  templateUrl: './loading-card.component.html',
  styleUrls: ['./loading-card.component.scss'],
})
export class LoadingCardComponent implements OnInit {
  @Input() loading: boolean = true;
  constructor() {}

  ngOnInit() {}
}
