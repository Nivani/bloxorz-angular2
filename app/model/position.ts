

export class Position {
    get x(): number {
        return this._x;
    }

    get z(): number {
        return this._z;
    }

    constructor(private _x: number, private _z: number) {}
    
    public left() {
        return new Position(this._x - 1, this._z);
    }

    public right() {
        return new Position(this._x + 1, this._z);
    }

    public up() {
        return new Position(this._x, this._z - 1);
    }

    public down() {
        return new Position(this._x, this._z + 1);
    }

    public equals(otherPos): boolean {
        return otherPos && this.x === otherPos.x && this.z === otherPos.z;
    }
}