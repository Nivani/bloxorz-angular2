export class SwipeInput {
    private MIN_SWIPE_DISTANCE = 50;

    private startX: number;
    private startY: number;

    constructor(private left: Function, private right: Function, private up: Function, private down: Function) {
        if (this.isTouchDevice()) {
            this.initializeWithTouch();
        } else {
            this.initializeWithMouse();
        }
    }

    private isTouchDevice() {
        try {
            document.createEvent("TouchEvent");
            return true;
        } catch (e) {
            return false;
        }
    }

    private initializeWithTouch() {
        document.documentElement.ontouchstart = (event: TouchEvent) => {
            this.startX = event.changedTouches[0].screenX;
            this.startY = event.changedTouches[0].screenY;
        };
        document.documentElement.ontouchmove = (event: TouchEvent) => event.preventDefault();
        document.documentElement.ontouchend = (event: TouchEvent) => this.handleSwipe(this.startX, this.startY, event.changedTouches[0].screenX, event.changedTouches[0].screenY);
    };

    private initializeWithMouse() {
        document.documentElement.onmousedown = (event:MouseEvent) => {
            this.startX = event.screenX;
            this.startY = event.screenY;
        };
        document.documentElement.onmouseup = (event:MouseEvent) => this.handleSwipe(this.startX, this.startY, event.screenX, event.screenY);
    };

    private handleSwipe(startX, startY, endX, endY) {
        const xDiff = endX - startX;
        const yDiff = endY - startY;
        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (Math.abs(xDiff) > this.MIN_SWIPE_DISTANCE) {
                xDiff < 0 ? this.left() : this.right();
            }
        } else {
            if (Math.abs(yDiff) > this.MIN_SWIPE_DISTANCE) {
                yDiff < 0 ? this.up() : this.down();
            }
        }
    }
}