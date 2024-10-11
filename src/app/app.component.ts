import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { AppGame } from "./game.component";
import { AppPics } from './pics.component';
import { AppYT } from './yt.component';
import { Renderer2 } from '@angular/core';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppGame, AppPics, AppYT, CommonModule, MatButtonModule, MatGridListModule, MatTabsModule, MatToolbarModule, MatMenuModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'itsbensmall';

  constructor(private renderer: Renderer2) {}

  display: Record<string, boolean> = {
    home: true,
    about_me: false,
    projects: false,
    contact_me: false,
    redcube: false,
  };

  toggle(key: string) {
    Object.keys(this.display).forEach(toggle => {
      this.display[toggle] = false;
    });
    this.display[key] = true;
    if (key == 'home') {
      //this.forceReload();
    }
  }

  togglescroll(key: string) {
    if (key == "on") {
      this.renderer.setStyle(document.body, 'overflow', 'scroll');
    } else {
      this.renderer.setStyle(document.body, 'overflow', 'hidden');
    }
  }

  forceReload() {
    window.location.reload();
  }
}


