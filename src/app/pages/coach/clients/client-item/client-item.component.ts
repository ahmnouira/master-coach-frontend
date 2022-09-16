import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserHelper } from 'src/app/helpers/UserHelper';
import { CoachService } from 'src/app/services/coach-service/coach.service';
import { LocalStorageService } from 'src/app/services/local-storage-service/local-storage.service';

@Component({
  selector: 'app-client-item',
  templateUrl: './client-item.component.html',
  styleUrls: ['./client-item.component.scss'],
})
export class ClientItemComponent extends UserHelper implements OnInit {
  @Input() client: any;

  @Input() tab: string;

  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();

  form: any = {
    selected: '',
  };
  selectedClient: any;

  constructor(private coachService: CoachService) {
    super();
  }

  ngOnInit(): void {
    this.init(this.client);
  }

  handleSelectClient(user: any) {
    const data = {
      ...user,
      tab: this.tab,
    };
    this.coachService.setSelectedClient = data;
  }

  handleCheckbox(event: any) {}
}
