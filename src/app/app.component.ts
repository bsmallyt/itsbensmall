import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { AppGame } from "./game.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppGame, CommonModule, MatButtonModule, MatGridListModule, MatTabsModule, MatToolbarModule, MatMenuModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'itsbensmall';

  showDisplay: boolean = false;

  toggleVisibility() {
    this.showDisplay = !this.showDisplay;
  }
}


