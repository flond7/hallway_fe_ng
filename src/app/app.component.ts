import { Component, Renderer2, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'hallway_fe_ng';

  constructor(private router: Router, private renderer: Renderer2) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.setBodyClassForRoute(event.urlAfterRedirects);
    });
  }

  setBodyClassForRoute(url: string) {
    // Determine which route should have which class
    const isLightPage = url.includes('users'); // Example condition for light page
    const body = document.getElementsByTagName('body')[0];

    if (isLightPage) {
      this.renderer.addClass(body, 'light-background');
      this.renderer.removeClass(body, 'dark-background');
    } else {
      this.renderer.addClass(body, 'dark-background');
      this.renderer.removeClass(body, 'light-background');
    }
  }

}
