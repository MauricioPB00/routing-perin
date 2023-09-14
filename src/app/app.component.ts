import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {
  }

  title = 'routing-perin';

  ngOnInit() {
    this.router.events

      .subscribe((routerevent) => {

        if (routerevent instanceof NavigationEnd) {
          window.addEventListener('keydown', (event) => {
            if (event.key === 'F4') {
              event.preventDefault();
              console.log('Tecla F4 ');
              if (routerevent.url == '/condi') {
                window.open('https://www.google.com/', '_blank');
              }
              if (routerevent.url == '/home') {
                window.open('https://www.facebook.com/', '_blank');
              }
            }
          });
        }
      });
  }
}
