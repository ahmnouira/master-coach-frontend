import { IDocument } from "src/app/interfaces/document.interface";
import { Entity } from "../entity/entity.model";

export class Document extends Entity implements IDocument {
  ref: string;
  title: string;
  type?: string;

}
