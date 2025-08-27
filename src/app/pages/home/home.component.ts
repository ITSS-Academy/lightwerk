import {Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {AuthService} from '../../services/auth/auth.service';
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


}
