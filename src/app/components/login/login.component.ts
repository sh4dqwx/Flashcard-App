import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

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
    private router: Router
  ) { }

  login(event: any): void {
    this.isLogging = true;
    event.preventDefault();
    const login = this.loginGroup.get("loginField");
    const password = this.loginGroup.get("passwordField");

    console.log("login: " + login?.value);
    console.log("password: " + password?.value);

    if (this.loginGroup.valid) {
      this.router.navigate(['/search']);
    } else {
      console.log("Invalid login or password");
    }
    this.isLogging = false;
  }
}
