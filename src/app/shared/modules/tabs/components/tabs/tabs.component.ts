import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ITab } from '../../tabs.model';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent<T> {

  @Input() tabs: ITab<T>[];
  @Input() activeId: T;
  @Output() select = new EventEmitter<ITab<T>>();

  onSelect(tab: ITab<T>) {
    this.activeId = tab.id;
    this.select.emit(tab);
  }

}
