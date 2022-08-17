import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  CalendarOptions,
  EventInput,
  FullCalendarComponent,
} from '@fullcalendar/angular';
import { RdvService } from '../../../services/rdv.service';
import { NgxSmartModalComponent, NgxSmartModalService } from 'ngx-smart-modal';
import {
  BsModalRef,
  BsModalService,
  ModalDirective,
} from 'ngx-bootstrap/modal';
import * as moment from 'moment';
import { GoogleApiWrapperService } from '../../../services/google-api-wrapper.service';
import { Router } from '@angular/router';
import { CoachService } from 'src/app/services/coach.service';
import { UserService } from 'src/app/services/user-service/user-service.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-my-appointments',
  templateUrl: './my-appointments.component.html',
  styleUrls: ['./my-appointments.component.scss'],
})
export class MyAppointmentsComponent implements OnInit {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  @ViewChild('confirmModal') elementView: TemplateRef<any>;
  @ViewChild('statusModal') statusModal: TemplateRef<any>;
  @ViewChild('refusSession') refusSession: TemplateRef<any>;
  @ViewChild('annulationSession') annulationSession: TemplateRef<any>;
  calendarOptions: CalendarOptions;
  sessionList: any = [];
  coachUser: any = {};
  coachTeams: any = {};
  modalRef: BsModalRef;
  clickedEvent: any = {};
  motif = '';

  constructor(
    private coachService: CoachService,
    private rdvService: RdvService,
    private userService: UserService,
    private tokenStorageService: TokenStorageService,
    public modal: NgxSmartModalService,
    public router: Router,
    private modalService: BsModalService,
    public googleService: GoogleApiWrapperService
  ) {
    moment.locale('fr');
  }

  ngOnInit(): void {
    const user = this.tokenStorageService.getUser();
    this.getUserFromDb(user._id);
    this.getTeams();
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      locale: 'fr',
      height: '75%',
      headerToolbar: {
        start: 'prev,title,next',
        center: '',
        end: '',
      },
      titleFormat: { year: 'numeric', month: 'long' },
      eventClick: this.handleDateClick.bind(this),
      events: [...this.sessionList],
      eventContent: function (arg, createElement) {
        if (!arg.event.extendedProps.isGoogleEvent) {
          const sessionStatus = arg.event.extendedProps.session.status;
          if (sessionStatus != 'declined' && sessionStatus != 'cancelled') {
            const parentDiv = document.createElement('div');
            let backgroundColor = 'rgba(220, 53, 69, 0.08)';
            if (sessionStatus == 'pending')
              backgroundColor = 'rgba(255, 193, 7, 0.2)'; //yellow
            else if (sessionStatus == 'paid')
              backgroundColor = 'rgba(19, 118, 163, 0.2)';
            else if (sessionStatus == 'accepted')
              backgroundColor = 'rgba(220, 53, 69, 0.2)'; //red
            else if (sessionStatus == 'declined')
              backgroundColor = 'rgba(220, 53, 69, 0.2)'; //red
            else if (sessionStatus == 'done')
              backgroundColor = 'rgba(33, 37, 41, 0.2)'; //dark-gray //'rgba(25, 135, 84, 0.2)';//green
            if (moment().isAfter(moment(arg.event.startStr)))
              backgroundColor = 'rgba(33, 37, 41, 0.2)'; //dark-gray
            parentDiv.setAttribute(
              'style',
              'border-left: 3px solid #1376A3;padding: 10px;width: 90%; background: ' +
                backgroundColor +
                ' 0% 0% no-repeat padding-box;border-radius: 0px 6px 6px 0px;'
            );
            parentDiv.setAttribute('class', 'd-flex flex-column');
            if (arg.event.extendedProps.session.in_team) {
              const avatarsDiv = document.createElement('div');
              avatarsDiv.setAttribute('class', 'avatars');
              arg.event.extendedProps.session.users.forEach((userElement) => {
                const avatarSpan = document.createElement('span');
                avatarSpan.setAttribute('class', 'avatar');

                const userImage = document.createElement('img');
                userImage.src = userElement.photo
                  ? userElement.photo
                  : '/assets/img/common/utilisateur.png';
                avatarSpan.appendChild(userImage);
                avatarsDiv.appendChild(avatarSpan);
              });

              parentDiv.appendChild(avatarsDiv);
            } else {
              const img = document.createElement('img');
              img.src = arg.event.extendedProps.userPhoto;
              img.width = 50;
              img.height = 50;
              img.setAttribute('style', 'margin-bottom: 10px');
              parentDiv.appendChild(img);
            }

            const userNameSpan = document.createElement('span');
            userNameSpan.innerText = arg.event.title;
            userNameSpan.setAttribute(
              'style',
              'white-space: pre-wrap; word-break: break-word;font: normal normal normal 12px/15px Fredoka;font-weight: 600;letter-spacing: 0.09px;color: #1376A3;'
            );

            const span = document.createElement('span');
            span.innerText = 'Formation';
            span.setAttribute(
              'style',
              'white-space: pre-wrap; word-break: break-word;font: normal normal normal 10px/15px Fredoka;font-weight: 500;letter-spacing: 0.09px;color: #1376A3;'
            );

            parentDiv.appendChild(userNameSpan);
            parentDiv.appendChild(span);

            let arrayOfDomNodes = [parentDiv];
            return { domNodes: arrayOfDomNodes };
          } else return null;
        } else {
          const parentDiv = document.createElement('div');
          const sessionStatus = arg.event.extendedProps.status;
          let backgroundColor = 'rgba(220, 53, 69, 0.08)';
          if (sessionStatus == 'pending')
            backgroundColor = 'rgba(255, 193, 7, 0.2)'; //yellow
          else if (sessionStatus == 'accepted')
            backgroundColor = 'rgba(19, 118, 163, 0.2)';
          else if (sessionStatus == 'declined')
            backgroundColor = 'rgba(220, 53, 69, 0.2)'; //red
          else if (sessionStatus == 'confirmed')
            backgroundColor = 'rgba(25, 135, 84, 0.2)'; //green
          else backgroundColor = 'rgba(19, 118, 163, 0.2)';
          if (moment().isAfter(moment(arg.event.startStr)))
            backgroundColor = 'rgba(33, 37, 41, 0.2)'; //dark-gray
          parentDiv.setAttribute(
            'style',
            'border-left: 3px solid #1376A3;padding: 10px;width: 90%; background: ' +
              backgroundColor +
              ' 0% 0% no-repeat padding-box;border-radius: 0px 6px 6px 0px;'
          );
          parentDiv.setAttribute('class', 'd-flex flex-column');
          const img = document.createElement('img');
          img.src = '/assets/img/common/icons8-logo-google-48.png';
          img.width = 40;
          img.height = 40;
          img.setAttribute('style', 'margin-bottom: 10px');

          const userNameSpan = document.createElement('span');
          userNameSpan.innerText = arg.event.title;
          userNameSpan.setAttribute(
            'style',
            'white-space: pre-wrap; word-break: break-word;font: normal normal normal 12px/15px Fredoka;font-weight: 600;letter-spacing: 0.09px;color: #1376A3;'
          );

          const span = document.createElement('span');
          span.innerText = arg.event.extendedProps.description;
          span.setAttribute(
            'style',
            'white-space: pre-wrap; word-break: break-word;font: normal normal normal 10px/15px Fredoka;font-weight: 500;letter-spacing: 0.09px;color: #1376A3;'
          );
          const span2 = document.createElement('span');
          span2.innerText = arg.event.extendedProps.attendieslist;
          span2.setAttribute(
            'style',
            'white-space: nowrap; overflow:hidden !important; text-overflow: ellipsis;font: normal normal normal 10px/15px Fredoka;font-weight: 500;letter-spacing: 0.09px;color: #1376A3;'
          );

          parentDiv.appendChild(img);
          parentDiv.appendChild(userNameSpan);
          parentDiv.appendChild(span);
          parentDiv.appendChild(span2);

          let arrayOfDomNodes = [parentDiv];
          return { domNodes: arrayOfDomNodes };
        }
      },
    };
  }

  openModal(modal) {
    let data = {
      coach: this.coachUser,
      teams: this.coachTeams,
    };
    if (modal == 'modalajoutsession')
      this.modal.setModalData(data, 'modalajoutsession');
    else if (modal == 'modalworkinghours')
      this.modal.setModalData(data, 'modalworkinghours');
    this.modal.getModal(modal).open();
  }

  getSessionList() {
    let calendarApi = this.calendarComponent.getApi();
    calendarApi.removeAllEvents();
    this.rdvService
      .getSessions(this.tokenStorageService.getUser()._id)
      .subscribe((data) => {
        console.log(data);
        this.sessionList = data.sessions;
        this.sessionList.forEach((elem) => {
          elem.coachName = elem.coach.prenom + ' ' + elem.coach.nom;

          elem.title = elem.users[0].prenom + ' ' + elem.users[0].nom;
          elem.start = elem.date.replace('00:00:00', elem.time);
          elem.end = elem.date.replace('00:00:00', elem.endTime);
          elem.fullStartDateString = moment(
            elem.date.replace('00:00:00', elem.time)
          ).format('dddd, DD/MM/YYYY');
          elem.fullDateString = moment(
            elem.date.replace('00:00:00', elem.endTime)
          ).format('dddd, DD/MM/YYYY HH:mm:ss');
          elem.endTimeString = moment(
            elem.date.replace('00:00:00', elem.endTime)
          ).format('HH');
          elem.startTimeString = moment(
            elem.date.replace('00:00:00', elem.time)
          ).format('HH');
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
          let event: EventInput = {
            title: elem.title,
            date: elem.date,
            startStr: elem.start,
            endStr: elem.end,
            extendedProps: {
              userPhoto: elem.users[0].photo,
              isGoogleEvent: false,
              session: elem,
            },
          };
          calendarApi.addEvent(event);
        });
      });
  }

  private getUserFromDb(id: any) {
    this.userService.getSingleUser(id).subscribe(
      (user) => {
        this.coachUser = user;
      },
      (error) => {
        return {};
      }
    );
  }

  getTeams() {
    this.coachService
      .GetTeams(this.tokenStorageService.getUser()._id)
      .subscribe(
        (data) => {
          this.coachTeams = data.teams;
        },
        (error) => {}
      );
  }

  ngAfterViewInit() {
    this.modal
      .getModal('modalajoutsession')
      .onClose.subscribe((modal: NgxSmartModalComponent) => {
        // modal is the dismissed modal, so do what you want with it
        this.getSessionList();
        modal.removeData();
      });
    this.modal
      .getModal('modalworkinghours')
      .onClose.subscribe((modal: NgxSmartModalComponent) => {
        // modal is the dismissed modal, so do what you want with it
        this.getUserFromDb(this.tokenStorageService.getUser()._id);
        modal.removeData();
      });
    this.modal
      .getModal('modalgoogleagenda')
      .onClose.subscribe((modal: NgxSmartModalComponent) => {
        // modal is the dismissed modal, so do what you want with it
        let googleCalendarEvents = modal.getData()?.googleCalendarEvents;
        if (googleCalendarEvents) {
          this.addGoogleCalendarEvents(googleCalendarEvents);
        }
        if (this.googleService.isConnected) {
          this.addEventsToGoogleCalendar();
        }
        modal.removeData();
      });
    this.modal
      .getModal('modalgoogleagenda')
      .onDismiss.subscribe((modal: NgxSmartModalComponent) => {
        // modal is the dismissed modal, so do what you want with it
        let googleCalendarEvents = modal.getData()?.googleCalendarEvents;
        if (googleCalendarEvents) {
          this.addGoogleCalendarEvents(googleCalendarEvents);
        }
        if (this.googleService.isConnected) {
          this.addEventsToGoogleCalendar();
        }
        modal.removeData();
      });
    this.getSessionList();
    this.googleService.initClient();
    this.googleService.googleCalendarEvents.subscribe((res: any) => {
      this.addGoogleCalendarEvents(res);
    });
  }

  public handleDateClick(arg) {
    this.clickedEvent = arg.event;
    if (arg.event._def.extendedProps.session.status == 'pending')
      this.modalRef = this.modalService.show(this.elementView, { id: 1 });
    else this.modalRef = this.modalService.show(this.statusModal, { id: 1 });
  }

  confirmRdv(status) {
    let session = this.clickedEvent._def.extendedProps.session;
    session.status = status;
    if (status == 'cancelled' || status == 'declined') {
      session.motif = this.motif;
    }
    this.rdvService.updateSession(session).subscribe(
      (data) => {
        this.modalService.hide(2);
        this.modalService.hide(1);
        this.getSessionList();
      },
      (error) => {
        console.log(error);
        this.modalRef.hide();
      }
    );
  }

  addGoogleCalendarEvents(googleCalendarEvents) {
    let calendarApi = this.calendarComponent.getApi();
    let gcEvents = calendarApi.getEvents();
    console.log(gcEvents);
    gcEvents.forEach((eventElem) => {
      if (eventElem._def.extendedProps.isGoogleEvent) {
        eventElem.remove();
      }
    });
    googleCalendarEvents?.forEach((elem) => {
      let attendiesList = '';
      attendiesList = elem.attendees
        ?.map((attendant) => attendant.displayName)
        .join(', ');
      let event: EventInput = {
        title: elem.summary,
        date: elem.start.dateTime,
        startStr: elem.start.dateTime,
        endStr: elem.end.dateTime,
        description: elem.description,
        extendedProps: {
          isGoogleEvent: true,
          description: elem.description,
          status: elem.status,
          attendieslist: attendiesList,
          event: elem,
        },
      };
      calendarApi.addEvent(event);
    });
  }

  addEventsToGoogleCalendar() {
    if (this.googleService.isConnected) {
      this.sessionList.forEach((session) => {
        if (!session.isAddedToGC) {
          let typeSession = session.in_video
            ? 'via visio-conférence'
            : 'individuelle';
          let newGoogleEvent = {
            calendarId: 'primary',
            start: {
              dateTime: session.start,
              timeZone: 'Europe/Paris',
            },
            end: {
              dateTime: session.end,
              timeZone: 'Europe/Paris',
            },
            summary: session.title,
            description: 'Session ' + typeSession,
          };

          this.googleService.addEventToPrimaryCalendar(newGoogleEvent);
          this.updateSyncStatus(session);
          session.isAddedToGC = true;
        }
      });
    }
  }

  updateSyncStatus(session) {
    session.isAddedToGC = true;
    this.rdvService.updateSession(session).subscribe(
      (data) => {},
      (error) => {
        console.log(error);
      }
    );
  }

  isTimeAndDay(session) {
    let moment1 = moment(session.date.replace('00:00:00', session.time)).tz(
      session.timeZone
    );
    let moment2 = moment(new Date()).tz(session.timeZone);
    return Math.abs(moment1.diff(moment2, 'minutes')) < 60;
  }

  joinVideo(session) {
    this.modalRef.hide();
    this.router.navigate(['/pages/video'], {
      queryParams: { rdv: session._id },
    });
  }

  deleteSession(session) {
    this.rdvService.deleteSession(session._id).subscribe(
      (data) => {
        this.getSessionList();
        console.log(this.modalService.getModalsCount());
        this.modalService.hide(2);
        this.modalService.hide(1);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openNGBModal(template: TemplateRef<any>, id: number) {
    this.modalRef = this.modalService.show(template, { id: id });
  }

  closeModal(modalId?: number) {
    this.modalService.hide(modalId);
  }
}
