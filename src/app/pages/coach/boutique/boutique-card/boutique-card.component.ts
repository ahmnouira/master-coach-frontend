import { Component, Input, OnInit } from '@angular/core';
import { Formation } from 'src/app/models/formation/formation.model';

@Component({
  selector: 'app-boutique-card',
  templateUrl: './boutique-card.component.html',
  styleUrls: ['./boutique-card.component.scss'],
})
export class BoutiqueCardComponent implements OnInit {

  @Input() formation : Formation

  constructor() {}

  ngOnInit(): void {}
}
