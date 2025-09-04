import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-make-public-dialog',
  imports: [
    MatIcon
  ],
  templateUrl: './make-public-dialog.component.html',
  styleUrl: './make-public-dialog.component.scss'
})
export class MakePublicDialogComponent {
  @Input() isPrivate: boolean = true;
  @Output() isPrivateChange = new EventEmitter<boolean>();


  togglePrivacy() {
    this.isPrivate = !this.isPrivate;
    this.isPrivateChange.emit(this.isPrivate);
  }


}
