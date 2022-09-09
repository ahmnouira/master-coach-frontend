import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cart-card',
  templateUrl: './cart-card.component.html',
  styleUrls: ['./cart-card.component.scss'],
})
export class CartCardComponent implements OnInit {
  @Input() order: any;

  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();

  @Input() allowDelete: boolean = true;

  @Input() facture : boolean = false  

  constructor() {}


  ngOnInit(): void {}

  handleDelete() {
    this.onDelete.emit(this.order._id);
  }
}
