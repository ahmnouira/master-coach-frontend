import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product/product.model';

@Component({
  selector: 'app-boutique-card',
  templateUrl: './boutique-card.component.html',
  styleUrls: ['./boutique-card.component.scss'],
})
export class BoutiqueCardComponent implements OnInit {
  @Input() product: Product;

  constructor() {}

  ngOnInit(): void {}
}
