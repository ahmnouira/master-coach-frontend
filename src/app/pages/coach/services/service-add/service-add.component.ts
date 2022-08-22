import { Component, OnInit } from '@angular/core';
import { IService } from 'src/app/interfaces/service.interface';
import { Animations } from 'src/app/shared/animations';

@Component({
  selector: 'app-service-add',
  templateUrl: './service-add.component.html',
  styleUrls: ['./service-add.component.scss'],
  animations: Animations
})
export class ServiceAddComponent implements OnInit {
  form: IService = {
    description: '', 
    title: '', 
    isFree: true, 
    isFixedPrice: true, 
    testimonies: [], 
    isAutoConfirmed: false, 
    image: '',
    duration: '', 
    category: '', 
    price: 0 
  

  };

  constructor() {}

  ngOnInit(): void {}

  addPhoto(event) {}

  save() {
    console.log('form', this.form)

  }
}
