import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 
import { AuthService } from 'src/app/Service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup; 

  constructor(private fb: FormBuilder, private router: Router, private authService:AuthService) {
   
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]], 
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]], 
      password: ['', Validators.required] 
    });
  }

  login(): void {
    if (this.loginForm.valid) { 
      const formValue = this.loginForm.value; 

      
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');

      const user = storedUsers.find((user: any) => 
        user.username === formValue.username && user.password === formValue.password
      );

      if (user) {
        this.authService.login(formValue.username); 
        // alert('Login Succesfuly')
        this.router.navigate(['/Products']); 
      } 
      else 
        alert('Invalid Email Or Password!');
    } 
  }
}
