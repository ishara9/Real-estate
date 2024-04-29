import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { FilterPipe } from './app/filter-pipe';
import routeConfig from './app/routes';


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routeConfig),
    { provide: 'FilterPipe', useClass: FilterPipe }
  ]
}).catch(err => console.error(err));
