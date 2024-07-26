import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoryListComponent } from './StoryList.component';
import { StoryService } from 'src/services/story.service';
import { DataSharingService } from 'src/services/DataSharing.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';


describe('StoryListComponent', () => {
  let component: StoryListComponent;
  let fixture: ComponentFixture<StoryListComponent>;
  let storyService: jasmine.SpyObj<StoryService>;
  let dataSharingService: jasmine.SpyObj<DataSharingService>;

  beforeEach(async () => {
    const storyServiceSpy = jasmine.createSpyObj('StoryService', ['getStoryList']);
    const dataSharingServiceSpy = jasmine.createSpyObj('DataSharingService', ['loaderShow']);

    await TestBed.configureTestingModule({
      declarations: [ StoryListComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [
        { provide: StoryService, useValue: storyServiceSpy },
        { provide: DataSharingService, useValue: dataSharingServiceSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]  // Ignore template errors for external components
    }).compileComponents();

    fixture = TestBed.createComponent(StoryListComponent);
    component = fixture.componentInstance;
    storyService = TestBed.inject(StoryService) as jasmine.SpyObj<StoryService>;
    dataSharingService = TestBed.inject(DataSharingService) as jasmine.SpyObj<DataSharingService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch story list on init', () => {
    storyService.getStoryList.and.returnValue(of({ data: JSON.stringify([
        { by: 'dhouston', descendants: 71, kids: [9224, 8917], score: 104, time: 1175714200, title: 'My YC app: Dropbox', type: 'story', url: 'http://www.getdropbox.com/u/2/screencast.html' }
      ]) }));

    fixture.detectChanges();  // ngOnInit()

    expect(dataSharingService.loaderShow).toHaveBeenCalledWith(true);
    expect(component.storyList).toEqual([
        { by: 'dhouston', descendants: 71, kids: [9224, 8917], score: 104, time: 1175714200, title: 'My YC app: Dropbox', type: 'story', url: 'http://www.getdropbox.com/u/2/screencast.html' }
      ]);
    expect(component.filteredStoryList).toEqual([
        { by: 'dhouston', descendants: 71, kids: [9224, 8917], score: 104, time: 1175714200, title: 'My YC app: Dropbox', type: 'story', url: 'http://www.getdropbox.com/u/2/screencast.html' }
      ]);
    expect(dataSharingService.loaderShow).toHaveBeenCalledWith(false);
  });

  it('should filter stories based on search query', () => {
    component.storyList = [
      { by: 'dhouston', descendants: 71, kids: [9224, 8917], score: 104, time: 1175714200, title: 'My YC app: Dropbox', type: 'story', url: 'http://www.getdropbox.com/u/2/screencast.html' },
      { by: 'other', descendants: 45, kids: [1234, 5678], score: 89, time: 1175714201, title: 'Another app', type: 'story', url: 'http://www.anotherapp.com' }
    ];
    component.searchQuery = 'Dropbox';
    component.filterStories();

    expect(component.filteredStoryList.length).toBe(1);
    expect(component.filteredStoryList[0].title).toContain('Dropbox');
  });

  it('should handle pagination correctly', () => {
    component.storyList = Array.from({ length: 20 }, (_, i) => ({
      by: 'author' + i,
      descendants: i,
      id: i,
      kids: [i],
      score: i,
      time: 1175714200 + i, 
      title: 'Title ' + i,
      type: 'story',
      url: 'http://www.url.com/' + i
    }));
    component.itemsPerPage = 10;
    component.currentPage = 1;
    component.filterStories();

    expect(component.filteredStoryList.length).toBe(10);
    expect(component.filteredStoryList[0].title).toBe('Title 0');

    component.setPage(2);
    expect(component.filteredStoryList.length).toBe(10);
    expect(component.filteredStoryList[0].title).toBe('Title 10');
  });
});