import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TabItem } from 'src/app/types/tab-item.type';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
 
  @Input() tabs: TabItem[] 

  @Output() onChange: EventEmitter<number> = new EventEmitter<number>();

  selectedTab: number = 0

  ngOnInit(): void {
    
  }

  handleClick(event, index: number) {
    this.selectedTab = index
    this.onChange.emit(index);
  }
}
