import { Component, OnInit } from '@angular/core';
import * as moment from "moment";
import {NgxSmartModalService} from "ngx-smart-modal";
import {RdvService} from "../../../services/rdv.service";
import {TokenStorageService} from "../../../services/token-storage.service";
import {CoachService} from "../../../services/coach.service";

@Component({
  selector: 'app-modal-working-hours',
  templateUrl: './modal-working-hours.component.html',
  styleUrls: ['./modal-working-hours.component.scss']
})
export class ModalWorkingHoursComponent implements OnInit {
  coach : any = {};
  heureDeb: Date = new Date();
  heureFin: Date = new Date();
  minTime: Date = new Date();
  maxDebutTime: Date = new Date();
  maxTime: Date = new Date();
  locale = 'fr';
  weekDays = [
    {
      number : 0,
      name : 'Lundi',
      isSelected : false
    },
    {
      number : 1,
      name : 'Mardi',
      isSelected : false
    },
    {
      number : 2,
      name : 'Mercredi',
      isSelected : false
    },
    {
      number : 3,
      name : 'Jeudi',
      isSelected : false
    },
    {
      number : 4,
      name : 'Vendredi',
      isSelected : false
    },
    {
      number : 5,
      name : 'Samedi',
      isSelected : false
    },
    {
      number : 6,
      name : 'Dimanche',
      isSelected : false
    },
  ];
  constructor(public ngxSmartModalService: NgxSmartModalService, private coachService : CoachService, private tokenStorageService : TokenStorageService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    moment.locale(this.locale);
    this.minTime.setHours(6,0);
    this.heureDeb.setHours(8,0);
    this.heureFin.setHours(10,0);
    this.maxTime.setHours(20,0);
    this.ngxSmartModalService.getModal('modalworkinghours').onOpen.subscribe((modal) => {
      console.log('opened!', modal.getData());
      this.coach = modal.getData().coach;
      if(this.coach.working_hours) {
        console.log(this.coach.working_hours)
        this.weekDays = this.coach.working_hours.weekdays;
        this.heureDeb = new Date();
        this.heureFin = new Date();
        let coachHeureDeb = new Date(this.coach.working_hours.heureDeb);
        let coachHeureFin = new Date(this.coach.working_hours.heureFin);
        this.heureDeb.setHours(coachHeureDeb.getHours(), coachHeureDeb.getMinutes())
        this.heureFin.setHours(coachHeureFin.getHours(), coachHeureFin.getMinutes())
        console.log(this.weekDays)
        console.log(this.heureDeb)
        console.log(this.heureFin)
      }
    });
  }

  saveData() {
    console.log(this.heureDeb)
    console.log(this.heureFin)
    let param = {
      weekdays: this.weekDays,
      heureDeb: this.heureDeb,
      heureFin: this.heureFin
    }
    this.coachService.addWorkingHours(this.coach._id,param).subscribe(data => {
      console.log(data);
      this.ngxSmartModalService.closeLatestModal();
    });
  }

}
