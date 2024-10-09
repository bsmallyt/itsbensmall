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
    this.image.src = '../assets/one.jpg';

    this.resizeCanvas();
  }

  resizeCanvas() {
    const canvas = this.myCanvas.nativeElement;
    
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width * 0.8;
    canvas.height = height * 0.8;

    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ctx.drawImage(this.image, 0, 0, canvas.width, canvas.height);
  }

  @HostListener('window:resize')
  onResize() {
    this.resizeCanvas();
  }
}
