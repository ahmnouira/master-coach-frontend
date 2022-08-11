import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formation-detail',
  templateUrl: './formation-detail.component.html',
  styleUrls: ['./formation-detail.component.scss'],
})
export class FormationDetailComponent implements OnInit {
  coach: any = {};
  formation: any = {};
  isIndiv = true;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.coach = history.state?.id.coach;
    this.formation = history.state?.id.formation;
  }

  reserver() {
    let data = {
      coach: this.coach,
      formation: this.formation,
      isVideoSession: !this.isIndiv,
    };
    this.router.navigateByUrl('/pages/client/rdv/reserver', {
      state: { id: data },
    });
  }
}
