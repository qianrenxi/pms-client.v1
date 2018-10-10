/**
 * DragEvent
 * type: "drag" | "dragend" | "dragenter" | "dragexit" | "dragleave" | "dragover" | "dragstart" | "drop"
 */

export enum DragEventType {
    dragStart = "dragStart",
    dragMove = "dragMove",
    dragEnd = "dragEnd",

}

export interface DragStartEvent {
    type: DragEventType;
    source: any;
}

export interface DragMoveEvent {
    type: DragEventType;
    source: any;
    pointerPosition: {x: number, y: number};
    event: MouseEvent | TouchEvent;
    // delta: {x: -1 | 0 | 1, y: -1 | 0 | 1};
}

export interface DragEndEvent {
    type: DragEventType;
    source: any;
}

export type ApDragEvent = DragStartEvent | DragMoveEvent | DragEndEvent;
