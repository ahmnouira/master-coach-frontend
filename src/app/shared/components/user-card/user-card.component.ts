import { Component, Input, OnInit } from '@angular/core';
import { FileHelper } from 'src/app/helpers/FileHelper';
import { Product } from 'src/app/models/product/product.model';
import { Service } from 'src/app/models/service/service.model';
import { User } from 'src/app/models/user-model';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  @Input() user: User;

  @Input() data: any

  @Input() page: 'view-product' | 'view-service'

  @Input() rating: boolean = false;

  equip: string;
  price: string;
  photo: string;

  constructor() {}

  ngOnInit(): void {
    this.getPhoto();

    if(this.page === 'view-product') { 
      const data  = this.data as Product
      this.getPrice(data.isFree, data.price)
    }
    if(this.page === 'view-service') {
      const data  = this.data as Service
      this.getCategory(data.category);
    }
  }


  getCompetences(): string {
    const array = this.getExpertise('category');
    if (!array.length) {
      return '';
    }
    return array.join(' - ');
  }

  getExpertise(name: 'category' | 'accreditation' | 'competance'): string[] {
    console.log('user', this.user.category)

    if (!Array.isArray(this.user[name])) {
      return [];
    }
    try {
      const parsedArray = JSON.parse(this.user[name].toString()) as any[];

     
      return parsedArray.map((el) => el.name);
    } catch (error) {
      return [];
    }
  }

  getPhoto() {
    if (this.user && this.user.photo) {
      this.photo = FileHelper.getUrl(this.user.photo);
    }
  }

  getCategory(category: any) {
    if(!category) {
      return 
    }
    this.equip = category.toLowerCase().startsWith('Coaching')
      ? category
      : '';
  }

  getPrice(isFree: boolean, price: string) {
    if (isFree || !price) {
      this.price = 'Free';
    } else {
      this.price = price + '  €';
    }
  }
}
