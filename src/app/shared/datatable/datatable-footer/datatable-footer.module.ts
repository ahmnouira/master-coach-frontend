import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DatatableFooterComponent } from "./datatable-footer.component";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [DatatableFooterComponent],
  imports: [CommonModule, FormsModule, PaginationModule.forRoot()],
  exports: [DatatableFooterComponent]
})
export class DatatableFooterModule {}
