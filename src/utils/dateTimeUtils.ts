export function getCalculatedDate(
  calendarValue: string,
  amendType: string,
  amount: number
): string {
  const now: Date = new Date();

  if (calendarValue.toLowerCase() === 'week') {
    if (amendType.toLowerCase().includes('add')) {
      now.setDate(now.getDate() + amount * 7);
    } else {
      now.setDate(now.getDate() - amount * 7);
    }
  } else if (calendarValue.toLowerCase() === 'year') {
    if (amendType.toLowerCase().includes('add')) {
      now.setFullYear(now.getFullYear() + amount);
    } else {
      now.setFullYear(now.getFullYear() - amount);
    }
  } else if (calendarValue.toLowerCase() === 'day') {
    if (amendType.toLowerCase().includes('add')) {
      now.setDate(now.getDate() + amount);
    } else {
      now.setDate(now.getDate() - amount);
    }
    return now.toISOString().slice(0, 10);
  }
  return now.toISOString().slice(0, 10);
}

export function formatDateDDMMYYY(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear());
  return `${day}/${month}/${year}`;
}
export function getDateTimeJiraFormat(myDate: Date): string {
  const year = myDate.getFullYear();
  const month = (myDate.getMonth() + 1).toString().padStart(2, '0');
  const day = myDate.getDate().toString().padStart(2, '0');
  const hours = myDate.getHours().toString().padStart(2, '0');
  const minutes = myDate.getMinutes().toString().padStart(2, '0');
  const seconds = myDate.getSeconds().toString().padStart(2, '0');
  const offset = myDate.getTimezoneOffset();
  const offsetHours = Math.abs(Math.floor(offset / 60)).toString().padStart(2, '0');
  const offsetMinutes = (offset % 60).toString().padStart(2, '0');
  const offsetSign = offset > 0 ? '-' : '+';
  const dateString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${offsetSign}${offsetHours}:${offsetMinutes}`;
  return dateString;
}