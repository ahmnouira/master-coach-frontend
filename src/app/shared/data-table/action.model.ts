export class Action {
  type: string;
  iconClass: string;
  disabledAttr?: string;
  tooltipAttr?: string;

  constructor(
    type: string,
    iconClass: string,
    disabledAttr?: string,
    tooltipAttr?: string
  ) {
    this.type = type;
    this.iconClass = iconClass;
    if (disabledAttr) this.disabledAttr = disabledAttr;
    if (tooltipAttr) this.tooltipAttr = tooltipAttr;
  }
}

export type DatableTableAction = {
  value: any;
  children: Action[];
};
