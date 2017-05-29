// tslint:disable:component-selector
// tslint:disable:component-class-suffix

import {Component} from '@angular/core';
import {Subject} from 'rxjs/Rx';
import {ToggleStateService} from '../toggle-state.service';

@Component({
    selector: 'on-push-cd',
    template: `
        <h2>OnPush Change Detection (advanced)</h2>
        <p>
			This demo expands on the change detection of the OnPush example.
			Includes a part that controls completely the change detection by forcing it on that subtree.
			Edit the component 7 file to further experiment on different types of control (OnPush/detach/markForCheck/detectChanges)
		</p>

        <ol class="list">
            <li>Bootstrapped app, performs CD everywhere (reload to check)</li>
			<li>Every five seconds the application make a change detection on the Cmp7 subtree</li>
            <li>Click "Trigger CD" button, skips "Cmp2" subtree</li>
            <li>Click "Cmp12", skips "Cmp2" subtree</li>
            <li>Click "Cmp10", skips "Cmp8" subtree</li>
            <li>Click "Cmp16", performs CD everywhere</li>
        </ol>

        <div>
            <button class="trigger" (click)="null">Trigger Change Detection</button>
        </div>
        <div class="tree">
            <ul>
                <li>
                    <cmp-one></cmp-one>
                </li>
            </ul>
        </div>
        <div style="margin-bottom: 5em; clear: both;"></div>
    `
})
export class OnPushChangeDetectionAdvancedComponent {

    notifier: Subject<any>;

    constructor(private toggleStateService: ToggleStateService) {
    }

    notifyInterval(runInterval) {
        this.notifier.next(runInterval);
    }

}
