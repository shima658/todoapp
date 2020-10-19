import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm = this.fb.group({
    name:['', [ Validators.required]],
    email:['',[ Validators.required, Validators.email]],
    password:['',[ Validators.required]],
    confirmPassword:['',[ Validators.required]],
  },{
    validator:this.checkPasswords
  });

  checkPasswords(registerForm){//custom validator
    const pass = registerForm.get("password");
    const confirmPassword = registerForm.get("confirmPassword");
    return pass.value==confirmPassword.value?null:{ notSame: true }
  }

  constructor(private fb:FormBuilder, private dataService:DataService) { }

  ngOnInit(): void {
  }

  register(){
    if(this.registerForm.valid){
      this.dataService.register(
        this.registerForm.value.name,
        this.registerForm.value.email,
        this.registerForm.value.password,
      ).subscribe(data=>{
        alert("Registration successful")
      },(data)=>{
        alert(data.error.message)
      })
    }
  }
}