import supabase from './supabase';

export async function refreshSession() {
  //check if access_token is expired, if yes, refresh it
  const {data, error} = await supabase.auth.getSession();
  if (error) {
    console.error('Error getting session:', error);
    return;
  }

  if (data?.session) {
    const expiresAt = data.session.expires_at;
    const currentTime = Math.floor(Date.now() / 1000);
    if (expiresAt && expiresAt < currentTime) {
      console.log('Access token expired, refreshing...');
      const {data: refreshData, error: refreshError} = await supabase.auth.refreshSession();
      if (refreshError) {
        console.error('Error refreshing session:', refreshError);
      } else {
        console.log('Session refreshed:', refreshData);
      }
    } else {
      console.log('Access token is still valid.');
    }
  } else {
    console.log('No active session found.');
  }
}
