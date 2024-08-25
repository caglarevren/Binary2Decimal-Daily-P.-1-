import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    ReactiveFormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  binaryForm: FormGroup;
  decimalResult: number | null = null;
  today: Date = new Date();

  constructor(private fb: FormBuilder) {
    this.binaryForm = this.fb.group({
      binaryInput: [
        '',
        [
          Validators.required,
          Validators.maxLength(8),
          Validators.pattern('^[01]+$'),
        ],
      ],
    });
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.value.length > 8) {
      input.value = input.value.slice(0, 8);
      this.binaryForm.get('binaryInput')?.setValue(input.value);
    }

    if (input.value.match(/[^01]/)) {
      input.value = input.value.replace(/[^01]/g, '');
      this.binaryForm.get('binaryInput')?.setValue(input.value);
    }
  }

  onSubmit(): void {
    if (this.binaryForm.valid) {
      const binaryValue = this.binaryForm.get('binaryInput')?.value;
      this.decimalResult = parseInt(binaryValue, 2);
    } else {
      this.decimalResult = null;
    }
  }
}
