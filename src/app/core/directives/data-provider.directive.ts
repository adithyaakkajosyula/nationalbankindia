import { Directive, Input } from "@angular/core";

@Directive({
  selector: '[dataProvider]'
})
export class DataProviderDirective {
  @Input('dataProvider') data: any;
}