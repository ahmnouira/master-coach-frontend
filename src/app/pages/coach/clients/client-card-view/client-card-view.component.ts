import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { UserHelper } from 'src/app/helpers/UserHelper';

@Component({
  selector: 'app-client-card-view',
  templateUrl: './client-card-view.component.html',
  styleUrls: ['./client-card-view.component.scss'],
 
})
export class ClientCardViewComponent extends UserHelper implements OnInit {

  @Input() user: any

  ngOnChanges(changes: SimpleChanges) {
   this.init(this.user)
  }

  constructor() { 
    super()
  }

  ngOnInit(): void {
    this.init(this.user)
  }
}
