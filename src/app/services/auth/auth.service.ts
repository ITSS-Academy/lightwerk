import {Injectable} from '@angular/core';
import supabase from '../../utils/supabase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
  }

  async login() {
    try {
      const {data, error} = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          skipBrowserRedirect: true,
          redirectTo: window.location.origin + '/auth/callback'
        }
      });
      if (data?.url) {
        window.open(data.url, '_blank', 'width=500,height=600');
      }
      if (error) {
        console.error('Login error:', error);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  }

  /**
   * Checks if the user is currently logged in (async, always up-to-date)
   */
  async isLoggedIn(): Promise<boolean> {
    if (!supabase) return false;
    const {data, error} = await supabase.auth.getSession();
    console.log('AuthService.isLoggedIn', {data, error});
    return !!data?.session && !error;
  }

  /**
   * Returns the current logged-in user's ID (if any)
   */
  async getCurrentUserId(): Promise<string | null> {
    if (!supabase) return null;
    const {data, error} = await supabase.auth.getSession();
    if (error || !data?.session?.user?.id) return null;
    return data.session.user.id;
  }

}
