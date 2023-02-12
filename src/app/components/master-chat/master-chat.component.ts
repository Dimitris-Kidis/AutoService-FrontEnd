import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UpdateConsultationCommand } from 'src/commands/Consultations/UpdateConsultationCommand';
import { CreateMessageCommand } from 'src/commands/Messages/CreateMessageCommand';
import { ClientsForChat } from 'src/models/Clients/ClientsForChat';
import { IsThereConsultation } from 'src/models/Clients/IsThereConsultation';
import { MasterInfoForClient } from 'src/models/Masters/MasterInfoForClient';
import { UserId } from 'src/models/Masters/UserId';
import { SeenMessage } from 'src/models/Messages/SeenMessage';
import { AuthentificationService } from 'src/services/authentification.service';
import { ClientService } from 'src/services/client.service';
import { CommonService } from 'src/services/common.service';
import { MasterService } from 'src/services/master.service';

@Component({
  selector: 'app-master-chat',
  templateUrl: './master-chat.component.html',
  styleUrls: ['./master-chat.component.scss']
})
export class MasterChatComponent implements OnInit, AfterViewInit{


  constructor(
    private _authService: AuthentificationService,
    private _clientService: ClientService,
    private _commonService: CommonService,
    private _masterService: MasterService
  ) {}
  
  currentMasterId: number;
  masterInfo: ClientsForChat;

  clientId: number;
    seen: SeenMessage[]
  
  errorFlag: boolean = true;
  consultation: boolean;
  avatar: string;

  @ViewChild('messageBox') messageBox!: ElementRef;

  ngOnInit(): void {
    console.log('cjchcj')
    const clientId = this._authService.getUserId();
    const master = this._masterService.getCurrentMasterInfo(clientId).subscribe(
      (master: MasterInfoForClient) => {
        this.avatar = master.avatar
      }
    );
    this._clientService.getIsThereConsultation(clientId, true).subscribe(
      (isThereConsultation: IsThereConsultation) => {
        this.consultation = isThereConsultation.isThereConsultation;
        // console.log(isThereConsultation.isThereConsultation);



        console.log('тук-тук');
        if (!this.consultation) return
    this.clientId = clientId;
    this._clientService.getCurrentMasterIdOrClientId(clientId, true)
              .subscribe({
                next: async (masterId: UserId) => {
                  this.errorFlag = false;
                  this.currentMasterId = masterId.userId
                  this._masterService.getClientsForChats(clientId).subscribe({
                    next: (info: ClientsForChat[]) => {
                      this.masterInfo = info[0];
                      // console.log(info)
                      this._commonService.getAllSeenMessages(clientId, this.currentMasterId).subscribe(
                        (sms: SeenMessage[]) => {
                          this.seen = sms;
                          // console.log(sms);
                          this.checkMsgs();
                        }
                      )
                    },

                });
                },
                error: () => {
                }
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

  show () {
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
      }
      );
      
      this.checkMsgs();
    }, 2000);
  }
  endChatFlag: boolean = false;


}
