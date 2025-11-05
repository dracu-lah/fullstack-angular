import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>MySQL Status: {{ status }}</h1>
    <p>{{ message }}</p>
  `,
})
export class AppComponent implements OnInit {
  status = 'Checking...';
  message = '';

  ngOnInit() {
    this.checkMySQLStatus();
  }

  async checkMySQLStatus() {
    try {
      const response = await fetch('http://localhost:3000/api/health');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      this.status = 'Connected';
      this.message = data.message;
    } catch (error) {
      this.status = 'Disconnected';
      this.message = error instanceof Error ? error.message : 'Unknown error occurred';
    }
  }
}
