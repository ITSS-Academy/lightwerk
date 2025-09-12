import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'avatar'
})
export class AvatarPipe implements PipeTransform {

  transform(value: string | null | undefined): string | null {
    console.log('AvatarPipe transform called with value:', value);
    if (!value) {
      return null;
    }
    if (value.startsWith('https')) {
      return value;
    }
    if (value) {
      return `https://zkeqdgfyxlmcrmfehjde.supabase.co/storage/v1/object/public/avatars/${value}`;
    }
    return null;
  }

}
