import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {AuthState} from '../../ngrx/states/auth.state';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  accessToken!: string

  constructor(private http: HttpClient, private store: Store<{
    auth: AuthState
  }>) {
    this.store.select(state => state.auth.auth.access_token).subscribe(accessToken => {
      this.accessToken = accessToken || ''
    })
  }

  getAllCategories() {
    return this.http.get<{
      id: string;
      name: string
    }[]>(`${environment.api_base_url}/category/all`, {});
  }

  
}
