import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/models/service/service.model';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit {
  filterString = '';

  services: Service[] = [
    {
      id: '1',
      image: '',
      label: 'Coaching carrière',
      text: 'Comment gérer ses émotions au travail ?',
    },
    {
      id: '2',
      image: '',
      label: 'Coaching carrière',
      text: 'Comment gérer ses émotions au travail ?',
    },
    {
      id: '3',
      image: '',
      label: 'Coaching carrière',
      text: 'Comment gérer ses émotions au travail ?',
    },

    {
      id: '4',
      image: '',
      label: 'Coaching carrière',
      text: 'Comment gérer ses émotions au travail ?',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  filterInputChanged(event) {}
}
