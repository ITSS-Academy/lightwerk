import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: string, title: string | null) {

    if (value === 'processing' && (!title || title === '')) {
      return 'Editing';
    }
    if (value === 'processing' && (title && title !== '')) {
      return 'Processing';
    }
    if (value === 'editing') {
      return 'Editing';
    }
    if (value === 'success') {
      return 'Success';
    }
    return null;
  }

}
