import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() title = 'Enregistrer';
  @Input() isLoading: boolean = false;
  @Input() disabled: boolean | string;

  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();

  @Input() type = 'submit';

  constructor() {}

  ngOnInit(): void {
    this.disabled = this.isLoading;
    this.disabled = Boolean(this.disabled);
  }

  handleClick(event: any) {
    this.onClick.emit(event);
  }
}
