import {Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {AuthService} from '../../services/auth.service';
import supabase from '../../utils/supabase';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-home',
  imports: [
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private authService: AuthService) {
  }





  // async login() {
  //   await this.authService.login();
  // }
  //
  // async printIdToken() {
  //   const {data, error} = await supabase.auth.getSession();
  //   if (error) {
  //     console.error('Error fetching session:', error);
  //     return;
  //   }
  //   if (data.session) {
  //     console.log('ID Token:', data.session.access_token);
  //   } else {
  //     console.log('No active session found.');
  //   }
  // }

}
