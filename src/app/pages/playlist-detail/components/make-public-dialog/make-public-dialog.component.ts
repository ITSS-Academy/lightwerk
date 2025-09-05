import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatDialogRef} from '@angular/material/dialog';

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

  constructor(private dialogRef: MatDialogRef<MakePublicDialogComponent>) {
  }

  togglePrivacy() {
    this.isPrivate = !this.isPrivate;
    this.isPrivateChange.emit(this.isPrivate);
    this.dialogRef.close(this.isPrivate); // Close dialog and return new value
  }


}
