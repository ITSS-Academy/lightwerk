import {Component} from '@angular/core';
import {MatButtonModule,} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-following',
  imports: [
    MatButtonModule,
    MatIconModule,
    RouterOutlet,
    RouterLink,
  ],
  templateUrl: './following.component.html',
  styleUrl: './following.component.scss'
})
export class FollowingComponent {
  constructor(public router: Router, public route: ActivatedRoute) {
  }

  isManageActive(): boolean {
    return this.router.url === '/following/user';
  }

  isGridActive(): boolean {
    return this.router.url === '/following' || this.router.url === '/following/grid';
  }

  isListActive(): boolean {
    return this.router.url === '/following/list';
  }

  goToManage() {
    this.router.navigate(['/following/user']);
  }

  goToGrid() {
    this.router.navigate(['/following/grid']);
  }

  goToList() {
    this.router.navigate(['/following/list']);
  }
}
