import { Component, Input, OnInit } from '@angular/core';
import { FileHelper } from 'src/app/helpers/FileHelper';
import { ProductType } from 'src/app/models/product/product-type.enum';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss'],
})
export class ProductInfoComponent implements OnInit {
  @Input() image: any;
  @Input() type: ProductType;
  @Input() description: string;

  backgroundImage: string;

  isVideo: boolean;

  isAudio: boolean;

  constructor() {}

  ngOnInit(): void {
    this.getBackgroundImage();
    this.getProductType();
  }

  getProductType() {
    this.isVideo = this.type === ProductType.VIDEO;
  }

  getBackgroundImage() {
    if (typeof this.image == 'string') {
      this.backgroundImage = `linear-gradient(180deg, #DDF2FA00 0%, #DDF2FA 100%), url(${FileHelper.getUrl(
        this.image
      )})`;
    }
  }
}
