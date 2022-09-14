import { Component, Input, OnInit } from '@angular/core';
import { UserHelper } from 'src/app/helpers/UserHelper';
import { Product } from 'src/app/models/product/product.model';
import { Service } from 'src/app/models/service/service.model';
import { User } from 'src/app/models/user-model';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent extends UserHelper implements OnInit {
  @Input() user: User;

  @Input() data: any;

  @Input() page: 'view-product' | 'view-service';

  @Input() rating: boolean = false;

  equip: string;
  price: string;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.init(this.user);

    if (this.page === 'view-product') {
      const data = this.data as Product;
      this.getPrice(data.isFree, data.price);
    }
    if (this.page === 'view-service') {
      const data = this.data as Service;
      this.getCategory(data.category);
    }
  }

  getCategory(category: any) {
    if (!category) {
      return;
    }
    this.equip = category.toLowerCase().startsWith('Coaching') ? category : '';
  }

  getPrice(isFree: boolean, price: string) {
    if (isFree || !price) {
      this.price = 'Free';
    } else {
      this.price = price + '  €';
    }
  }
}
