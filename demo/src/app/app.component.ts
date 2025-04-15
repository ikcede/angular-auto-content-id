import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AutoContentIdDirective } from 'angular-auto-content-id';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AutoContentIdDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'temp';
}
