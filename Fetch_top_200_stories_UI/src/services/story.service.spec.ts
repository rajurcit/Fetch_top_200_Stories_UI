import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StoryService } from './story.service';

// describe('StoryService', () => {
//   let service: StoryService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [StoryService]
//     });
//     service = TestBed.inject(StoryService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });

 

describe('StoryService', () => {
  let service: StoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StoryService]
    });
    service = TestBed.inject(StoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch the story list', () => {
    const dummyStories = [
      { by: 'dhouston', descendants: 71, id: 8863, kids: [9224, 8917], score: 104, time: 1175714200, title: 'My YC app: Dropbox', type: 'story', url: 'http://www.getdropbox.com/u/2/screencast.html' }
    ];

    service.getStoryList().subscribe(stories => {
      expect(stories).toEqual(dummyStories);
    });

    const req = httpMock.expectOne(`http://localhost:5048/api/Story/GetStoryList`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyStories);
  });
});

