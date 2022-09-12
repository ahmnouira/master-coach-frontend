import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouteService } from 'src/app/services/route-service/route.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() title = 'Enregistrer';
  @Input() isLoading: boolean = false;
  @Input() disabled: boolean;

  @Input() variant?: 'submit' | 'add' | 'basic' | 'auth' = 'submit';

  @Input() fullWith: boolean = false;

  @Input() path?: string;

  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();

  @Input() type = 'submit';

  constructor(private routerService: RouteService) {}

  ngOnInit(): void {
    this.path = this.path ?? 'add';
  }

  handleClick(event: any) {
    this.onClick.emit(event);
  }
}
