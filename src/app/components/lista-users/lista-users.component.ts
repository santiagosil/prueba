import { Component, OnDestroy, OnInit } from '@angular/core';
import { User, userEmpty } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { faTrash, faSquarePen, faAdd } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista-users',
  templateUrl: './lista-users.component.html',
  styleUrls: ['./lista-users.component.css']
})
export class ListaUsersComponent implements OnInit, OnDestroy {
  //Icons
  faTrash=faTrash;
  faSquarePen=faSquarePen;
  faAdd=faAdd;

  //subscriptions
  subcritpionAddNewUser!:Subscription;
  subcritpionUpdateUserComplete!:Subscription;
  
  listUsers: User[]=[];


  
  constructor(private api:UserService){}

  updateUser(user: User):void{
    this.api.seteditUser(user);
  }

  deleteUser(index:number):void{
    this.api.deleteUser(index).subscribe(res=>{
      this.listUsers.splice(index, 1);
    });
  }

  addUser():void{
    this.api.seteditUser(userEmpty);
  }
  
  ngOnInit(){
    this.api.getAllUsers().subscribe(users=>{
      this.listUsers=users;
    });
    this.subcritpionAddNewUser=this.api.getAddNewUser().subscribe(res=>{
      console.log('entre',res);
      if(res){
        this.listUsers.push(res);
      }
    });
    this.subcritpionUpdateUserComplete=this.api.geteditUserComplete().subscribe(res=>{
      const index=this.listUsers.findIndex(user=>user.id===res.id);
      this.listUsers[index]=res;
    });
  }

  ngOnDestroy(): void {
    this.subcritpionAddNewUser.unsubscribe();
    this.subcritpionUpdateUserComplete.unsubscribe();
  }

}
