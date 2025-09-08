import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatDialogRef} from '@angular/material/dialog';
import {MatSlideToggle} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-make-public-dialog',
  imports: [
    MatIcon,
    MatSlideToggle
  ],
  templateUrl: './make-public-dialog.component.html',
  styleUrl: './make-public-dialog.component.scss'
})
export class MakePublicDialogComponent {
  @Input() isPrivate: boolean = true;
  @Output() isPrivateChange = new EventEmitter<boolean>();

  constructor(private dialogRef: MatDialogRef<MakePublicDialogComponent>) {
  }

  togglePrivacy() {
    this.isPrivate = !this.isPrivate;
    this.isPrivateChange.emit(this.isPrivate);
  }


}
