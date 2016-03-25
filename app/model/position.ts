

export class Position {
    get x(): number {
        return this._x;
    }

    get z(): number {
        return this._z;
    }

    constructor(private _x: number, private _z: number) {}
    
    public left() {
        this._z--;
    };

    public right() {
        this._z++;
    };

    public up() {
        this._x++;
    };

    public down() {
        this._x--;
    };
}