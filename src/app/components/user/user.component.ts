import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

import { faPen, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  //icons
  faPen=faPen;
  faPlus=faPlus;
  
  //Subscripciones
  subscriptionEditUser!:Subscription;
  
  userForm: FormGroup;
  id!:number;

  initForm(): FormGroup {
    return this.fb.group({
      name: [''],
      username: [''],
      email: [''],
      phone: ['']
    });
  }

  constructor(
    private fb: FormBuilder,
    private api: UserService
  ) {
    this.userForm = this.initForm();
  }

  ngOnInit(): void {
    this.subscriptionEditUser=this.api.geteditUser().subscribe(res=>{
      const user: User = res;
      const {id,...auxResponse} = user; 
      this.id=res.id;
      if(id>0){
        this.userForm.setValue({
          name:auxResponse.name,
          username:auxResponse.username,
          email:auxResponse.email,
          phone:auxResponse.phone
        });
      }else{
        this.userForm.reset();
      }
    });
  }

  addUser(): void {
    const user: User = this.userForm.value;
    this.api.addUser(user).subscribe(res => {
      this.api.setAddNewUser(res);
      alert('User added successfully');
    });
    this.userForm.reset();
  }

  updateUser(): void {
    const user: User = this.userForm.value;
    this.api.updateUser(this.id, user).subscribe(res => {
      this.api.seteditUserComplete(res);
      alert('Updated');
    });
  }

  ngOnDestroy() {
    this.subscriptionEditUser.unsubscribe();
  }
}
