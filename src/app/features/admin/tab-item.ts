import { Type } from '@angular/core';

interface TabData {
    id          : String;
    label       : String;
    index       : Number;
}

export class TabItem {

    constructor(
        public component: Type<any>, 
        public data: TabData,
        public active: boolean
    ) {}
}