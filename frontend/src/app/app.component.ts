import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <!-- Header -->
      <mat-toolbar color="primary" class="app-header">
        <mat-icon>task_alt</mat-icon>
        <span class="app-title">Task Manager</span>
        <span class="spacer"></span>
        <button mat-icon-button (click)="toggleTheme()">
          <mat-icon>{{ isDarkTheme ? 'light_mode' : 'dark_mode' }}</mat-icon>
        </button>
      </mat-toolbar>

      <!-- Main Content -->
      <div class="app-content">
        <router-outlet></router-outlet>
      </div>

      <!-- Footer -->
      <footer class="app-footer">
        <p>&copy; 2025 Task Manager - Example App 2</p>
      </footer>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Task Manager - App2';
  isDarkTheme = false;

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    // Theme toggle logic would go here
  }
}
