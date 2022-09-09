import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { FormControl } from '@angular/forms';
import { RdvService } from 'src/app/services/rdv-service/rdv.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { DatableTableAction } from 'src/app/shared/datatable/action.model';
import { DatableDisplayedColumn } from 'src/app/shared/datatable/datatable.model';
import { PageHelper } from 'src/app/helpers/PageHelper';
import { RouteService } from 'src/app/services/route-service/route.service';

@Component({
  selector: 'app-rdv-list',
  templateUrl: './rdv-list.component.html',
  styleUrls: ['./rdv-list.component.scss'],
})
export class RdvListComponent extends PageHelper implements OnInit {
  localeString: string = 'fr';
  viewDate: any;
  weekDays = [];
  selectedTimeZone: any;
  gridArr: any;
  selectedDate: any;
  filterString = '';
  filter = new FormControl('');

  ACTION_COLUMNS: DatableTableAction[] = [];
  DISPLAYED_COLUMNS: DatableDisplayedColumn[] = [];

  filteredData: any = [];
  sessionList: any = [];
  selectedProfiles: any = [];
  loadingAnimation: boolean = false;
  selectedStatus = 'status';
  selectedType = 'type';
  coach: any = {};
  heureDeb: Date = new Date();
  heureFin: Date = new Date();

  constructor(
    private routeService: RouteService,
    private rdvService: RdvService,
    private tokenStorageService: TokenStorageService
  ) {
    super();
    moment.locale(this.localeString);
    //this.viewDate = moment();
    //this.selectedDate = moment();
  }



  ngOnInit(): void {
    moment.locale(this.localeString);
    this.viewDate = moment();
    //this.selectedDate = moment();
    this.ACTION_COLUMNS.push({
      value: '',
      children: [
        {
          type: 'view',
          iconClass: 'view',
        },
      ],
    });
    this.ACTION_COLUMNS.push({
      value: '',
      children: [
        {
          type: 'delete',
          iconClass: 'delete',
        },
      ],
    });
    this.DISPLAYED_COLUMNS = [
      {
        data: 'date',
        value: 'Date',
        type: 'date',
        search: true,
        sort: true,
      },
      {
        data: 'time',
        value: 'Heure',
        type: 'text',
        search: true,
        sort: true,
      },
      {
        data: 'coachName',
        value: 'Coach',
        type: 'text',
        search: true,
        sort: true,
      },
      {
        data: 'type',
        value: 'Catéegorie',
        type: 'text',
        search: false,
        sort: true,
      },
      {
        data: 'statusName',
        value: 'Status',
        type: 'badge',
        search: true,
        sort: true,
      },
    ];
    this.makeGrid();
    this.getSessionList();
  }

  changeViewDate(num, datePart) {
    this.viewDate.add(num, datePart);
    this.makeGrid();
  }
  makeGrid() {
    this.gridArr = [];

    let firstDayDate = moment(this.viewDate).startOf('month');
    const daysInMonth = Array.from(
      { length: this.viewDate.daysInMonth() },
      (x, i) => this.viewDate.startOf('month').add(i, 'days')
    );

    daysInMonth.forEach((day) => {
      let obj: any = {};
      obj.value = firstDayDate.format('DD');
      obj.name = firstDayDate.format('ddd');
      obj.isAvailable = this.isAvailable(firstDayDate.isoWeekday());
      firstDayDate.add(1, 'day');
      this.gridArr.push(obj);
    });
  }
  isAvailable(num: number): boolean {
    return true;
    //return this.weekDays.filter(day => day.number +1 == num)[0]?.isSelected;
  }

  onDateClick(day) {
    console.log(
      moment(
        day.value + '/' + this.viewDate.format('MM/YYYY'),
        'DD/MM/YYYY'
      ).format('DD/MM/YYYY')
    );
    this.selectedDate = moment(
      day.value + '/' + this.viewDate.format('MM/YYYY'),
      'DD/MM/YYYY'
    );
    this.sessionList = this.data.filter((elem) =>
      elem?.date
        ?.toLowerCase()
        .includes(
          moment(
            day.value + '/' + this.viewDate.format('MM/YYYY'),
            'DD/MM/YYYY'
          ).format('YYYY-MM-DD')
        )
    );
  }


  onActionClicked(element: any) {
    const { action, item } = element;
    switch (action) {
      case 'view':
        this.routeService.navigateByUrl(
          `/pages/client/rdv/detail/${item._id}`, { state: { id: item },}
        );
        break;
  }
}


  datatableChange(ev: any) {
    this.selectedProfiles = ev.filter((el: any) => el.selected);
    console.log(ev);
  }

  public onOptionsSelected(event, selectname: string) {
    const value = event.target.value;
    if (this.sessionList.length == 0) this.sessionList = this.data;
    if (selectname == 'type') {
      this.sessionList = this.data.filter((elem) =>
        elem?.type.toLowerCase().includes(value.toLowerCase())
      );
    }
    if (selectname == 'status') {
      if (value == 'all') this.sessionList = [...this.data];
      else {
        this.sessionList = this.data.filter((elem) =>
          elem?.status.toLowerCase().includes(value.toLowerCase())
        );
      }
    }
  }

  getSessionList() {
    this.rdvService
      .getSessions(this.tokenStorageService.getUser()._id)
      .subscribe((data) => {
        console.log(data);
        this.sessionList = data.sessions;
        this.coach = this.sessionList[0]?.coach;
        if (this.coach?.working_hours) {
          console.log(this.coach.working_hours);
          this.weekDays = this.coach?.working_hours?.weekdays;
          this.heureDeb = this.coach?.working_hours?.heureDeb;
          this.heureFin = this.coach?.working_hours?.heureFin;
        }

        this.sessionList.forEach((elem) => {
          elem.coachName = elem.coach.prenom + ' ' + elem.coach.nom;
          if (elem.status == 'pending') {
            elem.statusName = 'En attente';
            elem.statusName_class = 'badge badge-danger badge-width';
          } else if (elem.status == 'declined') {
            elem.statusName = 'Refusé';
            elem.statusName_class = 'badge badge-danger badge-width';
          } else if (elem.status == 'cancelled') {
            elem.statusName = 'Annulé';
            elem.statusName_class = 'badge badge-danger badge-width';
          } else if (elem.status == 'accepted') {
            elem.statusName = 'Accepté, en attente de paiement';
            elem.statusName_class = 'badge badge-dark badge-width';
          } else if (elem.status == 'paid') {
            elem.statusName = 'A venir';
            elem.statusName_class = 'badge badge-dark badge-width';
          } else if (elem.status == 'ongoing') {
            elem.statusName = 'En cours';
            elem.statusName_class = 'badge badge-warning badge-width';
          } else if (elem.status == 'done') {
            elem.statusName = 'Terminé';
            elem.statusName_class = 'badge badge-success badge-width';
          }
        });
        this.sessionList = this.sessionList.sort(
          (objA, objB) =>
            new Date(objA.date).getTime() - new Date(objB.date).getTime()
        );
        this.data = [...this.sessionList];
        this.found = Boolean(this.data.length);
        this.isLoading = false;
      });
  }

  updateStatus(session, status) {
    session.status = status;
    this.rdvService.updateSession(session).subscribe(
      (data) => {
        this.getSessionList();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  deleteSession(session) {
    this.rdvService.deleteSession(session._id).subscribe(
      (data) => {
        this.getSessionList();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
