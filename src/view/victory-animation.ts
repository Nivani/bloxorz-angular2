export class VictoryAnimation {
    private ANIMATION_TIME = 300;
    private ANIMATION_DISTANCE = 150;
    private startPosition1: number;
    private startPosition2: number;
    private startTime: number;

    constructor(private block1: THREE.Mesh, private block2: THREE.Mesh, private renderCallback: Function) {
        this.startPosition1 = block1.position.y;
        this.startPosition2 = block2.position.y;
        this.nextFrame();
    }

    private nextFrame() {
        requestAnimationFrame(ts => this.render(ts));
    }

    private render(currentTime) {
        if (!this.startTime) {
            this.startTime = currentTime;
            this.nextFrame();
        } else {
            const elapsedTime = currentTime - this.startTime;
            if (elapsedTime < this.ANIMATION_TIME) {
                const distance = (this.ANIMATION_DISTANCE * (elapsedTime / this.ANIMATION_TIME));
                this.block1.position.y = this.startPosition1 - distance;
                this.block2.position.y = this.startPosition2 - distance;
                this.nextFrame();
            } else {
                this.block1.position.y = this.startPosition1 - this.ANIMATION_DISTANCE;
                this.block2.position.y = this.startPosition2 - this.ANIMATION_DISTANCE;
            }
        }
        this.renderCallback();
    }
}