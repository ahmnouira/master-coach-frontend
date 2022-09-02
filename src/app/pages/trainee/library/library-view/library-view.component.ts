import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-library-view',
  templateUrl: './library-view.component.html',
  styleUrls: ['./library-view.component.scss'],
})
export class LibraryViewComponent implements OnInit {

  id: string = ''

  constructor(private activatedRoute: ActivatedRoute ) {}

  ngOnInit(): void {
    this.getId()
  }

  getId() {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
  }
}
