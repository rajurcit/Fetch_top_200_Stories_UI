import { Component, OnInit } from '@angular/core';
import { DataSharingService } from 'src/services/DataSharing.service';
import { StoryService } from 'src/services/story.service';

@Component({
  selector: 'app-StoryList',
  templateUrl: './StoryList.component.html',
  styleUrls: ['./StoryList.component.css']
})
export class StoryListComponent implements OnInit {
  storyList: any;

  constructor(private api: StoryService,private _dataSharingService: DataSharingService,) { }

  ngOnInit() {
   this.getStoryList();
  }

  getStoryList() {
    this._dataSharingService.loaderShow(true);
    this.api.getStoryList().subscribe((res: any) => {
      debugger
      this._dataSharingService.loaderShow(false);
      this.storyList = JSON.parse(res.data) ;
    });
  }

}
