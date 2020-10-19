import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  addForm = this.fb.group({
    name:["",[Validators.required]],
    description:["",[Validators.required]],
  });
  constructor(private fb: FormBuilder, private dataService:DataService, private router:Router) { }

  ngOnInit(): void {
  }

  add(){
    if(this.addForm.valid){
      this.dataService.addTodo(this.addForm.value.name, this.addForm.value.description)
      .subscribe((data:any)=>{
        alert(data.message);
        this.router.navigateByUrl('/dashboard')
      })
    }
  }

}