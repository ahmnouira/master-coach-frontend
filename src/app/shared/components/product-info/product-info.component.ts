import { Component, Input, OnInit } from '@angular/core';
import { FileHelper } from 'src/app/helpers/FileHelper';
import { IProduct } from 'src/app/interfaces/product.interface';
import { ProductType } from 'src/app/models/product/product-type.enum';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss'],
})
export class ProductInfoComponent implements OnInit {
  @Input() product: IProduct;

  backgroundImage: string;


  isVideo :boolean

  isAudio: boolean

  

  constructor() {}

  ngOnInit(): void {
    this.getBackgroundImage();
    this.getProductType()
  }

  getProductType() {
    this.isVideo = this.product.type === ProductType.VIDEO
  }

  getBackgroundImage() {
    if (typeof this.product.image == 'string') {
      this.backgroundImage = `linear-gradient(180deg, #FEEFEA00 0%, #FEEFEA 100%), url(${FileHelper.getUrl(
        this.product.image
      )})`;
    }
  }
}
