import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'safeJson',
  standalone: true
})
export class SafeJsonPipe implements PipeTransform {
  transform(value: any): string {
    return JSON.stringify(value, this.getCircularReplacer(), 2);
  }

  private getCircularReplacer() {
    const seen = new WeakSet();
    return (key: string, val: any) => {
      if (typeof val === "object" && val !== null) {
        if (seen.has(val)) {
          return "[Circular]";
        }
        seen.add(val);
      }
      return val;
    };
  }
}
