import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() title = 'Enregistrer';
  @Input() isLoading: boolean = false;
  @Input() disabled: boolean

  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();

  @Input() type = 'submit';

  constructor() {}

  ngOnInit(): void {
    
  }

  handleClick(event: any) {
    this.onClick.emit(event);
  }
}
