import {Injectable} from '@angular/core';
import supabase from '../utils/supabase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
  }

  async login() {
    try {
      await supabase.auth.signInWithOAuth({
        provider: "google",
      });
    } catch (error) {
      console.error('Login error:', error);
    }
  }
}
