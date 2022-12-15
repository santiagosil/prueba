import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User, userEmpty } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  urlApi:string='https://jsonplaceholder.typicode.com/users';

  private addNewUser$:Subject<User> = new Subject();
  private editUser$:BehaviorSubject<User> = new BehaviorSubject(userEmpty);
  private editUserComplete$:Subject<User> = new Subject();

  constructor(private http:HttpClient) { }

  //Comunicación entre componentes usando observadores
  getAddNewUser():Observable<User> {
    return this.addNewUser$.asObservable();
  }

  setAddNewUser(newUser:User){
    this.addNewUser$.next(newUser);
  }

  geteditUser(){
    return this.editUser$.asObservable();
  }

  seteditUser(Updateuser:User){
    this.editUser$.next(Updateuser);
  }

  geteditUserComplete(){
    return this.editUserComplete$.asObservable();
  }

  seteditUserComplete(Updateuser:User){
    this.editUserComplete$.next(Updateuser);
  }


  //Http Request Methods
  getAllUsers():Observable<User[]>{
    return this.http.get<User[]>(this.urlApi);
  }

  addUser(user:User):Observable<User>{
    return this.http.post<User>(this.urlApi,user);
  }

  updateUser(id:number,user:User):Observable<User>{
    return this.http.put<User>(`${this.urlApi}/${id}`,user);
  }

  deleteUser(id:number):Observable<any>{
    return this.http.delete(`${this.urlApi}/${id}`);
  }

}
