import { Component, OnInit } from '@angular/core';
import { FormationType } from 'src/app/models/formation/formation-type.enum';
import { Formation } from 'src/app/models/formation/formation.model';

@Component({
  selector: 'app-boutique-list',
  templateUrl: './boutique-list.component.html',
  styleUrls: ['./boutique-list.component.scss'],
  
})
export class BoutiqueListComponent implements OnInit {
  filterString = '';

  formations: Formation[] = [
    {
      id: '1',
      image: '',
      price: "15,00 €", 
      title: "David Laroche", 
      subTitle: "Coaching d’équipe",
      type: FormationType.PDF
    },
    {
      id: '2',
      image: '',
      price: "15,00 €", 
      title: "David Laroche", 
      subTitle: "Coaching d’équipe",
      type: FormationType.PDF
    },
    {
      id: '3',
      image: '',
      price: "15,00 €", 
      title: "David Laroche", 
      subTitle: "Coaching d’équipe",
      type: FormationType.PDF
    },
    {
      id: '4',
      image: '',
      price: "15,00 €", 
      title: "David Laroche", 
      subTitle: "Coaching d’équipe",
      type: FormationType.PDF
    },
   
  ];

  constructor() {}

  ngOnInit(): void {}

  filterInputChanged(event) {}
}
