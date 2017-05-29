// tslint:disable:component-selector
// tslint:disable:component-class-suffix

import {AfterViewChecked, Component, ElementRef, NgZone, ChangeDetectorRef, ChangeDetectionStrategy} from '@angular/core';
import {toggleClass} from '../../toggle-class.service';

@Component({
    selector: 'cmp-seven',
    template: `
        <a class="timer">Cmp7 [Counter: {{i}}]</a>

        <ul>
            <li>
                <cmp-fourteen></cmp-fourteen>
            </li>
            <li>
                <cmp-fiveteen></cmp-fiveteen>
            </li>
        </ul>
    `,
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentSeven implements AfterViewChecked {
	private i = 0;

    constructor(
		private zone: NgZone,
		private el: ElementRef,
		private ref: ChangeDetectorRef) {
			
		// Play with this:
		const useOutSideAngular = true;
			
		// Play with this as well: Detach the change detection for ultimate control
		//this.ref.detach();
		
		this.zone.runOutsideAngular(() => {
			// Everything here will only invoke the subtree with 
			// document.addEventListener('mousemove', this.onMouseMovedEvent.bind(this));
			
			if (useOutSideAngular) {
				setInterval(() => {
					console.log(`I: ${this.i}`)
					++this.i;
					toggleClass(this.el, this.zone);
					this.ref.markForCheck();
					this.ref.detectChanges();
				}, 5000);
			}
		});
		
		if (!useOutSideAngular) {
		// This will invoke all the tree parents and then each child from top to bottom
			setInterval(() => {
				console.log(`I: ${this.i}`)
				++this.i;
				toggleClass(this.el, this.zone);
				this.ref.markForCheck();
				this.ref.detectChanges();
			}, 5000);
		}
    }
	
	ngInit() {
		// We need this if we detach the ChangeDetectorRef to initialize it properly
		this.zone.runOutsideAngular(() => {
			this.ref.markForCheck();
			this.ref.detectChanges();
		});
	}

    ngAfterViewChecked() {
        toggleClass(this.el, this.zone);
    }

	private onMouseMovedEvent(event): void {
		// Just a global event - when done we want to still use the change-detection
		this.i += 5;
		toggleClass(this.el, this.zone);
		this.ref.markForCheck();
        this.ref.detectChanges();
    }
}
