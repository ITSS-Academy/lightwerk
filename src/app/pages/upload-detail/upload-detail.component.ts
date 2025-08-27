import {Component, OnInit} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatButton} from '@angular/material/button';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {map, Observable, startWith} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {MatAutocomplete, MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {MatInput} from '@angular/material/input';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';

@Component({
  selector: 'app-upload-detail',
  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButton,
    AsyncPipe,
    MatAutocomplete,
    MatAutocompleteTrigger,
    ReactiveFormsModule,
    MatInput,
    MatRadioButton,
    MatRadioGroup,
  ],
  templateUrl: './upload-detail.component.html',
  styleUrl: './upload-detail.component.scss'
})
export class UploadDetailComponent implements OnInit{
  myControl = new FormControl('', { nonNullable: true, validators: [Validators.required] });
  options: string[] = ['Education', 'Entertainment', 'Music'];
  filteredOptions$!: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions$ = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value?.toLowerCase() ?? '';
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }


  get outlineColor(): 'primary' | 'warn' {
    return this.myControl.invalid && this.myControl.touched ? 'warn' : 'primary';
  }


  get errorMessage(): string | null {
    if (this.myControl.hasError('required')) return 'Category is required';
    return null;
  }
}
