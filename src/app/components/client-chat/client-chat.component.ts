import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  UpdateConsultationCommand
} from 'src/commands/Consultations/UpdateConsultationCommand';
import {
  CreateMessageCommand
} from 'src/commands/Messages/CreateMessageCommand';
import {
  IsThereConsultation
} from 'src/models/Clients/IsThereConsultation';
import {
  MasterInfoForClient
} from 'src/models/Masters/MasterInfoForClient';
import {
  UserId
} from 'src/models/Masters/UserId';
import {
  SeenMessage
} from 'src/models/Messages/SeenMessage';
import {
  AuthentificationService
} from 'src/services/authentification.service';
import {
  ClientService
} from 'src/services/client.service';
import {
  CommonService
} from 'src/services/common.service';

@Component({
  selector: 'app-client-chat',
  templateUrl: './client-chat.component.html',
  styleUrls: ['./client-chat.component.scss']
})
export class ClientChatComponent implements OnInit, AfterViewInit {


  constructor(
    private _authService: AuthentificationService,
    private _clientService: ClientService,
    private _commonService: CommonService
  ) {}

  currentMasterId: number;
  masterInfo: MasterInfoForClient;

  clientId: number;
  seen: SeenMessage[]

  errorFlag: boolean = true;
  consultation: boolean;

  @ViewChild('messageBox') messageBox!: ElementRef;

  ngOnInit(): void {
    if (this._authService.userRole() == 'Master') return
    const clientId = this._authService.getUserId();
    this._clientService.getIsThereConsultation(clientId, false).subscribe(
      (isThereConsultation: IsThereConsultation) => {
        this.consultation = isThereConsultation.isThereConsultation;



        if (!this.consultation) return
        this.clientId = clientId;
        this._clientService.getCurrentMasterIdOrClientId(clientId, false)
          .subscribe({
            next: async (masterId: UserId) => {
              this.errorFlag = false;
              this.currentMasterId = masterId.userId
              this._clientService.getCurrentMasterInfo(clientId).subscribe({
                next: (info: MasterInfoForClient) => {
                  this.masterInfo = info;
                  this._commonService.getAllSeenMessages(clientId, this.currentMasterId).subscribe(
                    (sms: SeenMessage[]) => {
                      this.seen = sms;
                      this.checkMsgs();
                    }
                  )
                },

              });
            },
            error: () => {}
          })


      }
    );


  }


  ngAfterViewInit(): void {
    if (!this.consultation) return

    try {
      setTimeout(() => {
        this.messageBox.nativeElement.scrollTo({
          top: 1000,
          left: 100,
          behavior: 'smooth'
        });
      }, 200);
    } catch (error) {

    }


  }

  @ViewChild('textWindow') textWindow: ElementRef;

  show() {
    if (this.textWindow.nativeElement.value == '') return
    console.log('pressed');
    var sms: CreateMessageCommand = {
      sender: this.clientId,
      receiver: this.currentMasterId,
      text: this.textWindow.nativeElement.value
    }
    console.log(sms);
    this._commonService.createMessage(sms).subscribe()
    console.log(this.messageBox.nativeElement);
    this.messageBox.nativeElement.scrollTo({
      top: 1000,
      left: 100,
      behavior: 'smooth'
    });
    this.textWindow.nativeElement.value = ''
  }

  checkMsgs() {
    if (this.endChatFlag == true) return
    setTimeout(() => {
      if (this.endChatFlag == true) return
      this._commonService.getAllUnseenMessages(this.clientId, this.currentMasterId).subscribe({
        next: (sms: SeenMessage[]) => {
          this._commonService.getAllSeenMessages(this.clientId, this.currentMasterId).subscribe(
            (seen: SeenMessage[]) => {
              if (this.endChatFlag == true) return

              this.seen = seen;
              this.messageBox.nativeElement.scrollTo({
                top: 1000,
                left: 100,
                behavior: 'instant'
              });
            }
          );
        }
      });

      this.checkMsgs();
    }, 2000);
  }
  endChatFlag: boolean = false;
  endChat() {
    this.endChatFlag = true;
  }


  @ViewChild('rateInput') rateInput: ElementRef;
  @ViewChild('commentInput') commentInput: ElementRef;
  finish() {
    var updatedCon: UpdateConsultationCommand = {
      role: false,
      clientId: this.clientId,
      masterId: this.currentMasterId,
      done: true,
      rated: true,
      stars: +this.rateInput.nativeElement.value,
      comment: this.commentInput.nativeElement.value
    }
    this._commonService.updateConsultation(updatedCon).subscribe(
      (res: any) => {
        console.log(res)
      }
    );
    window.location.reload();
  }
}
