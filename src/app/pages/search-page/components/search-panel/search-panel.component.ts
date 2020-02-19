import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.scss']
})
export class SearchPanelComponent {

  myForm: FormGroup = new FormGroup({
    "q": new FormControl(),
  });

  @Output() search = new EventEmitter<string>();

  submit() {
    this.search.emit(this.myForm.value.q);
  }

}
