import { Injectable, Pipe, PipeTransform } from '@angular/core';
@Injectable({
  providedIn: 'root'
})

@Pipe({
  name: 'parsedate',
  standalone: true
})
export class ParsedatePipe implements PipeTransform {

  transform(value: string | null): Date | null {
    if (!value) return null;

    // Define possible date formats
    const formats = [
      'dd/MM/yyyy',
      'dd/MMM/yyyy',
      'dd-MMM-yyyy',
      'MMM/dd/yyyy',
      'yyyy-MM-dd',
      'MM/dd/yyyy',
      'MMMM dd, yyyy'
    ];

    // Try to parse the date using each format
    for (const format of formats) {
      const parsedDate = this.parseDate(value, format);
      if (parsedDate) return parsedDate;
    }

    // If no format matched, return null
    return null;
  }

  private parseDate(value: string, format: string): Date | null {
    // Remove extra spaces
    value = value.trim();

    // Split the date components based on format
    const formatParts = format.split(/[-/ ,]/);
    const dateParts = value.split(/[-/ ,]/);

    if (formatParts.length !== dateParts.length) return null;

    const dayIndex = formatParts.indexOf('dd');
    const monthIndex = formatParts.indexOf('MM') !== -1 ? formatParts.indexOf('MM') : formatParts.indexOf('MMM') !== -1 ? formatParts.indexOf('MMM') : -1;
    const yearIndex = formatParts.indexOf('yyyy');

    const day = dayIndex !== -1 ? +dateParts[dayIndex] : null;
    const month = monthIndex !== -1 ? this.getMonthIndex(dateParts[monthIndex]) : null;
    const year = yearIndex !== -1 ? +dateParts[yearIndex] : null;

    if (day === null || month === null || year === null) return null;

    return new Date(year, month, day);
  }

  private getMonthIndex(monthString: string): number {
    const monthNames = [
      'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
      'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
    ];
    const monthIndex = monthNames.indexOf(monthString.toUpperCase());
    return monthIndex !== -1 ? monthIndex : +monthString - 1; // Numeric month (1-12)
  }

}
