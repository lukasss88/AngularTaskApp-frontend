import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private _http: HttpClient,
  ) { }

  taskUrl = 'http://localhost:3000/api'  

  addTask(task: Task): Observable<Task> {
    return this._http.post<Task>(`${this.taskUrl}/add`, task)
  }

  editTask(task: Task): Observable<Task> {
    return this._http.post<Task>(`${this.taskUrl}/edit`, task)
  }

  getTasks() {
    return this._http.get(`${this.taskUrl}/getTasks`)
  }

  removeTask(task: Task) {
    return this._http.post<string>(`${this.taskUrl}/remove`, task)
  }

}
