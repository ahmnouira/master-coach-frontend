import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TwilioService } from '../../../services/twilio-service/twilio.service';

@Component({
  selector: 'app-detail-coach',
  templateUrl: './detail-coach.component.html',
  styleUrls: ['./detail-coach.component.scss'],
})
export class DetailCoachComponent implements OnInit {
  coach: any = {};
  mouseDown = false;

  startX: any;

  scrollLeft: any;

  slider = document.querySelector<HTMLElement>('.wrapper');
  constructor(private twilioService: TwilioService, private router: Router) {}

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
    this.router.navigateByUrl('/pages/client/rdv/detail-formation', {
      state: { id: data },
    });
  }
  startDragging(e, flag, el) {
    this.mouseDown = true;
    this.startX = e.pageX - el.offsetLeft;
    this.scrollLeft = el.scrollLeft;
  }
  stopDragging(e, flag) {
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

  createNewConversation(user) {
    this.twilioService.createNewConversation(user._id).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(['/pages/conversations']);
      },
      (error) => {}
    );
    console.log(user._id);
  }
}
