import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MomentModule } from 'ngx-moment';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { ChartModule } from 'angular-highcharts';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProfileBoxComponent } from './profile-box/profile-box.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { FooterComponent } from './footer/footer.component';
import { ContentComponent, ContactComponent, ProjectComponent, SkillsComponent } from './content/';
import { SocialComponent, SnapchatQRComponent } from './social';
import { SkillPipe } from './shared/pipes/skill.pipe';
import { AnimateOnScrollDirective } from './shared/directives/animate-on-scroll.directive';
import { GoogleAnalyticsService, ScrollService } from './shared/services';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AnimateOnScrollDirective,
    AppComponent,
    ContactComponent,
    ContentComponent,
    FooterComponent,
    HeaderComponent,
    ProfileBoxComponent,
    ProjectComponent,
    SideNavComponent,
    SkillPipe,
    SkillsComponent,
    SnapchatQRComponent,
    SocialComponent
  ],
  entryComponents: [
    ProjectComponent,
    SnapchatQRComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    BrowserModule,
    ChartModule,
    FlexLayoutModule,
    FormsModule,
    LoadingBarHttpClientModule,
    MaterialModule,
    MomentModule,
    NgxPageScrollCoreModule.forRoot({ duration: 500, scrollOffset: 25 }),
    NgxPageScrollModule,
    ReactiveFormsModule
  ],
  providers: [
    GoogleAnalyticsService,
    ScrollService
  ]
})
export class AppModule { }
