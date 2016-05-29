import {Block} from "./block";
import {Level} from "./level";
import {ReadOnlyBlock} from "./block";

export class Bloxorz {
    private _block : Block;
    get block(): ReadOnlyBlock {
        return this._block;
    }

    get level(): Level {
        return this._level;
    }

    private _isWon = false;
    get isWon(): boolean {
        return this._isWon;
    }

    private _isLost = false;
    get isLost(): boolean {
        return this._isLost;
    }

    get isOver(): boolean {
        return this.isWon || this.isLost;
    }

    constructor(private _level: Level) {
        this._block = new Block(this._level.startPosition);
    }

    public left() {
        if (!this.isOver) {
            this._block.left();
            this.checkIfGameOver();
        }
    }

    public right() {
        if (!this.isOver) {
            this._block.right();
            this.checkIfGameOver();
        }
    }

    public up() {
        if (!this.isOver) {
            this._block.up();
            this.checkIfGameOver();
        }
    }

    public down() {
        if (!this.isOver) {
            this._block.down();
            this.checkIfGameOver();
        }
    }

    private checkIfGameOver(): void {
        if (!this.checkLoss()) {
            this.checkVictory();
        }
    }

    private checkLoss(): boolean {
        if (!this._level.hasPosition(this._block.pos1) || !this._level.hasPosition(this._block.pos2)) {
            this._isLost = true;
        }
        return this.isLost;
    }

    private checkVictory(): boolean {
        if (this._block.pos1.equals(this._level.endPosition) && this._block.pos2.equals(this._level.endPosition)) {
            this._isWon = true;
        }
        return this.isWon;
    }
}