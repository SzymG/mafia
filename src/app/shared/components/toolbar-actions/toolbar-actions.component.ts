import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';

export interface ToolbarActionsConfig {
    text: string,
    handler: void
}

@Component({
    selector: 'toolbar-actions',
    templateUrl: './toolbar-actions.component.html',
    styleUrls: ['./toolbar-actions.component.scss'],
})
export class ToolbarActionsComponent implements OnInit {

    @HostListener('document:click', ['$event']) click(event) {
        if (this.icon.nativeElement.contains(event.target)) {
            this.actions.nativeElement.classList.toggle('visible');
        } else {
            this.actions.nativeElement.classList.remove('visible');
        }
    }

    @ViewChild('icon') icon!: ElementRef;
    @ViewChild('actions') actions!: ElementRef;

    @Input() config: ToolbarActionsConfig[];

    constructor() { }

    ngOnInit() {
    }
}
