import { Component, ViewChild, ElementRef, AfterViewInit, HostListener, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-pics',
  standalone: true,
  template: `
    <canvas #myCanvas style="border-style: solid; border-radius: 5px;"></canvas>
    <img>
  `,
})
export class AppPics implements AfterViewInit, OnDestroy {
  @ViewChild('myCanvas', { static: false }) myCanvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private image = new Image();
  private currentIndex = 0;
  private intervalId: any;

  images = [
    ["4b2b6f23-1510-4342-8293-fb31bc213f00", "public"],
    ["5621a803-c3db-4458-b42d-e5ba55552800", "public"],
    ["cb06e988-33db-468f-e148-9a0d48ebf800", "public"],
    ["924eec1c-b932-4422-4d8e-d4ea15c8f700", "public"],
    ["b45682e5-ba36-40c4-9ea1-b0067605c000", "public"],
    ["cabb987a-d203-4116-4663-4fb9b2d5fd00", "public"],
    ["5e7934d6-7650-4d1b-fcb2-8079b373a400", "public"],
    ["92ce14ea-4c26-4ae3-3959-64ac43f00300", "public"],
    ["f845daeb-d2ce-40f4-03ac-019e11ef7d00", "public"],
  ];

  ngAfterViewInit() {
    this.ctx = this.myCanvas.nativeElement.getContext('2d')!;

    this.startImageIteration();
  }

  startImageIteration() {
    this.loadImage();

    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      this.loadImage();
    }, 3000); 
  }

  loadImage() {
    this.image.src = `https://imagedelivery.net/JFKtCgwTPfudztWkJA41Xw/${this.images[this.currentIndex][0]}/${this.images[this.currentIndex][1]}`;

    this.image.onload = () => {
      this.resizeCanvas();
    };
  }

  resizeCanvas() {
    const canvas = this.myCanvas.nativeElement;
    
    const maxWidth = window.innerWidth * 0.8;
    const maxHeight = window.innerHeight * 0.8;
    const aspectRatio = this.image.naturalWidth / this.image.naturalHeight;

    let width = maxWidth;
    let height = width / aspectRatio;

    if (height > maxHeight) {
      height = maxHeight;
      width = height * aspectRatio;
    }

    canvas.width = width;
    canvas.height = height;

    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ctx.drawImage(this.image, 0, 0, canvas.width, canvas.height);
  }

  @HostListener('window:resize')
  onResize() {
    this.resizeCanvas();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
