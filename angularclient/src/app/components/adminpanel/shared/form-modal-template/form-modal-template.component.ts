import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-form-modal-template',
  templateUrl: './form-modal-template.component.html',
  styleUrls: ['./form-modal-template.component.css']
})
export class FormModalTemplateComponent implements OnInit {

  @Input() modalName: string;
  @Input() modalID: string;
  @Input() disableSubmit: boolean;
  @Output() onModalClose = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  modalClose(){
    this.onModalClose.emit();
  }

}
