import { Component, Input, OnInit } from '@angular/core';
import { PageHelper } from 'src/app/helpers/PageHelper';
import { Service } from 'src/app/models/service/service.model';
import { RouteService } from 'src/app/services/route-service/route.service';
import { UserService } from 'src/app/services/user-service/user-service.service';

@Component({
  selector: 'app-coach-services',
  templateUrl: './coach-services.component.html',
  styleUrls: ['./coach-services.component.scss']
})
export class CoachServicesComponent extends PageHelper<Service[]> implements OnInit {


  @Input() id: string 
  mouseDown = false;

  startX: any;

  scrollLeft: any;

  slider = document.querySelector<HTMLElement>('.wrapper');

  constructor(private route: RouteService, private userService: UserService) {
    super()
  }

  ngOnInit(): void {
      this.getServices()
  }

  getServices() {
    this.getData(this.userService.getUserServices(this.id), {
      debug: true,
    });
  }

  // /pages/client/rdv/detail-formation

  startDragging(e: any, flag: any, el: any) {
    this.mouseDown = true;
    this.startX = e.pageX - el.offsetLeft;
    this.scrollLeft = el.scrollLeft;
  }
  stopDragging(e: any, flag) {
    this.mouseDown = false;
  }
  moveEvent(e, el) {
    e.preventDefault();
    if (!this.mouseDown) {
      return;
    }
    const x = e.pageX - el.offsetLeft;
    const scroll = x - this.startX;
    el.scrollLeft = this.scrollLeft - scroll;
  }
}
