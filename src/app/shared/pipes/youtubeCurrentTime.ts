import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'youtubeCurrentTime' })
export class YoutubeCurrentTime implements PipeTransform {

  transform(currentTime: number) {
    const hr = Math.floor((currentTime / 3600));
    const min = Math.floor(((currentTime % 3600) / 60));
    const sec = Math.floor(currentTime % 60);
    let sec_min = '';
    if (hr > 0) {
        sec_min += '' + hr + ':' + (min < 10 ? '0' : '');
    }
    sec_min += '' + min + ':' + (sec < 10 ? '0' : '');
    sec_min += '' + sec;
    const convertedTime = sec_min;
    return convertedTime;
  }
}
