import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/models/service/service.model';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss'],
})
export class ServicesListComponent implements OnInit {
  filterString = '';

  services: Service[] = [
    {
      id: '1',
      image: '',
      title: 'Coaching carrière',
      description: 'Comment gérer ses émotions au travail ?',
    },
    {
      id: '2',
      image: '',
      title: 'Coaching carrière',
      description: 'Comment gérer ses émotions au travail ?',
    },
    {
      id: '3',
      image: '',
      title: 'Coaching carrière',
      description: 'Comment gérer ses émotions au travail ?',
    },

    {
      id: '4',
      image: '',
      title: 'Coaching carrière',
      description: 'Comment gérer ses émotions au travail ?',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  filterInputChanged(event) {}
}
