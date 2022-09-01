import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base-service/base.service';

type GetDocumentsOptions = {
  all: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class DocumentsService extends BaseService {
  addDocument(data: any): Observable<any> {
    return this.post('/documents', data);
  }
  getDocuments(options: GetDocumentsOptions): Observable<any> {
    return this.get(options.all ? '/documents' : '/documents/mine');
  }
  getDocument(id: string): Observable<any> {
    return this.get(`/documents/${id}`);
  }
}
