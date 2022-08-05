import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfilAdminComponent} from "./profil-admin/profil-admin.component";
import {ParametresComponent} from "./parametres/parametres.component";
import {UsersListComponent} from "./user-management/users-list/users-list.component";
import {UsersAddComponent} from "./user-management/users-add/users-add.component";
import {UsersEditComponent} from "./user-management/users-edit/users-edit.component";
import {AccreditationListComponent} from "./accreditation-management/accreditation-list/accreditation-list.component";
import {AccreditationAddComponent} from "./accreditation-management/accreditation-add/accreditation-add.component";
import {AccreditationEditComponent} from "./accreditation-management/accreditation-edit/accreditation-edit.component";
import {CompetenceListComponent} from "./competence-management/competence-list/competence-list.component";
import {CompetenceAddComponent} from "./competence-management/competence-add/competence-add.component";
import {CompetenceEditComponent} from "./competence-management/competence-edit/competence-edit.component";
import {CategoryListComponent} from "./category-management/category-list/category-list.component";
import {CategoryAddComponent} from "./category-management/category-add/category-add.component";
import {CategoryEditComponent} from "./category-management/category-edit/category-edit.component";


const routes: Routes = [
  {path : "", component : ProfilAdminComponent},
  {path : "profil", component : ProfilAdminComponent},
  {path : "parametre", component : ParametresComponent},
  {path : "users/list", component : UsersListComponent},
  {path : "users/add", component : UsersAddComponent},
  {path : "users/edit", component : UsersEditComponent},
  {path : "competences/list", component : CompetenceListComponent},
  {path : "competences/add", component : CompetenceAddComponent},
  {path : "competences/edit", component : CompetenceEditComponent},
  {path : "categories/list", component : CategoryListComponent},
  {path : "categories/add", component : CategoryAddComponent},
  {path : "categories/edit", component : CategoryEditComponent},
  {path : "accreditations/list", component : AccreditationListComponent},
  {path : "accreditations/add", component : AccreditationAddComponent},
  {path : "accreditations/edit", component : AccreditationEditComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
