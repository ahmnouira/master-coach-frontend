import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';
import { FormHelper } from 'src/app/helpers/FormHelper';
import { IDocument } from 'src/app/interfaces/document.interface';
import { DocumentType } from 'src/app/models/document/document-type.enum';
import { DocumentsService } from 'src/app/services/document-service/documents.service';
import { RouteService } from 'src/app/services/route-service/route.service';
import { Animations } from 'src/app/shared/animations';
@Component({
  selector: 'app-documents-form',
  templateUrl: './documents-form.component.html',
  styleUrls: ['./documents-form.component.scss'],
  animations: Animations,
})
export class DocumentsFormComponent extends FormHelper implements OnInit {
  @Input() id: string = ''; // if id means edit

  form: Partial<IDocument> = {
    description: '',
    title: '',
    category: '',
    image: '',
    file: '',
    duration: '',
  };

  typeImportFiles = {
    type: 'pdf',
    title: 'Ajouter des documents',
  };

  selectedCategories: any = [];
  categories: any[] = [];

  found: boolean;

  constructor(
    private documentService: DocumentsService,
    private authService: AuthService,
    private routeService: RouteService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getCategories();
    if (this.id) {
      // means edit
      this.documentService.getDocument(this.id).subscribe(
        (res) => {
          if (!res.success && res.error) {
            this.found = false;
            this.onError(res.error);
            return;
          }
          const document = res.data as IDocument;

          this.form = {
            description: this.getString(document.description),
            title: this.getString(document.title),
            type: document.type,
            category: this.getString(document.category),
            duration: this.getString(document.duration),
            image: this.getFileUrl(document.image),
            file: this.getFileUrl(document.file),
          };

          const category = this.categories?.find(
            (el) => el.name === this.form.category
          );
          if (category) {
            this.selectedCategories = [category];
          }
          this.found = true;
          this.isLoading = false;
        },
        (error) => {
          this.found = false;
          this.onError(error);
        }
      );
    } else {
      this.found = true;
      this.isLoading = false;
    }
  }

  getCategories() {
    this.authService.currentUser$.subscribe((user) => {
      this.categories = this.getArray(user.category);
    });
  }

  getMultiFileFieldData() {
    switch (this.form.type) {
      case DocumentType.DOCUMENT:
        return {
          title: 'Ajouter un document',
          type: 'pdf',
        };
      case DocumentType.VIDEO: {
        return {
          title: 'Ajouter une vidéo',
          type: 'video',
        };
      }

      case DocumentType.PODCAST: {
        return {
          title: 'Ajouter un podcast',
          type: 'audio',
        };
      }
      // by default is document
      default:
        return {
          title: 'Ajouter un document',
          type: 'pdf',
        };
    }
  }

  importFile(data: any, key: string) {
    this.form[key] = data;
  }

  submit() {
    this.isSubmitting = true;
    this.error = ''; // remove the error when re-submitting

    const { description, title, duration } = this.form;

    if (!title || !description || !duration) {
      this.onError('');
      return;
    }
    const formData = this.getFormData(this.form);
    let method: Observable<any>;

    if (this.id) {
      method = this.documentService.editDocument(this.id, formData);
    } else {
      method = this.documentService.addDocument(formData);
    }

    method.subscribe(
      (res) => {
        if (!res.success) {
          this.onError(res.error);
          return;
        }
        this.onSuccess(() => {
          this.routeService.navigate(['/pages/coach/documents']);
        });
      },
      (err) => this.onError(err)
    );
  }
}
