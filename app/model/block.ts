import {Position} from "./position"

export class Block {
    private _pos1: Position;
    get pos1(): Position {
        return this._pos1;
    }

    private _pos2: Position;
    get pos2(): Position {
        return this._pos2;
    }

    constructor(startPosition: Position) {
        this._pos1 = startPosition;
        this._pos2 = startPosition;
    }

    public left() {
        if (this.pos1.equals(this.pos2)) {
            this._pos1 = this.pos1.left();
            this._pos2 = this.pos2.left().left();
        } else if (this.pos1.x === this.pos2.x) {
            this._pos1 = this.pos1.left().left();
            this._pos2 = this.pos2.left();
        } else {
            this._pos1 = this.pos1.left();
            this._pos2 = this.pos2.left();
        }
    };

    public right() {
        if (this.pos1.equals(this.pos2)) {
            this._pos1 = this.pos1.right().right();
            this._pos2 = this.pos2.right();
        } else if (this.pos1.x === this.pos2.x) {
            this._pos1 = this.pos1.right();
            this._pos2 = this.pos2.right().right();
        } else {
            this._pos1 = this.pos1.right();
            this._pos2 = this.pos2.right();
        }
    };

    public up() {
        if (this.pos1.equals(this.pos2)) {
            this._pos1 = this.pos1.up().up();
            this._pos2 = this.pos2.up();
        } else if (this.pos1.z === this.pos2.z) {
            this._pos1 = this.pos1.up();
            this._pos2 = this.pos2.up().up();
        } else {
            this._pos1 = this.pos1.up();
            this._pos2 = this.pos2.up();
        }
    };

    public down() {
        if (this.pos1.equals(this.pos2)) {
            this._pos1 = this.pos1.down();
            this._pos2 = this.pos2.down().down();
        } else if (this.pos1.z === this.pos2.z) {
            this._pos1 = this.pos1.down().down();
            this._pos2 = this.pos2.down();
        } else {
            this._pos1 = this.pos1.down();
            this._pos2 = this.pos2.down();
        }
    };
}