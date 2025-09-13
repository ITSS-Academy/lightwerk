import {Injectable} from '@angular/core';
import supabase from '../../utils/supabase';
import {ProfileModel} from '../../models/profile.model';

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
      });
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

  async getCurrentProfile(): Promise<ProfileModel> {
    const {data: sessionData, error: sessionError} = await supabase.auth.getSession();
    if (sessionError || !sessionData?.session?.user?.id) {
      console.log(sessionError);
      throw new Error('No access token');
    }
    const uid = sessionData.session.user.id;

    const {data: profileData, error: profileError} = await supabase
      .from('profile')
      .select('*')
      .eq('id', uid)
      .single();

    if (profileError || !profileData) {
      console.log(profileError);
      throw new Error('Failed to fetch profile');
    }

    return profileData as ProfileModel;
  }

}
