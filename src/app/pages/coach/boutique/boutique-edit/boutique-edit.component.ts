import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-boutique-edit',
  templateUrl: './boutique-edit.component.html',
  styleUrls: ['./boutique-edit.component.scss'],
})
export class BoutiqueEditComponent implements OnInit {
  id: string;
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
  }
}
