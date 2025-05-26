// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// import { AppModule } from './app/app.module';


// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));

import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app-routing.module';
import { ToggleService } from './app/core/services/toggle.service';
import { JwtAuthenticateService } from './app/core/services/jwt-authenticate.service';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { TabService } from './app/core/services/tab.service';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { API_URL, APP_CONFIG } from './app/core/configurations/constants';
import { ApidataService } from './app/core/services/apidata.service';
import { UtilityService } from './app/core/services/utilityservice';
import { CurrencyPipe, DatePipe, DecimalPipe, LowerCasePipe, PercentPipe, UpperCasePipe } from '@angular/common';
import { TestService } from './app/core/services/test.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { JwtInterceptor } from './app/core/interceptors/jwt.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // Include routing configuration here
    importProvidersFrom(BrowserAnimationsModule, HttpClientModule),
    ToggleService,
    JwtAuthenticateService,
    JwtHelperService,
    TabService,
    provideHttpClient(withInterceptors([JwtInterceptor])),  // Register JWT interceptor here
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }, // Date locale configuration
    { provide: API_URL, useValue: 'https://testforinjectiontoken.in' }, // API URL injection token
    { provide: APP_CONFIG, useValue: { apiUrl: 'https://testforinjectiontokeninobject.com', apiKey: '12345' } }, // APP_CONFIG injection token
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, // JWT options injection token
    ApidataService,
    UtilityService,
    DatePipe, CurrencyPipe, UpperCasePipe, LowerCasePipe, DecimalPipe, PercentPipe, // Common pipes
    TestService
  ],
}).catch(err => console.error(err));