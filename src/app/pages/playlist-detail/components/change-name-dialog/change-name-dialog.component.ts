import {Component, inject} from '@angular/core';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-change-name-dialog',
  imports: [
    MatFormField,
    MatLabel,
    MatError,
    ReactiveFormsModule,
    MatInput,
    MatButton
  ],
  templateUrl: './change-name-dialog.component.html',
  styleUrl: './change-name-dialog.component.scss'
})
export class ChangeNameDialogComponent {
  nameFormControl = new FormControl('', Validators.required);
  readonly dialogRef = inject(MatDialogRef<ChangeNameDialogComponent>);
  onNoClick() {
    this.dialogRef.close();

  }

  onYesClick() {
    this.dialogRef.close();
  }
}
