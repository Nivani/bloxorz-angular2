

export class Position {
    get x(): number {
        return this._x;
    }

    get z(): number {
        return this._z;
    }

    constructor(private _x: number, private _z: number) {}
    
    public left() {
        return new Position(this._x, this._z - 1);
    };

    public right() {
        return new Position(this._x, this._z + 1);
    };

    public up() {
        return new Position(this._x + 1, this._z);
    };

    public down() {
        return new Position(this._x - 1, this._z);
    };
}