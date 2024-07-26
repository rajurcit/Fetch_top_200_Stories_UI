import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoryListComponent } from './StoryList/StoryList.component';
import { StoryService } from 'src/services/story.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
   declarations: [
      AppComponent,
      StoryListComponent
   ],
   imports: [
	 BrowserModule,
	 AppRoutingModule,
    HttpClientModule ,FormsModule  
	],
   providers: [StoryService],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
