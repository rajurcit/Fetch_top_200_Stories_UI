import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoryListComponent } from './StoryList/StoryList.component';

const routes: Routes = [
  {path:'story', component: StoryListComponent },
  {path:'*', component: StoryListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
