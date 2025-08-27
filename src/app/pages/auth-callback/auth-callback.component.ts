import {Component, OnInit} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-auth-callback',
  imports: [MatIconModule],
  standalone: true,
  templateUrl: './auth-callback.component.html',
})
export class AuthCallbackComponent implements OnInit {
  ngOnInit(): void {
    if (window.opener) {
      window.opener.postMessage('supabase-auth-success', window.location.origin);
      setTimeout(() => window.close(), 300);
    }
  }
}

