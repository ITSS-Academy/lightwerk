import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import supabase from '../../utils/supabase';
import {from} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor() {
  }

  toVietnamTime(date: Date) {
    return new Date(date.getTime() + 7 * 60 * 60 * 1000);
  }

  async getHistory(startDate?: Date, endDate?: Date) {
    const user = await supabase.auth.getUser();
    if (!user.data.user) {
      throw new Error('User not authenticated');
    }

    const userId = user.data.user.id;

    const {data, error} = await supabase
      .from('history_videos')
      .select('*, video(*,like_video(count),profile!FK_553f97d797c91d51556037b99e5(*))')
      .eq('profileId', userId)
      .order('createdAt', {ascending: false});


    if (error) {
      console.error('Error fetching history:', error);
      throw new Error('Failed to fetch history');
    }

    let filteredData = [...data]

    if (startDate && endDate) {
      filteredData = filteredData.filter(item => {
        const createdAt = this.toVietnamTime(new Date(item.createdAt));
        return createdAt >= startDate && createdAt <= endDate;
      });

      console.log('11111111111', filteredData);

      return filteredData.map(item => {
        return {
          ...item,
          video: {
            ...item.video,
            likeCount: item.video.like_video[0]?.count || 0
          }
        }
      });
    }


    return filteredData
  }

  async deleteFromHistory(videoId: string) {
    const user = await supabase.auth.getUser();
    if (!user.data.user) {
      throw new Error('User not authenticated');
    }

    const userId = user.data.user.id;

    const {data, error} = await supabase
      .from('history_videos')
      .delete()
      .eq('profileId', userId)
      .eq('videoId', videoId);

    if (error) {
      console.error('Error deleting video from history:', error);
      throw new Error('Failed to delete video from history');
    }

    return data;
  }
}
