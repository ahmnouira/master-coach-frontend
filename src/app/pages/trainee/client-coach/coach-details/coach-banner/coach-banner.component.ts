import { Component, Input, OnInit } from '@angular/core';
import { UserHelper } from 'src/app/helpers/UserHelper';
import { User } from 'src/app/models/user-model';
import { RouteService } from 'src/app/services/route-service/route.service';
import { TwilioService } from 'src/app/services/twilio-service/twilio.service';

@Component({
  selector: 'app-coach-banner',
  templateUrl: './coach-banner.component.html',
  styleUrls: ['./coach-banner.component.scss'],
})
export class CoachBannerComponent extends UserHelper implements OnInit {
  @Input()  coach: User;

  constructor(
    private twilioService: TwilioService,
    private route: RouteService
  ) {
    super()
  }

  ngOnInit(): void {
    this.init(this.coach)
  }

  createNewConversation(user: any) {
    this.twilioService.createNewConversation(user._id).subscribe(
      (data) => {
        console.log(data);
        this.route.navigate(['/pages/conversations']);
      },
      (error) => {}
    );
    console.log(user._id);
  }
}
