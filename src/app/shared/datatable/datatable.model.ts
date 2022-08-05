import { TemplateRef } from "@angular/core";

export class datatable_displayedColomn {
  data: string ;
  template?: TemplateRef<any>;
  value: string;
  type: "text" | "badge" | "checkbox" | "date" | "icon" | "customTemplate" =
    "text";
  search: boolean = false;
  sort: boolean = false;
  sorted?: boolean;
  extraData?: any;
  hovericondata?: string;
  dateFormat?: string;
}

export class action {
  type: string;
  iconClass: string;
  disabledAttribut?: string;
  tooltipAttribut?: string;
  constructor(
    type: string,
    iconClass: string,
    disabledAttribut?: string,
    tooltipAttribut?: string
  ) {
    this.type = type;
    this.iconClass = iconClass;
    if (disabledAttribut) this.disabledAttribut = disabledAttribut;
    if (tooltipAttribut) this.tooltipAttribut = tooltipAttribut;
  }
}
export class datatable_action {
  value: any;
  childrens: action[];
}

export class tag {
  value: number;
  display: string;
}
