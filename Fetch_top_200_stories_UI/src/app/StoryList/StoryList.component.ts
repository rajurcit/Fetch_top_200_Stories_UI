import { Component, OnInit } from '@angular/core';
import { Story } from 'src/Models/story.model';
import { DataSharingService } from 'src/services/DataSharing.service';
import { StoryService } from 'src/services/story.service';

@Component({
  selector: 'app-story-list',
  templateUrl: 'StoryList.component.html',
  styleUrls: ['StoryList.component.css']
})
export class StoryListComponent implements OnInit {
  storyList: Story[] = [];
  searchQuery = '';
  filteredStoryList: Story[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 0;

  constructor(private api: StoryService, private _dataSharingService: DataSharingService) { }

  ngOnInit() {
    this.getStoryList();
  }


  ///test
  
  getStoryList() {
    this._dataSharingService.loaderShow(true);
    this.api.getStoryList().subscribe(
      (res: any) => {
        this._dataSharingService.loaderShow(false);
        try {
          const parsedData = JSON.parse(res.data);
          if (Array.isArray(parsedData)) {
            this.storyList = parsedData;
          } else if (typeof parsedData === 'object' && parsedData !== null) {
            this.storyList = [parsedData];
          } else {
            this.storyList = [];
          }
          this.filteredStoryList = [...this.storyList];
          this.totalPages = Math.ceil(this.filteredStoryList.length / this.itemsPerPage);
        } catch (error) {
          this.storyList = [];
          this.filteredStoryList = [];
        }
      },
      (error: any) => {
        this._dataSharingService.loaderShow(false);
      }
    );
  }

  filterStories() {
    if (Array.isArray(this.storyList)) {
      const filtered = this.storyList.filter(story =>
        story.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        story.by.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      this.filteredStoryList = filtered.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
      this.totalPages = Math.ceil(filtered.length / this.itemsPerPage);
    } else {
      console.error('storyList is not an array:', this.storyList);
    }
  }

  setPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.filterStories();
  }
}
