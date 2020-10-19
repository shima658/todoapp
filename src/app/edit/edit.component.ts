import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  editForm = this.fb.group({
    name:["",[Validators.required]],
    description:["",[Validators.required]],
  });
  id="";
  constructor(private fb: FormBuilder,
    private route:ActivatedRoute,
    private dataService:DataService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.id = params.id;
      this.dataService.getTodo(params.id)
      .subscribe((data:any)=>{
        this.editForm.setValue({
          name:data.name,
          description:data.description,
        })
      })
    })
  }
  save(){
    if(this.editForm.valid){
      const data = {
        name:this.editForm.value.name, 
        description: this.editForm.value.description
      }
      this.dataService.editTodo(this.id,data)
      .subscribe((data:any)=>{
        alert(data.message);
        this.router.navigateByUrl('/dashboard')
      })
    }
  }
}