import {Component, Input} from '@angular/core';
import {VideoCardComponent} from '../video-card/video-card.component';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';

interface VideoModel {
  id: string;
  title: string;
  image: string;
  date: Date
}

@Component({
  selector: 'app-video',
  imports: [
    VideoCardComponent,
    MatButtonToggleGroup,
    MatButtonToggle
  ],
  templateUrl: './video.component.html',
  styleUrl: './video.component.scss'
})
export class VideoComponent {
  sortValue = 'latest';
  videoList: VideoModel[] = [
    {
      id: '1',
      title: "Shanhai jing in a nutshell",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Ph%C3%A9nix_%C3%A0_neuf_t%C3%AAtes.png/500px-Ph%C3%A9nix_%C3%A0_neuf_t%C3%AAtes.png",
      date: new Date(),
    },
    {
      id: '2',
      title: "The significance of Journey to The West",
      image: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Evl53201b_pic.jpg",
      date: new Date(),
    },
    {
      id: '3',
      title: " The Art Of War (part 23)",
      image: "https://danviet.ex-cdn.com/files/f1/296231569849192448/2024/10/30/du-an-moi-17-1730301922036-1730301922375139475334.jpg",
      date: new Date(),
    },

    {
      id: "4",
      title: "Four Mythical Creatures",
      image: "https://cdn.tgdd.vn/Files/2021/12/24/1406432/tu-linh-la-gi-tim-hieu-y-nghia-cua-tu-linh-trong-phong-thuy-202112240006578056.jpg",
      date: new Date(),
    }
  ];

}
