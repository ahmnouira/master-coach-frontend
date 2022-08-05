import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilAdminComponent } from './profil-admin/profil-admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ComponentsModule } from '../components/components.module';
import { ParametresComponent } from './parametres/parametres.component';
import { UsersListComponent } from './user-management/users-list/users-list.component';
import { UsersAddComponent } from './user-management/users-add/users-add.component';
import { UsersEditComponent } from './user-management/users-edit/users-edit.component';
import { LoadingCardModule } from '../../shared/loading-card/loading-card.module';
import { DatatableModule } from '../../shared/datatable/datatable.module';
import { FormsModule } from '@angular/forms';
import { CompetenceListComponent } from './competence-management/competence-list/competence-list.component';
import { CompetenceAddComponent } from './competence-management/competence-add/competence-add.component';
import { CompetenceEditComponent } from './competence-management/competence-edit/competence-edit.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { AccreditationListComponent } from './accreditation-management/accreditation-list/accreditation-list.component';
import { AccreditationAddComponent } from './accreditation-management/accreditation-add/accreditation-add.component';
import { AccreditationEditComponent } from './accreditation-management/accreditation-edit/accreditation-edit.component';
import { CategoryListComponent } from './category-management/category-list/category-list.component';
import { CategoryAddComponent } from './category-management/category-add/category-add.component';
import { CategoryEditComponent } from './category-management/category-edit/category-edit.component';
import { ListFormCategoryComponent } from './form-category-management/list-form-category/list-form-category.component';
import { AddFormCategoryComponent } from './form-category-management/add-form-category/add-form-category.component';
import { EditFormCategoryComponent } from './form-category-management/edit-form-category/edit-form-category.component';

@NgModule({
  declarations: [
    ProfilAdminComponent,
    ParametresComponent,
    UsersListComponent,
    UsersAddComponent,
    UsersEditComponent,
    CompetenceListComponent,
    CompetenceAddComponent,
    CompetenceEditComponent,
    AccreditationListComponent,
    AccreditationAddComponent,
    AccreditationEditComponent,
    CategoryListComponent,
    CategoryAddComponent,
    CategoryEditComponent,
    ListFormCategoryComponent,
    AddFormCategoryComponent,
    EditFormCategoryComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ComponentsModule,
    LoadingCardModule,
    DatatableModule,
    FormsModule,
    AngularMultiSelectModule,
  ],
})
export class AdminModule {}
