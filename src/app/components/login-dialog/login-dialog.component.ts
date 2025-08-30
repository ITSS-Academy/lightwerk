import {Component} from '@angular/core';
import {MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDivider} from '@angular/material/divider';
import {AuthService} from '../../services/auth/auth.service';
import {Store} from '@ngrx/store';
import {AuthState} from '../../ngrx/states/auth.state';
import {login, storeAuth} from '../../ngrx/actions/auth.actions';

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule, MatDivider],
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent {
  loading = false;
  error: string | null = null;

  constructor(
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    private store: Store<{
      auth: AuthState
    }>
  ) {
  }

  async loginWithGoogle() {
    this.loading = true;
    this.error = null;
    try {
      this.store.dispatch(login());
      this.dialogRef.close(true);
    } catch (e: any) {
      this.error = 'Login failed. Please try again.';
    } finally {
      this.loading = false;
    }
  }

  close() {
    this.dialogRef.close(false);
  }
}
