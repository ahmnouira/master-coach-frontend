import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product/product.model';

@Component({
  selector: 'app-boutique-info',
  templateUrl: './boutique-info.component.html',
  styleUrls: ['./boutique-info.component.scss'],
})
export class BoutiqueInfoComponent implements OnInit {
  @Input() product: Product;

  constructor() {}

  ngOnInit(): void {}
}
