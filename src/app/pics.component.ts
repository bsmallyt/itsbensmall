import { Component, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-pics',
  standalone: true,
  template: `
    <canvas #myCanvas style="border-style: solid; border-radius: 5px;"></canvas>
  `,
})
export class AppPics implements AfterViewInit {
  @ViewChild('myCanvas', { static: false }) myCanvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private image = new Image();

  ngAfterViewInit() {
    this.ctx = this.myCanvas.nativeElement.getContext('2d')!;
    this.image.src = 'https://imagedelivery.net/JFKtCgwTPfudztWkJA41Xw/4b2b6f23-1510-4342-8293-fb31bc213f00/public';

    this.resizeCanvas();
  }

  resizeCanvas() {
    const canvas = this.myCanvas.nativeElement;
    
    const maxWidth = window.innerWidth * 0.8;
    const aspectRatio = this.image.naturalWidth / this.image.naturalHeight;
    
    const width = maxWidth;
    const height = width / aspectRatio;

    canvas.width = width;
    canvas.height = height;

    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ctx.drawImage(this.image, 0, 0, canvas.width, canvas.height);
  }

  @HostListener('window:resize')
  onResize() {
    this.resizeCanvas();
  }
}
