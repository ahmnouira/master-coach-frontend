import { TemplateRef } from '@angular/core';

export class DatableDisplayedColumn {
  data: string;
  template?: TemplateRef<any>;
  value: string;
  type: 'text' | 'badge' | 'checkbox' | 'date' | 'icon' | 'customTemplate' =
    'text';
  search: boolean = false;
  sort: boolean = false;
  sorted?: boolean;
  extraData?: any;
  hoverIconData?: string;
  dateFormat?: string;
}

export type Tag = {
  value: number;
  display: string;
};
