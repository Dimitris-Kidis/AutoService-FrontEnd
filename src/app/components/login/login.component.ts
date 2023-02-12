import {
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  UserForRegistrationDto,
  UserForAuthenticationDto
} from 'src/models/Auth/auth';
import {
  AuthentificationService
} from 'src/services/authentification.service';
import {
  AvatarService
} from 'src/services/avatar.service';
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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm!: FormGroup;
  private _returnUrl!: string;
  errorFlag: boolean = false;

  constructor(private _authService: AuthentificationService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _avatarService: AvatarService
  ) {}


  @ViewChild('inputEmail') inputEmail!: ElementRef;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required,
        Validators.email,
        Validators.minLength(5),
        Validators.maxLength(30)
      ]),
      password: new FormControl("", [Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        lowercaseLetterCheck,
        uppercaseLetterCheck,
        digitCheck,
        specialCharCheck
      ]),
    })
    this._returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';

  }

  selectedFile!: File;

  onChange(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

  @ViewChild('invalidLogin') loginErrorMessage!: ElementRef;


  login = async (loginFormValue: any) => {
    console.log(this.loginForm);
    const login = {
      ...loginFormValue
    };
    const userForAuth: UserForAuthenticationDto = {
      email: login.email,
      password: login.password
    }
    this._authService.loginUser(userForAuth)
      .subscribe({
        next: async (res: any) => {
          localStorage.setItem("token", res.token);
          const role = this._authService.userRole();
          await delay(1000)
          this._router.navigate(['/services']).then(() => {
            window.location.reload();
          });

        },
        error: async () => {
          await changeContent(this, 'Invalid email or password.');
          await delay(5000);
          await changeContent(this, '');
        }
      });
  }
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function changeContent(obj: any, content: string) {
  obj.loginErrorMessage.nativeElement.innerHTML = `${content}`;
}
