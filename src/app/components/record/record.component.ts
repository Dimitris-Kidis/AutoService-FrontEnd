import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateConsultationCommand } from 'src/commands/Consultations/CreateConsultationCommand';
import { UserForRegistrationDto } from 'src/models/Auth/auth';
import { CreateCarCommand } from 'src/models/Cars/CreateCarCommand';
import { MasterListItem } from 'src/models/Masters/MasterListItem';
import { AuthentificationService } from 'src/services/authentification.service';
import { ClientService } from 'src/services/client.service';
import { CommonService } from 'src/services/common.service';
import { nameLength, noNumbersCharsSpaces, ageRange, noLettersAllowed } from 'src/shared/form-validators';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent {

  constructor(private _authService: AuthentificationService,
    private _router: Router,
    private _clientService: ClientService,
    private _commonService: CommonService
    ){}

  recordForm!: FormGroup;

  masters: MasterListItem[];

  ngOnInit(): void {
    this._commonService.getAllMasters().subscribe(
      (masters: MasterListItem[]) => {
        this.masters = masters;
      }
    );
    this.recordForm = new FormGroup({
      brand: new FormControl("", [Validators.required,
                                      Validators.minLength(2),
                                      Validators.maxLength(30)]),
      model: new FormControl("", [Validators.required,
                                     Validators.minLength(2),
                                     Validators.maxLength(30)]),
      year: new FormControl("", [Validators.required,
                                noLettersAllowed]),
      engine: new FormControl("", [Validators.required,
                                  Validators.minLength(2),
                                  Validators.maxLength(30)]),
      driveType: new FormControl("", [Validators.required,
                                    Validators.minLength(2),
                                    Validators.maxLength(30)]),
      transmission: new FormControl("", [Validators.required,
                                      Validators.minLength(2),
                                      Validators.maxLength(30)]),
      mileage: new FormControl("", [Validators.required,
                                        Validators.minLength(2),
                                        Validators.maxLength(30),
                                        noLettersAllowed]),
      services: new FormControl("", [Validators.required,
                                          Validators.minLength(30),
                                          Validators.maxLength(400)]),
    })
  }

  carFlag: boolean = true;
  @ViewChild('form') form!: ElementRef;


  login = async (recordFormValue: any) => {


    if (!this.form.nativeElement.classList.contains('ng-valid')) return;

    console.log(this.recordForm);
    const register = { ...recordFormValue };
    const id = this._authService.getUserId();
    const userRegisters: CreateCarCommand = {
      clientId: id,
      brand: register.brand,
      model: register.model,
      year: register.year,
      engine: register.engine,
      driveType: register.driveType,
      transmission: register.transmission,
      mileage: register.mileage,
      services: register.services
    }
    this._clientService.createCar(userRegisters)
      .subscribe(
        () => {
          this.carFlag = false;
        }
      )
  }

  choose(masterId: number) {
    const id = this._authService.getUserId();
    const con: CreateConsultationCommand = {
      clientId: id,
      masterId: masterId
    }
    this._clientService.createConsultation(con).subscribe(
      () => {
        this._router.navigate(['/client-chat']).then(() => {
          window.location.reload();
       });
      }
    );
  }
}
