import { Component, Input, OnInit } from '@angular/core';
import { Service } from 'src/app/models/service/service.model';

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss'],
})
export class ServiceCardComponent implements OnInit {
  @Input() service: Service;

  constructor() {}

  ngOnInit(): void {}
}
