import { CommonModule, CurrencyPipe, DatePipe, DecimalPipe, LowerCasePipe, PercentPipe, UpperCasePipe } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import { Component, HostListener, Inject, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { API_URL, APP_CONFIG, AppConfig } from 'src/app/core/configurations/constants';
import { ParsedatePipe } from 'src/app/core/pipes/parsedate.pipe';
import { SharedModule } from 'src/app/core/shared/shared.module';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: 'API_URLbystringbased', useValue: 'https://api.example.com' }],
  standalone: true, // This marks it as a standalone component
  imports: [FormsModule,CommonModule,RouterModule,ParsedatePipe,DatePipe, CurrencyPipe, UpperCasePipe, LowerCasePipe, DecimalPipe, PercentPipe] 
})
export class TestComponent {
  
  amount = 1234.5678;
  uppercasetest  = "uppercasetest";
  lowercasetest = "UPPERCASETEST";
  formattedAmount: string | null;
  decimalnumbertest :string|null= "2346895.369852";
  percentnumbertest : string | null = "0.35693";
  jsonstringfromobject = "";
  constructor(private datePipe: DatePipe, 
    private parseDatePipe: ParsedatePipe,
    private currencyPipe: CurrencyPipe,
    private uppercasepipe : UpperCasePipe,
    private lowercasepipe : LowerCasePipe,
    private decimalpipe : DecimalPipe,
    private percentagepipe : PercentPipe,
    @Inject('API_URLbystringbased') private apiUrlbystringbased: string,
    @Inject(API_URL) private apiUrlbyinjection: string,
    @Inject(APP_CONFIG) private config: AppConfig
  ) 
    {
        console.log("This Normal Loaded Module");
        this.formattedAmount = this.currencyPipe.transform(this.amount, 'USD', 'symbol', '1.2-2');
        this.uppercasetest = this.uppercasepipe.transform(this.uppercasetest);
        this.lowercasetest = this.lowercasepipe.transform(this.lowercasetest);
        this.decimalnumbertest = this.decimalpipe.transform(this.decimalnumbertest,'1.2-3');
        this.percentnumbertest = this.percentagepipe.transform(this.percentnumbertest,'1.2-3');
        this.jsonstringfromobject = JSON.stringify(this.myObject,null,'\t');
        //this.jsonstringfromobject = JSON.stringify(this.myObject,null,1);
    }


  ngOnInit(): void {
    console.log('TestComponent ngOnInit called');
  }

  ngOnDestroy(): void {
    console.log('TestComponent ngOnDestroy called');
  }
  //stringinterpolation
  gettext = "hiiiii";
  changecolorget = true;
  changecolor = "text-danger";

  inputvalue = 89;

  count = 0;
  increment = () =>{
    this.count++;
  }
  applycolor="green";
  myname = "";
  displayurname = (e:any)=>{
      this.myname = e.target.value;
  }
  name = "";

  visible = true;
  leters = ['a','b','c','d','e','f','g','h','i'];

  fruits = ['apple','banana','goa','lemon','grapes','orange','pineapple','promogranate'];
  //fruits = [];
  firstvalue = 0;
  secondvalue = 0;

  operation = ['select','+','-','*','/'];
  selectedvalue = "select";

  isActive: boolean = true;
isDisabled: boolean = true;
currentClass = 'class1 class2';

isPrimary: boolean = true;

// Toggle the value of isPrimary to switch classes
toggleButtonStyle() {
  this.isPrimary = !this.isPrimary;
}

testdateinhtml : string = "24/05/2024";
testdateints : string | null;
gettestdateints : string | null;

getformatteddatestring=(e:any)=>{
    // Convert the date string to a Date object using the custom pipe
    const parsedDate = this.parseDatePipe.transform(this.testdateints);

    // Format the Date object to a string using DatePipe
    if (parsedDate) {
      this.gettestdateints = this.datePipe.transform(parsedDate, 'fullDate');
    } else {
      this.gettestdateints = 'Invalid date';
    }
}

myObject = {
  name: 'Angular',
  version: 10,
  features: ['components', 'services', 'directives']
};

@HostListener('click', ['$event'])
handleClick(event: MouseEvent) {
  console.log('Element clicked:', event);
}

// Using alias for KeyboardEvent
@HostListener('keydown', ['$event'])
handleKeydown(event: KeyboardEvent) {
  console.log('Key pressed:', event.key);
}

// String-based Tokens
getstringbasedtoken = this.apiUrlbystringbased;

//Injectiontoken
getinjectionbasedtoken = this.apiUrlbyinjection;

//Injectiontoken In Object format
getinjectionbasedtokeninobject = this.config;
}
