import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
 
  @Input() tabs: any 

  @Output() onClick: EventEmitter<number> = new EventEmitter<number>();



  ngOnInit(): void {
    
  }

  handleClick(event) {
   
    this.onClick.emit();
  }


}
