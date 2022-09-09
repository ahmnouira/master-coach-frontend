import { Component, OnInit } from '@angular/core';
import { CLIENT_DOCS_FILTER_STATUS, CLIENT_DOCS_FILTER_THEMATIC } from 'src/app/constants/client/documents';
import { PageHelper } from 'src/app/helpers/PageHelper';
import { ServicesService } from 'src/app/services/services-service/services.service';

@Component({
  selector: 'app-coach-list',
  templateUrl: './coach-list.component.html',
  styleUrls: ['./coach-list.component.scss']
})
export class CoachListComponent extends PageHelper implements OnInit {


  filters :any  = {

  }

  search = '';
  filteredData: any;
  filterString: string;


  selectedCoachType: string[] = [];
  selectedContent: string[] = []
  selectedCompetence: string[]  = []
  selectedAccreditation: string[] = []


  FILTER_TYPES = CLIENT_DOCS_FILTER_STATUS
  FILTER_WITH = CLIENT_DOCS_FILTER_THEMATIC

  constructor(private servicesService: ServicesService) {
    super();
  }

  ngOnInit(): void {
    this.getServices();
  }

  getServices() {
    this.getData(this.servicesService.getServices({ all: false }), {
      debug: true,
    });
  }

  filterInputChanged(event: any) {}



  resetFilters(event) {

  console.log('reset', event)
    this.filteredData = this.data;
    this.selectedCompetence = []
    this.selectedAccreditation = []
    this.selectedCoachType = [];
    this.selectedContent = []
    this.filterString = '';
    this.filters = {}
  }

}
