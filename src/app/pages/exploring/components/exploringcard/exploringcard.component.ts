import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Video {
  id: number;
  title: string;
  thumbnail: string;
  likes: number;
  username: string;
  date: string;
}

@Component({
  selector: 'app-exploring-card',
  standalone: true,          // ✅ bắt buộc nếu muốn import thẳng
  imports: [CommonModule],
  templateUrl: './exploringcard.component.html', // ⚠ phải tồn tại file này
  styleUrl: './exploringcard.component.scss'     // ⚠ phải tồn tại file này
})
export class ExploringCardComponent {
  @Input() video!: Video;
}
