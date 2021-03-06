import './rxjs-extensions';

import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions, XHRBackend } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DropdownModule } from 'ng2-bootstrap';
import { TabsModule, TooltipModule } from 'ng2-bootstrap';
import { Broadcaster, Logger, Notifications } from 'ngx-base';
import { Spaces } from 'ngx-fabric8-wit';
import { ModalModule } from 'ngx-modal';
import { TruncateModule } from 'ng2-truncate';
import {
  AuthenticationService,
  UserService,
  HttpService as HttpServiceLGC
} from 'ngx-login-client';

// Shared
import { GlobalSettings } from './shared/globals';
import { SpacesService } from './mock/standalone/spaces.service';
import { authApiUrlProvider } from './mock/standalone/auth-api.provider';
import { ssoApiUrlProvider } from './mock/standalone/sso-api.provider';
import { witApiUrlProvider } from './shared/wit-api.provider';

// App components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Header
import { HeaderComponent } from './header/header.component';
import { DummySpace } from './header/DummySpace.service';

// Login
import { LoginComponent } from './login/login.component';
import { LoginService } from './services/login.service';

// import { WorkItemModule } from './work-item/work-item.module';
import { PlannerBoardModule } from './components/planner-board/planner-board.module';
import { PlannerListModule } from './components/planner-list/planner-list.module';
import { WorkItemQuickAddModule } from './components/work-item-quick-add/work-item-quick-add.module';

// Mock data
import { MockDataService } from './mock/mock-data.service';
import { MockHttp } from './mock/mock-http';

// conditionally import the inmemory resource module
let serviceImports: Array<any[] | any | ModuleWithProviders>;
let providers: any[] = [
  GlobalSettings,
  serviceImports
];

// The inmemory environment variable is checked and if present then the in-memory dataset is added.
if (process.env.ENV == 'inmemory') {
  serviceImports = [
    Logger,
    AuthenticationService,
    Broadcaster,
    LoginService,
    UserService,
    MockDataService,
    authApiUrlProvider,
    Notifications,
    {
      provide: Spaces,
      useExisting: SpacesService
    }

  ];
  providers = [
    GlobalSettings,
    witApiUrlProvider,
    serviceImports,
    SpacesService,
    ssoApiUrlProvider,
    MockHttp,
    DummySpace,
    {
      provide: HttpServiceLGC,
      useExisting: MockHttp
    }
  ];
} else {
  serviceImports = [
    Logger,
    AuthenticationService,
    Broadcaster,
    LoginService,
    UserService,
    MockDataService,
    authApiUrlProvider,
    Notifications,
    {
      provide: Spaces,
      useExisting: SpacesService
    },
    SpacesService,
    ssoApiUrlProvider,
  ];
  providers = [
    GlobalSettings,
    witApiUrlProvider,
    serviceImports,
    DummySpace,
    {
      provide: Http,
      useClass: HttpServiceLGC
    }
  ];
}

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    DropdownModule,
    FormsModule,
    HttpModule,
    ModalModule,
    TabsModule,
    TooltipModule,
    TruncateModule,
    PlannerListModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent
  ],
  providers: providers,
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor(private globalSettings: GlobalSettings) {}
}
