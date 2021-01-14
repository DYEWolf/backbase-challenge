import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-preview-screen',
  templateUrl: './preview-screen.component.html',
  styleUrls: ['./preview-screen.component.css'],
})
export class PreviewScreenComponent implements OnInit {
  display$: Observable<'open' | 'close'>;
  @Input() data;
  @Output() confirmTransaction = new EventEmitter<any>();

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.display$ = this.modalService.watch();
  }

  accept() {
    this.confirmTransaction.emit(true);
    this.modalService.close();
  }

  close() {
    this.modalService.close();
  }
}
