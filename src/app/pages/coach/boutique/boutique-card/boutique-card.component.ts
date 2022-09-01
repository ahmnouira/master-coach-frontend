import { Component, Input, OnInit } from '@angular/core';
import { PDF_ICON, VIDEO_ICON, PODCAST_ICON } from 'src/app/constants/icons';
import { FileHelper } from 'src/app/helpers/FileHelper';
import { ProductType } from 'src/app/models/product/product-type.enum';
import { Product } from 'src/app/models/product/product.model';

@Component({
  selector: 'app-boutique-card',
  templateUrl: './boutique-card.component.html',
  styleUrls: ['./boutique-card.component.scss'],
})
export class BoutiqueCardComponent implements OnInit {
  @Input() product: Product;

  price: string;
  icon: string;
  backgroundImage: string;

  constructor() {}

  ngOnInit(): void {
    this.getBackgroundImage();
    this.getPrice();
    this.getIcon();
  }

  getIcon() {
    switch (this.product.type) {
      case ProductType.DOCUMENT:
        this.icon = PDF_ICON;
        break;
      case ProductType.PODCAST:
        this.icon = PODCAST_ICON;
        break;
      case ProductType.VIDEO:
        this.icon = VIDEO_ICON;
        break;
      default:
        break;
    }
  }

  getPrice() {
    if (this.product.isFree || !this.product.price) {
      this.price = 'Free';
    } else {
      this.price = this.product.price + '  €';
    }
  }

  getBackgroundImage() {
    if (typeof this.product.image == 'string') {
      this.backgroundImage = `linear-gradient(180deg, #FEEFEA00 0%, #FEEFEA 100%), url(${FileHelper.getUrl(
        this.product.image
      )})`;
    }
  }
}
