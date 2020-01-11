import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-confirm-modal-template',
  templateUrl: './confirm-modal-template.component.html',
  styleUrls: ['./confirm-modal-template.component.css']
})
export class ConfirmModalTemplateComponent implements OnInit {

  @Input() modalName: string;
  @Output() onConfirm = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  modalClose(){
    this.onConfirm.emit();
  }
}
