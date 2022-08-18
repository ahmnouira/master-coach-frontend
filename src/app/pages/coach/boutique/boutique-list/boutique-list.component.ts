import { Component, OnInit } from '@angular/core';
import { ProductType } from 'src/app/models/product/product-type.enum';
import { Product } from 'src/app/models/product/product.model';

@Component({
  selector: 'app-boutique-list',
  templateUrl: './boutique-list.component.html',
  styleUrls: ['./boutique-list.component.scss'],
})
export class BoutiqueListComponent implements OnInit {
  filterString = '';

  formations: Product[] = [
    {
      id: '1',
      image: '',
      price: '15,00 €',
      title: 'David Laroche',
      description: 'Coaching d’équipe',
      type: ProductType.DOCUMENT,
    },
    {
      id: '2',
      image: '',
      price: '15,00 €',
      title: 'David Laroche',
      description: 'Coaching d’équipe',
      type: ProductType.DOCUMENT,
    },
    {
      id: '3',
      image: '',
      price: '15,00 €',
      title: 'David Laroche',
      description: 'Coaching d’équipe',
      type: ProductType.DOCUMENT,
    },
    {
      id: '4',
      image: '',
      price: '15,00 €',
      title: 'David Laroche',
      description: 'Coaching d’équipe',
      type: ProductType.DOCUMENT,
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  filterInputChanged(event) {}
}
