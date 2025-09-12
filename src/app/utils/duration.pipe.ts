import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'duration',
  standalone: true
})
export class DurationPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value == null || isNaN(value)) return '00:00';
    const sec = Math.floor(value % 60);
    const min = Math.floor((value / 60) % 60);
    const hr = Math.floor(value / 3600);
    const pad = (n: number) => n.toString().padStart(2, '0');
    if (hr > 0) {
      return `${pad(hr)}:${pad(min)}:${pad(sec)}`;
    } else {
      return `${pad(min)}:${pad(sec)}`;
    }
  }
}

