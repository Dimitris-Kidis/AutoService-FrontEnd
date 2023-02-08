import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserForAuthenticationDto, UserForRegistrationDto } from 'src/models/Auth/auth';
import { AuthentificationService } from 'src/services/authentification.service';
import { AvatarService } from 'src/services/avatar.service';
import { ageRange, digitCheck, lowercaseLetterCheck, nameLength, noLettersAllowed, noNumbersCharsSpaces, specialCharCheck, uppercaseLetterCheck } from 'src/shared/form-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  
  registrationForm!: FormGroup;
    private _returnUrl!: string;
    errorFlag: boolean = false;
  
    constructor(private _authService: AuthentificationService,
                private _router: Router,
                private _route: ActivatedRoute,
                private _avatarService: AvatarService
                ){}


    @ViewChild('inputEmail') inputEmail!: ElementRef;

    ngOnInit(): void {
      this.registrationForm = new FormGroup({
        firstName: new FormControl("", [Validators.required,
                                        nameLength,
                                        noNumbersCharsSpaces,
                                        Validators.minLength(2),
                                        Validators.maxLength(30)]),
        lastName: new FormControl("", [Validators.required,
                                       nameLength,
                                       noNumbersCharsSpaces,
                                       Validators.minLength(2),
                                       Validators.maxLength(30)]),
        email: new FormControl("", [Validators.required,
                                    Validators.email,
                                    Validators.minLength(5),
                                    Validators.maxLength(30)]),
        password: new FormControl("", [Validators.required,
                                       Validators.minLength(8),
                                       Validators.maxLength(20),
                                       lowercaseLetterCheck,
                                       uppercaseLetterCheck,
                                       digitCheck,
                                       specialCharCheck]),
        age: new FormControl("", [Validators.required,
                                  ageRange,
                                  noLettersAllowed]),
        role: new FormControl("", [Validators.required]),
        phoneNumber: new FormControl("", [Validators.required,
                                          noLettersAllowed]),
        experience: new FormControl("-", [Validators.required]),
        services: new FormControl("-", [Validators.required]),
        description: new FormControl("-", [Validators.required]),
      })
      this._returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
      
    }

    selectedFile!: File;

    onChange(event: any) {
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile);
    }
    
    @ViewChild('invalidLogin') loginErrorMessage!: ElementRef;
    
    
    login = async (registrationFormValue: any) => {
      console.log(this.registrationForm);
      const register = { ...registrationFormValue };
      const userRegisters: UserForRegistrationDto = {
        role: register.role == 'true' ? true : false,
        email: register.email,
        password: register.password,
        firstName: register.firstName,
        lastName: register.lastName,
        phoneNumber: register.phoneNumber,
        age: register.age,
        experience: register.experience,
        services: register.services,
        description: register.description
      }
      this._authService.registerUser(userRegisters)
        .subscribe({
          next: (_: any) => {
            const userForAuth: UserForAuthenticationDto = {
              email: userRegisters.email,
              password: userRegisters.password
            };
            this._authService.loginUser(userForAuth)
              .subscribe({
                next: async (res: any) => {
                  localStorage.setItem("token", res.token);
                  if (this.selectedFile) {
                    await delay(1500);
                    this._avatarService.uploadPhoto(this.selectedFile).subscribe(() => {

                    });
                  }
                  this._router.navigate(['/services']).then(() => {
                    window.location.reload();
                 });
                },
                error:
                  async () => {
                    await changeContent(this, 'Invalid email or password.');
                    await delay(5000);
                    await changeContent(this, '');
                }
              })
          },
          error: async () => {
            if (this.form.nativeElement.classList.contains('ng-valid')) {
              await changeContent(this, "There's user with such email");
              await delay(5000);
              await changeContent(this, '');
            } else {
              await changeContent(this, "Please fill in the form");
              await delay(5000);
              await changeContent(this, '');
            }
          }
        });
    }

    @ViewChild('form') form!: ElementRef;

  checkForm () {
    if (this.form.nativeElement.classList.contains('ng-valid')) {

    }
  }

  moreInputs: boolean = false;
  @ViewChild('roleInput') roleInput: ElementRef;
  openMoreInputs() {
    if (this.roleInput.nativeElement.value == "true") {
      this.registrationForm.patchValue({
        experience: '',
        services: '',
        description: '',
      });
      this.moreInputs = true;
    } else {
      this.moreInputs = false;
      this.registrationForm.patchValue({
        experience: '-',
        services: '-',
        description: '-',
      });
    }
  }
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function changeContent(obj: any, content: string) {
  obj.loginErrorMessage.nativeElement.innerHTML = `${content}`;
}