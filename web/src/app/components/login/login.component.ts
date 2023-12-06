import { Component, Injector, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
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
      loginField: ['', Validators.required],
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

  async login(event: any): Promise<void> {
    event.preventDefault();
    this.isLogging = true;
    const login = this.loginGroup.get("loginField");
    const password = this.loginGroup.get("passwordField");

    console.log("login: " + login?.value);
    console.log("password: " + password?.value);

    if (!this.loginGroup.valid) {
      this.isLogging = false;
      console.log("Invalid login or password");
      return;
    }

    const user = await firstValueFrom(this.userRepository.getUser(login?.value, password?.value))
    console.log(user);
    if (user == null) {
      this.isLogging = false;
      console.log("Invalid login or password");
      return;
    }

    this.applicationState.setCurrentUser(user);
    this.isLogging = false;
    this.router.navigate(['/search']);
  }
}
