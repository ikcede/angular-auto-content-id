import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AutoContentIdDirective } from 'angular-auto-content-id';
import { ChildComponent } from './child/child.component';
import { HeadingComponent } from './heading/heading.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    AutoContentIdDirective,
    ChildComponent,
    HeadingComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
