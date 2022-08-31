import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DatableTableAction } from '../../../../shared/datatable/action.model';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user-service/user-service.service';
import { CoachService } from 'src/app/services/coach-service/coach.service';

@Component({
  selector: 'app-mes-doc-quiz',
  templateUrl: './mes-doc-quiz.component.html',
  styleUrls: ['./mes-doc-quiz.component.scss'],
})
export class MesDocQuizComponent implements OnInit {
  filterString = '';
  filter = new FormControl('');

  ACTION_COLUMNS: DatableTableAction[] = [];

  DISPLAYED_COLUMNS: any[] = [];
  coachList: any = [];
  quizList: any = [];
  data: any = [];
  filteredData: any = [];
  selectedProfiles: any = [];
  loadingAnimation: boolean = false;
  selectedStatus = 'status';
  selectedType = 'type';
  constructor(
    private tokenStorageService: TokenStorageService,
    private userService: UserService,
    private coachService: CoachService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ACTION_COLUMNS.push({
      value: '',
      children: [
        {
          type: 'view',
          iconClass: 'view',
        },
      ],
    });

    this.DISPLAYED_COLUMNS = [
      {
        data: 'quizName',
        value: 'Titre',
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
        data: 'datelimite',
        value: 'Date limite',
        type: 'date',
        search: true,
        sort: true,
      },
      {
        data: 'type',
        value: 'Type',
        type: 'text',
        search: false,
        sort: true,
      },
      {
        data: 'status',
        value: 'Status',
        type: 'badge',
        search: true,
        sort: true,
      },
    ];
    this.getUserProfileList();
  }

  onActionClicked(element: any) {
    console.log(element);
    let coachObject = this.coachList.filter(
      (obj) => obj._id == element.item.coach_id
    );
    let quizObject = {
      coachData: coachObject,
      quizData: element.item,
    };
    if (element.action == 'view') {
      this.router.navigateByUrl('/pages/client/docs/quiz/play', {
        state: { id: quizObject },
      });
    }
  }

  datatableChange(ev: any) {
    this.selectedProfiles = ev.filter((el: any) => el.selected);
    console.log(ev);
  }

  getUserProfileList() {
    this.userService.getAllUser().subscribe((response) => {
      this.coachList = (response as any).filter((elem) => elem.role == 'Coach');
      this.coachList.forEach((elem) => {
        let a = [];
        elem.competance?.forEach((el) => {
          if (typeof el === 'object') {
            a.push(el.name);
          } else if (typeof el === 'string') {
            a.push(el);
          }
        });
        elem.competances = a.join(', ');
        a = [];
        elem.accreditation?.forEach((el) => {
          if (typeof el === 'object') {
            a.push(el.name);
          } else if (typeof el === 'string') {
            a.push(el);
          }
        });
        elem.accreditations = a.join(', ');
        a = [];
        elem.category?.forEach((el) => {
          if (typeof el === 'object') {
            a.push(el.name);
          } else if (typeof el === 'string') {
            a.push(el);
          }
        });
        elem.categories = a.join(', ');
        elem.status_class =
          elem.status == 'Actif'
            ? 'badge bg-success badge-width'
            : elem.status == 'Inactif'
            ? 'badge bg-danger badge-width'
            : 'badge bg-warning badge-width';
      });
      this.getQuizList();
    });
  }

  getQuizList() {
    let clientId = this.tokenStorageService.getUser()._id;
    this.coachService.GetAllQuizList().subscribe(
      (data) => {
        console.log(data);
        this.quizList = data;
        this.quizList.forEach((elem) => {
          elem.coachName = this.getCoachname(elem.coach_id);
          let userDidQuiz = elem.client_answers?.filter(
            (cian) => cian.client_id == clientId
          );
          elem.type = 'Quiz';
          let date = new Date();
          elem.datelimite = new Date().setDate(date.getDate() + 3);
          elem.status = userDidQuiz[0] ? 'Clos' : 'En attente';
          elem.status_class =
            elem.status == 'Clos'
              ? 'badge bg-success badge-width'
              : elem.status == 'En attente'
              ? 'badge bg-danger badge-width'
              : 'badge bg-warning badge-width';
        });
        this.data = [...this.quizList];
      },
      (error) => {}
    );
  }

  getCoachname(coachId) {
    let result = this.coachList.filter((obj) => obj._id == coachId);
    console.log(result);
    return result[0].prenom + ' ' + result[0].nom;
  }

  public onOptionsSelected(event, selectname: string) {
    const value = event.target.value;
    console.log(value);
    if (this.quizList.length == 0) this.quizList = this.data;
    if (selectname == 'type') {
      this.quizList = this.data.filter((elem) =>
        elem?.type.toLowerCase().includes(value.toLowerCase())
      );
    }
    if (selectname == 'status') {
      this.quizList = this.data.filter((elem) =>
        elem?.status.toLowerCase().includes(value.toLowerCase())
      );
    }
  }
}
