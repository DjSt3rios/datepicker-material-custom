import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {DatepickerHeaderComponent} from './datepicker-header/datepicker-header.component';
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';
import {FormsModule} from '@angular/forms';

export const MOMENT_DATE_FORMATS = {
  parse: {
    dateInput: 'dddd, MMM DD',
  },
  display: {
    dateInput: 'dddd, MMM DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [provideMomentDateAdapter(MOMENT_DATE_FORMATS)],
  imports: [RouterOutlet, MatFormFieldModule, MatInputModule, MatDatepickerModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'untitled';
  datepickerHeader = DatepickerHeaderComponent;
  date = new Date();
}
