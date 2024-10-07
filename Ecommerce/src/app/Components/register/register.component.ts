import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
   
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]], 
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  register() {
    
    if (this.registerForm.valid && this.registerForm.value.password === this.registerForm.value.confirmPassword) {
      const newUser = {
        username: this.registerForm.value.username,
        password: this.registerForm.value.password,
        cart: []
      };

      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');

      const userExists = existingUsers.some((user: any) => user.username === newUser.username);

      if (userExists) {
        alert('Username already exists!');
        return;
      }

      existingUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(existingUsers));

      // alert('Registration successful!');
      this.router.navigate(['/login']);
    } else {
      alert('Please confirm Passwords correctly');
    }
  }
}
