import { Component, OnInit } from '@angular/core';
import { RouteService } from 'src/app/services/route-service/route.service';

@Component({
  selector: 'app-coach-services',
  templateUrl: './coach-services.component.html',
  styleUrls: ['./coach-services.component.scss']
})
export class CoachServicesComponent implements OnInit {

  coach: any = {};
  mouseDown = false;

  startX: any;

  scrollLeft: any;

  slider = document.querySelector<HTMLElement>('.wrapper');

  constructor(private route: RouteService) {}

  ngOnInit(): void {
    this.coach = history.state?.id;
    console.log(this.coach);
  }


  goToDetailFormation(e, formation) {
    e.preventDefault();
    let data = {
      coach: this.coach,
      formation: formation,
    };
    this.route.navigateByUrl('/pages/client/rdv/detail-formation', {
      state: { id: data },
    });
  }
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
