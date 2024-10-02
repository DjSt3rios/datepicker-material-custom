import {ChangeDetectorRef, Component, inject, OnDestroy, signal} from '@angular/core';
import {MatCalendar, MatCalendarHeader, MatDatepickerIntl} from '@angular/material/datepicker';
import {DateAdapter, MAT_DATE_FORMATS, MatDateFormats} from '@angular/material/core';
import {startWith, Subject, takeUntil} from 'rxjs';
import {TitleCasePipe} from '@angular/common';
import {MOMENT_DATE_FORMATS} from '../app.component';
import {MatButton, MatIconButton} from '@angular/material/button';



@Component({
  selector: 'app-datepicker-header',
  standalone: true,
  imports: [
    TitleCasePipe,
    MatButton,
    MatIconButton
  ],
  templateUrl: './datepicker-header.component.html',
  styleUrl: './datepicker-header.component.scss'
})
// @ts-ignore
export class DatepickerHeaderComponent<D> extends MatCalendarHeader<D> implements OnDestroy {
  // private _calendar = inject<MatCalendar<D>>(MatCalendar);
  //  _dateAdapter = inject<DateAdapter<D>>(DateAdapter);

  // override _intl = inject(MatDatepickerIntl);
  // override calendar = inject<MatCalendar<D>>(MatCalendar);
  // private override _dateAdapter: DateAdapter<D> = inject<DateAdapter<D>>(DateAdapter, {optional: true})!;
  // override _dateFormats = inject<MatDateFormats>(MAT_DATE_FORMATS, {optional: true})!;
  private override _dateAdapter: DateAdapter<D> = inject<DateAdapter<D>>(DateAdapter, {optional: true})!;

  //

  private _destroyed = new Subject<void>();

  readonly periodLabel = signal('');

  constructor() {
    super(inject(MatDatepickerIntl), inject<MatCalendar<D>>(MatCalendar), inject<DateAdapter<D>>(DateAdapter), inject<MatDateFormats>(MAT_DATE_FORMATS), inject(ChangeDetectorRef));
    this.calendar.stateChanges.pipe(startWith(null), takeUntil(this._destroyed)).subscribe(() => {
      this.periodLabel.set(
        this._dateAdapter
          .format(this.calendar.activeDate, 'dddd, MMM DD')
          .toLocaleUpperCase(),
      );
    });
  }


  // constructor() {
  //   this._calendar.stateChanges.pipe(startWith(null), takeUntil(this._destroyed)).subscribe(() => {
  //     this.periodLabel.set(
  //       this._dateAdapter
  //         .format(this._calendar.activeDate, 'dddd, MMM DD')
  //         .toLocaleUpperCase(),
  //     );
  //   });
  // }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
