import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { FormHelper } from 'src/app/helpers/FormHelper';
import { IDocument } from 'src/app/interfaces/document.interface';
import { DocumentsService } from 'src/app/services/document-service/documents.service';
import { RouteService } from 'src/app/services/route-service/route.service';
import { Animations } from 'src/app/shared/animations';

@Component({
  selector: 'app-documents-form',
  templateUrl: './documents-form.component.html',
  styleUrls: ['./documents-form.component.scss'], 
  animations: Animations
})
export class DocumentsFormComponent extends FormHelper implements OnInit {

  @Input() id: string = ''; 

  form: IDocument = {
    ref: '', 
    title: '', 
  };

  typeImportFiles = {
    type: 'pdf',
    title: 'Ajouter des documents',
  };

  categories: string[] = [];

  constructor(
    private documentService: DocumentsService,
    private authService: AuthService,
    private routeService: RouteService
  ) {
    super();
  }

  ngOnInit(): void {
    if (this.id) {
      this.isLoading = true;
      // means edit
      this.documentService.getDocument(this.id).subscribe((res) => {
        if (!res.success) {
          this.onError(res.error);
          return;
        }
        const document = res.data as IDocument;

        this.form = {
          ref: '', 
          title: ''
        };
        this.isLoading = false;
      });
    } else {
      this.authService.currentUser$.subscribe((user) => {
        this.categories = this.getArray(user.category);
        this.isLoading = false;
      });
    }
  }



  async submit() {
    this.isSubmitting = true;
    const { ref  } =
      this.form;

    if (!ref) {
      this.onError('');
      return;
    }

    // check if not a free
    if (!ref) {
      this.onError('');
      return;
    }

    const formData = this.getFormData(this.form);

    // formData.set('price', parseInt(price).toString());

    this.documentService.addDocument(formData).subscribe(
      (res) => {
        console.log('res:', res);
        if (!res.success) {
          this.onError(res.error);
          return;
        }
        this.onSuccess(() => {
          this.routeService.navigate(['/pages/coach/boutique']);
        });
      },
      (err) => this.onError(err)
    );
  }

}
