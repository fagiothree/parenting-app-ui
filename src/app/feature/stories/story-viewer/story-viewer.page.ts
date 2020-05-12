import { Component, OnInit, ViewChild } from '@angular/core';
import { Story } from '../story.model';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { StoryService } from '../story.service';
import { AudioService } from 'src/app/shared/services/audio/audio.service';
import { IonSlides } from '@ionic/angular';
import { AudioPlayer } from 'src/app/shared/services/audio/audio.player';

@Component({
  selector: 'plh-story-viewer',
  templateUrl: './story-viewer.page.html',
  styleUrls: ['./story-viewer.page.scss'],
})
export class StoryViewerPage implements OnInit {

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  currentStory: Story;
  currentSlideIndex: number = 0;

  @ViewChild(IonSlides, { static: false }) slides: IonSlides;
  audioPlayer: AudioPlayer;
  audioInterval: any;

  constructor(private route: ActivatedRoute, private storyService: StoryService,
    private audioService: AudioService, private router: Router) {
    this.route.params.subscribe(params => {
      if (params["id"]) {
        this.currentSlideIndex = 0;
        var id = params["id"];
        this.storyService.getStoryList().subscribe((storyList) => {
          this.currentStory = storyList.find((story) => story.id === id);
          if (this.currentStory.narrationAudioSrc) {
            this.audioPlayer = this.audioService.createPlayer(this.currentStory.narrationAudioSrc);
            this.audioPlayer.play();
            this.audioInterval = setInterval(() => {
              this.audioPlayer.getCurrentPosition().then((audioPosSec) => {
                console.log("pos", audioPosSec);
                if (this.currentSlideIndex + 1 < this.currentStory.panels.length) {
                  let currentPanel = this.currentStory.panels[this.currentSlideIndex];
                  let nextPanel = this.currentStory.panels[this.currentSlideIndex + 1];
                  if (!nextPanel.audioStartTimeSeconds) {
                    nextPanel.audioStartTimeSeconds = 3.5 * this.currentSlideIndex;
                  }
                  if (audioPosSec > nextPanel.audioStartTimeSeconds) {
                    this.currentSlideIndex++;
                    this.slides.slideTo(this.currentSlideIndex);
                  }
                }
              });
            }, 1000);
          }
        });
      }
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
          if (this.audioPlayer) {
            this.audioPlayer.stop();
            delete this.audioPlayer;
          }
          clearInterval(this.audioInterval);
        }
      });
    });
    
  }

  ngOnInit(): void {
  }

}
