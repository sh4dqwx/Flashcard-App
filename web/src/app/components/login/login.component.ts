import { Component, Injector, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { CurrentStateService } from '../../services/current-state/current-state.service';
import { User } from '../../classes/User';
import { UserRepositoryService } from '../../services/user-repository/user-repository.service';
import { IUserRepository } from '../../interfaces/IUserRepository';
import { firstValueFrom } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  userRepository!: IUserRepository
  applicationState!: CurrentStateService

  loginGroup!: FormGroup
  isLogging!: boolean

  ngOnInit(): void {
    this.loginGroup = this.formBuilder.group({
      loginField: ['', Validators.required, this.customLoginValidator],
      passwordField: ['', Validators.required]
    })
    this.isLogging = false
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private injector: Injector
  ) {
    this.userRepository = this.injector.get<IUserRepository>(UserRepositoryService);
    this.applicationState = this.injector.get(CurrentStateService);
  }

  customLoginValidator(control: AbstractControl): Promise<ValidationErrors | null> {
    const forbiddenUsernames = ['root', 'bot'];
    const inputValue = control.value;

    if (forbiddenUsernames.includes(inputValue))
      return Promise.resolve({ forbiddenUsername: true });

    return Promise.resolve(null);
  }

  login(event: any): void {
    event.preventDefault();
    this.isLogging = true;
    const login = this.loginGroup.get("loginField");
    const password = this.loginGroup.get("passwordField");

    if (!this.loginGroup.valid) {
      this.isLogging = false;
      alert("Invalid login or password");
      return;
    }

    this.userRepository.getUser(login?.value, password?.value).subscribe((user: User) => {
      if (user == null) {
        this.isLogging = false;
        alert("Invalid login or password")
        return
      }

      this.applicationState.setCurrentUser(user)
      this.isLogging = false
      this.router.navigate(['/search'])
    })
  }
}
