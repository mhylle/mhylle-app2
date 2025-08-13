import { Component } from '@angular/core';

@Component({
  selector: 'app-task-form',
  template: `
    <div class="task-form-container">
      <h1>Task Form</h1>
      <p>Task form functionality would be implemented here.</p>
      <button mat-raised-button color="primary" routerLink="/tasks">
        <mat-icon>arrow_back</mat-icon>
        Back to Tasks
      </button>
    </div>
  `,
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {}
