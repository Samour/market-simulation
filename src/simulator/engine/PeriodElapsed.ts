export interface IPeriodElapsed {
  hasPeriodElapsed(date: Date): boolean;
}

abstract class CachingPeriodElapsedCalculator implements IPeriodElapsed {

  private nextDate: Date | null = null;

  protected abstract calculateFirstDate(baseDate: Date): Date;

  protected abstract calculateNextDate(): Date;

  protected getNextDate(): Date {
    if (!this.nextDate) {
      throw new Error('No prior value of nextDate');
    }

    return this.nextDate;
  }

  hasPeriodElapsed(date: Date): boolean {
    if (!this.nextDate) {
      this.nextDate = this.calculateFirstDate(date);
    }

    if (date >= this.nextDate) {
      this.nextDate = this.calculateNextDate();
      return true;
    } else {
      return false;
    }
  }
}

export class FixedNoOfDaysPeriodCalculator extends CachingPeriodElapsedCalculator {

  constructor(private readonly periodLengthDays: number) {
    super();
  }

  protected calculateFirstDate(baseDate: Date): Date {
    return baseDate;
  }

  protected calculateNextDate(): Date {
    const date = new Date(this.getNextDate());
    date.setDate(date.getDate() + this.periodLengthDays);

    return date;
  }
}

export class EndOfMonthPeriodCalculator extends CachingPeriodElapsedCalculator {

  constructor(private readonly periodLengthMonths: number) {
    super();
  }

  private incrementMonths(baseDate: Date, months: number): Date {
    const date = new Date(baseDate);
    date.setDate(1);
    date.setMonth(date.getMonth() + 1 + months);
    date.setDate(0);

    return date;
  }

  protected calculateFirstDate(baseDate: Date): Date {
    return this.incrementMonths(baseDate, 0);
  }

  protected calculateNextDate(): Date {
    return this.incrementMonths(this.getNextDate(), this.periodLengthMonths);
  }
}
