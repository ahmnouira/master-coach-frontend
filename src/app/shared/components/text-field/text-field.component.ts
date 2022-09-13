import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
})
export class TextFieldComponent implements OnInit {
  /** Two way data binding **/
  @Input() model: any;
  @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();

  @Input() label: string = '';
  @Input() showLabel = true;
  @Input() type = 'text';
  @Input() pattern?: any;
  @Input() name?: string;
  @Input() id?: string;
  @Input() placeholder?: string;
  @Input() patternError?: string;
  @Input() required: boolean = true;
  @Input() form?: any = undefined;
  @Input() disabled?: boolean = false;

  @Input() min?: number = undefined;

  @Input() minLength?: number;

  constructor() {}

  ngOnInit(): void {
    this.name = this.label ? this.label.toLowerCase() : '';
    this.id = this.id ?? this.name ?? '';
    this.placeholder = this.placeholder ?? this.label;
    if (this.type === 'password') this.minLength = this.minLength ?? 5;
    if (this.type === 'email')
      this.pattern = this.pattern ?? '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
    if (this.type === 'tel') {
      this.pattern = this.pattern ?? '^(0|+33)[ ]?[1-9]([-.: ]?[0-9]{2}){4}$';
      this.placeholder = this.placeholder ?? '+33 12 34 56 789';
    }

    this.patternError = this.getPatternMessage();
  }

  getPatternMessage() {
    if (this.patternError) {
      return this.patternError;
    }
    if (this.type !== 'password') {
      return `${this.label} est invalide!`;
    } else {
      return 'Les mots de passe ne correspondent pas!';
    }
  }

  handleChange(event: any) {
    if (this.type.toLowerCase() === 'number') {
      this.modelChange.emit(parseInt(event.target.value));
    }

    this.modelChange.emit(event.target.value);
  }
}
