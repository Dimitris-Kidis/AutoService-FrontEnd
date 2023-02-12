import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import {
  Router
} from '@angular/router';
import {
  UpdateMasterCommand
} from 'src/commands/Masters/UpdateMasterCommand';
import {
  MasterInfoForClient
} from 'src/models/Masters/MasterInfoForClient';
import {
  AuthentificationService
} from 'src/services/authentification.service';
import {
  AvatarService
} from 'src/services/avatar.service';
import {
  MasterService
} from 'src/services/master.service';
import {
  nameLength,
  noNumbersCharsSpaces,
  lowercaseLetterCheck,
  uppercaseLetterCheck,
  digitCheck,
  specialCharCheck,
  ageRange,
  noLettersAllowed
} from 'src/shared/form-validators';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss']
})
export class CabinetComponent implements OnInit {

  constructor(
    private _authService: AuthentificationService,
    private _masterService: MasterService,
    private _avatarService: AvatarService,
    private _router: Router

  ) {}

  selectedFile!: File;

  async onChange(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    await delay(1500);
    this.upload()
  }

  async upload() {
    if (this.selectedFile) {

      this._avatarService.uploadPhoto(this.selectedFile).subscribe(() => {
        window.location.reload();

      });
    }
  }

  info!: MasterInfoForClient;
  editFlag: boolean = false;

  editForm!: FormGroup;


  ngOnInit(): void {
    const id = this._authService.getUserId();
    this._masterService.getCurrentMasterInfo(id).subscribe(
      (info: MasterInfoForClient) => {
        this.info = info;
      }
    );
    this.editForm = new FormGroup({
      firstName: new FormControl("", [Validators.required,
        nameLength,
        noNumbersCharsSpaces,
        Validators.minLength(2),
        Validators.maxLength(30)
      ]),
      lastName: new FormControl("", [Validators.required,
        nameLength,
        noNumbersCharsSpaces,
        Validators.minLength(2),
        Validators.maxLength(30)
      ]),
      age: new FormControl("", [Validators.required,
        ageRange,
        noLettersAllowed
      ]),
      phoneNumber: new FormControl("", [Validators.required,
        noLettersAllowed
      ]),
      experience: new FormControl("", [Validators.required]),
      services: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
    })
  }

  edit() {
    this.editFlag = true;
    this.editForm.patchValue({
      firstName: this.info.firstName,
      lastName: this.info.lastName,
      age: this.info.age,
      phoneNumber: this.info.phoneNumber,
      experience: this.info.experience,
      services: this.info.services,
      description: this.info.description
    });
  }

  save = async (editFormValue: any) => {
    console.log(this.editForm);
    const register = {
      ...editFormValue
    };
    const id = this._authService.getUserId();
    const userRegisters: UpdateMasterCommand = {
      userId: id,
      firstName: register.firstName,
      lastName: register.lastName,
      phoneNumber: register.phoneNumber,
      age: register.age,
      experience: register.experience,
      services: register.services,
      description: register.description
    }
    this._masterService.updateMaster(userRegisters)
      .subscribe(
        () => {
          window.location.reload();
        }
      )
  }

  cancel() {
    window.location.reload();
  }
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
