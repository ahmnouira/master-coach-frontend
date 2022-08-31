import { DocumentType } from '../models/document/document-type.enum';

export interface IDocument {
  title: string;
  description: string;
  duration: string;
  type: DocumentType;
  category: string[];
  image: any;
  files: any;
}
