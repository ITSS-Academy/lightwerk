import {Injectable} from '@angular/core';
import supabase from '../../utils/supabase';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, from} from 'rxjs';
import {ProfileModel} from '../../models/profile.model';
import {VideoModel} from '../../models/video.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) {
  }

  searchUser(query: string): Observable<ProfileModel | null> {
    return from(
      (async () => {
        const {data, error} = await supabase
          .from('profile')
          .select('*,profile_follows!followerId(*)')
          .or(`username.ilike.%${query}%`)
          .limit(1);

        if (error) throw new Error(error.message);

        const {data: dataSession, error: errorSession} = await supabase.auth.getSession();
        if (errorSession) throw new Error(errorSession.message);

        const currentUserId = dataSession.session?.user.id;
        let result = data && data.length ? {...data[0]} : null;
        if (result && currentUserId) {
          result.isFollowing = result.profile_follows.some((follow: any) => follow.followerId === currentUserId);
        }
        return result;
      })()
    );
  }

  searchVideos(query: string): Observable<{ videos: VideoModel[], totalItems: number }> {
    return from(
      (async () => {
        const {data, error} = await supabase.auth.getSession();
        if (error) throw new Error(error.message);
        const accessToken = data.session?.access_token;
        const headers: any = accessToken ? {'Authorization': `${accessToken}`} : {};
        const response = await this.http.get<any>(`${environment.api_base_url}/video/search?query=${encodeURIComponent(query)}`, {headers}).toPromise();
        return {
          videos: response.videos || [],
          totalItems: response.pagination.totalCount || 0
        };
      })()
    );
  }
}
