import { Component, Input, OnInit } from '@angular/core';
import { FileHelper } from 'src/app/helpers/FileHelper';
import { Product } from 'src/app/models/product/product.model';
import { User } from 'src/app/models/user-model';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  @Input() user: User;

  @Input() product: Product;

  @Input() rating: boolean = false;

  equip: string;
  price: string;
  photo: string;

  constructor() {}

  ngOnInit(): void {
    this.getCategory();
    this.getPrice();
    this.getPhoto();
  }

  getPhoto() {
    if (this.user) {
      this.photo = FileHelper.getUrl(this.user.photo);
    }
  }

  getCategory() {
    this.equip = this.product.category.toLowerCase().startsWith('Coaching')
      ? this.product.category
      : '';
  }

  getPrice() {
    if (this.product.isFree || !this.product.price) {
      this.price = 'Free';
    } else {
      this.price = this.product.price + '  €';
    }
  }
}
