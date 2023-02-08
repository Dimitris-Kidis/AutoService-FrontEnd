import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateMessageCommand } from 'src/commands/Messages/CreateMessageCommand';
import { MasterListItem } from 'src/models/Masters/MasterListItem';
import { MasterReview } from 'src/models/Masters/MasterReview';
// import { CreateImprovementCommand } from 'src/commands/Improvements/CreateImprovementCommand';
// import { CreateNoteCommand } from 'src/commands/Notes/CreateNoteCommand';
// import { Note } from 'src/models/Notes/Note';
// import { Post } from 'src/models/Posts/Post';
// import { ScheduleInfo } from 'src/models/Schedules/ScheduleInfo';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private _httpService: HttpClient) { }

  // createImprovement(command: CreateImprovementCommand): Observable<any> {
  //   return this._httpService.post<any>("api/common/improvement", command);
  // }

  // getAllNotesForUser(userId: number): Observable<Note[]> {
  //   return this._httpService.get<Note[]>(`api/common/all-notes-for-user/${userId}`);
  // }

  // createNote(command: CreateNoteCommand): Observable<any> {
  //   return this._httpService.post<any>("api/common/note", command);
  // }

  // deleteNote(noteId: number): Observable<any> {
  //   return this._httpService.delete<any>(`api/common/${noteId}`);
  // }

  // getScheduleInfo(scheduleId: number): Observable<ScheduleInfo> {
  //   return this._httpService.get<ScheduleInfo>(`api/common/schedule/${scheduleId}`);
  // }


  createMessage(command: CreateMessageCommand): Observable<any> {
  return this._httpService.post<any>("api/common/message", command);
  }

  getAllMasters(): Observable<MasterListItem[]> {
    return this._httpService.get<MasterListItem[]>(`api/common/all-masters`);
  }

  getAllMasterReviews(masterId: number): Observable<MasterReview[]> {
    return this._httpService.get<MasterReview[]>(`api/common/all-master-review/${masterId}`);
  }

  updateConsultation(command: UpdateConsultationCommand): Observable<any> {
    return this._httpService.put<any>("api/common/consultation", command);
  }
  
}
