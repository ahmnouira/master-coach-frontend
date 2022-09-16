import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card-tools',
  templateUrl: './card-tools.component.html',
  styleUrls: ['./card-tools.component.scss'],
})
export class CardToolsComponent implements OnInit {
  @Input() editPath: string;

  @Input() viewPath: string;

  @Input() isHidden: boolean;

  @Output() onHide: EventEmitter<any> = new EventEmitter<any>();

  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  handleHide() {
    this.isHidden = !this.isHidden;
    this.onHide.emit();
  }
}
