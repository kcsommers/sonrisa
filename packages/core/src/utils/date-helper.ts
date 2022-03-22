export const DateHelper = {
  MONTHS_ABREVIATED: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],

  DAYS_ABREVIATED: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],

  getDateString(date: Date): string {
    const dateModel = new Date(date);
    const day = dateModel.getDay();
    const month = dateModel.getMonth();
    const dateNum = dateModel.getDate();
    const year = dateModel.getFullYear();
    return `${this.DAYS_ABREVIATED[day]} ${this.MONTHS_ABREVIATED[month]} ${dateNum}, ${year}`;
  },

  getTimeString(date: Date): string {
    const dateModel = new Date(date);
    let hour = dateModel.getHours();
    const mins = dateModel.getMinutes();
    let amPm = 'AM';
    if (hour > 12) {
      hour -= 12;
      amPm = 'PM';
    }
    return `${hour}:${mins < 10 ? `0${mins}` : mins} ${amPm}`;
  },
};
