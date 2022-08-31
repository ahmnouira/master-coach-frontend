import { Component, Input, OnInit } from '@angular/core';
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

  form: IDocument = {
    description: '',
    title: '',
    type: DocumentType.DOCUMENT,
    category: '',
    image: '',
    files: '',
    duration: '',
  };

  typeImportFiles = {
    type: 'pdf',
    title: 'Ajouter des documents',
  };

  selectedCategories: any = [];

  categories: any[] = [];

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
      this.documentService.getDocument(this.id).subscribe((res) => {
        if (!res.success) {
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
          files: this.getFileUrl(document.files),
        };
        const category = this.categories?.find(
          (el) => el.name === this.form.category
        );
        if (category) {
          this.selectedCategories = [category];
        }
        this.isLoading = false;
      });
    } else {
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

  importImage(data: any) {
    this.form.image = data;
  }

  addFiles(data: any) {
    this.form.files = data;
  }

  async submit() {
    this.isSubmitting = true;

    const { description, title, duration } = this.form;

    if (!title || !description || !duration) {
      this.onError('');
      return;
    }

    // console.log('Form', this.form);

    const formData = this.getFormData(this.form);

    // transform fields to array

    this.documentService.addDocument(formData).subscribe(
      (res) => {
        console.log('res:', res);
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
