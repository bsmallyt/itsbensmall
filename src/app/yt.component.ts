import { Component, ViewChild, ElementRef, AfterViewInit, HostListener, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-youtube',
  standalone: true,
  template: `
    <iframe #youtubeVid src="https://www.youtube.com/embed/u43HwYUDb9U" allow="autoplay; encrypted-media" allowfullscreen style="border-style: solid; border-radius: 5px;"></iframe>
  `,
})
export class AppYT implements AfterViewInit {
  @ViewChild('youtubeVid', { static: false }) youtubeVid!: ElementRef<HTMLIFrameElement>;

  ngAfterViewInit(): void {
    this.resize();
  }

  resize(): void {
    const youtube = this.youtubeVid.nativeElement;

    let widthMax = window.innerWidth * 0.8;
    let heightMax = window.innerHeight * 0.8;
    let aspectRatio = 1920/1080;

    let width = widthMax;
    let height = width / aspectRatio;

    if (height > heightMax) {
      height = heightMax;
      width = height * aspectRatio;
    }

    youtube.width = width.toString();
    youtube.height = height.toString();
  } 

  @HostListener('window:resize')
  onResize() {
    this.resize();
  }
}