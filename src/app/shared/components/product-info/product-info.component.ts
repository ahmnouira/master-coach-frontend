import { Component, Input, OnInit } from '@angular/core';
import { FileHelper } from 'src/app/helpers/FileHelper';
import { ProductType } from 'src/app/models/product/product-type.enum';
import { ProductService } from 'src/app/services/product-service/product.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss'],
})
export class ProductInfoComponent implements OnInit {
  @Input() product: any;
  @Input() showDownload: boolean = false;

  backgroundImage: string;

  isVideo: boolean;

  isAudio: boolean;

  isSubmitting = false;

  disabled: boolean;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getBackgroundImage();
    this.getProductType();
    this.disabled =
      !this.product.title ||
      !this.product.file ||
      !this.product.type ||
      !this.showDownload;
  }

  generateFile() {
    const { title, file, type } = this.product;
    if (!this.showDownload) {
      return;
    }
    if (!title || !file || !type) {
      return;
    }
    this.isSubmitting = true;
    this.productService.downloadFile(FileHelper.getUrl(file)).subscribe(
      (res) => {
        FileHelper.createFile(res as Blob, FileHelper.formatName(title));
        this.isSubmitting = false;
      },
      (error) => {
        console.error(error);
        this.isSubmitting = false;
      }
    );
  }

  download() {
    const { title, file, type } = this.product;

    if (!this.showDownload) {
      return;
    }

    if (!title || !file || !type) {
      return;
    }
    this.isSubmitting = true;
    try {
      FileHelper.downloadFile(
        FileHelper.getUrl(file),
        FileHelper.formatName(title)
      );
    } catch (error) {
      console.error(error);
    } finally {
      this.isSubmitting = false;
    }
  }

  getProductType() {
    this.isVideo = this.product.type === ProductType.VIDEO;
  }

  getBackgroundImage() {
    if (typeof this.product.image == 'string') {
      this.backgroundImage = `linear-gradient(180deg, #DDF2FA00 0%, #DDF2FA 100%), url(${FileHelper.getUrl(
        this.product.image
      )})`;
    }
  }
}
