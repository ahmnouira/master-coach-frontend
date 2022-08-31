import { IDocument } from 'src/app/interfaces/document.interface';
import { Entity } from '../entity/entity.model';
import { DocumentType } from './document-type.enum';

export class Document extends Entity implements IDocument {
  title: string;
  description: string;
  duration: string;
  type: DocumentType;
  category: any;
  image: any;
  files: any;
}
