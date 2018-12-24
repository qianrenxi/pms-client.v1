import { Injectable } from '@angular/core';
import { GridItemComponent } from './grid-item/grid-item.component';

@Injectable()
export class GridLayoutService {

    items: GridItemComponent[] = [];

    constructor() { }

    registItem(item: GridItemComponent) {
        if (!this.items) {
            this.items = [];
        }
        this.items.push(item);
    }

    unregistItem(item) {
        const items = this.items;
        if (!items || items.length === 0) {
            return;
        }
        const index = items.indexOf(item);
        items.splice(index, 1);
    }

    getSiblings(item): GridItemComponent[] {
        const items = this.items;
        if (!items || items.length === 0) {
            return;
        }

        return items.filter(it => it !== item);
    }
}