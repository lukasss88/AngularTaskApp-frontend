import { Component, OnInit } from '@angular/core';
import { ModalService } from '../_modal';
import { Task, NewTask } from '../models/task';
import { TaskService } from '../services/task.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.sass']
})
export class TasksListComponent implements OnInit {

  bodyText: string;

  tasks: Task[]
  newTask: Task = new NewTask('','') 
  mode: string


  constructor(
    private modalService: ModalService, 
    private taskService: TaskService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
      this.bodyText = 'This text can be updated in modal 1';

      this.taskService.getTasks()
        .subscribe(
          (tasks: any[]) => {
            console.log(tasks)
            this.tasks = tasks
          },
          err => console.log(err)
      )

  }

  openModal(id: string, mode: string, task?: Task) {
      this.modalService.open(id);
      this.mode = mode;
      this.newTask = new NewTask('','')

      if(mode === 'EDIT' && !!task) {
        // this.task = task;
        this.newTask = new NewTask(task.title, task.description, task._id)
      }
  }

  closeModal(id: string, form: NgForm) {
      form.reset()
      this.modalService.close(id);
  }

  submitForm(form: NgForm) {
    if(!form.valid) {
      this.toastr.error("The form is invalid", "Error", {positionClass: 'toast-bottom-right'})
      return;
    }

    //Add task
    if(this.mode === 'ADD') {
      this.taskService.addTask(this.newTask)
        .subscribe(
          task => {
            this.tasks.push(task)
            console.log("User id: " + task)
            this.toastr.success("Success", "Task is added", {positionClass: 'toast-bottom-right'}),
            this.closeModal('custom-modal-1', form)
            
          },
          err => console.log(err)
        )
    }
      
    //Edit task
    else if(this.mode === 'EDIT') {
      this.taskService.editTask(this.newTask)
        .subscribe(
          editedTask => {
            console.log(JSON.stringify(editedTask))
            let tempTask = this.tasks.find(t => t._id == editedTask._id)
            tempTask._id = editedTask._id
            tempTask.title = editedTask.title;
            tempTask.description = editedTask.description
            this.toastr.success("Success", "The task has been changed", {positionClass: 'toast-bottom-right'})
            this.closeModal('custom-modal-1', form)
          },
          err => console.log("Błąd podczas edycji " + JSON.stringify(err))
        )
    }
    
  }

  removeTask(task: Task) {
    let tempId = task._id
    this.taskService.removeTask(task)
      .subscribe(
        id => {
          this.tasks = this.tasks.filter(t => t._id !== tempId)
          this.toastr.success("Success", "The task has been removed", {positionClass: 'toast-bottom-right'})
        },
        err => console.log(err)
      )
  }

}
