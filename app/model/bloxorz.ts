import {Injectable} from "angular2/core";

@Injectable()
export class Bloxorz {
    private _x = 2;
    get x(): number {
        return this._x;
    }

    private _z = 2;
    get z(): number {
        return this._z;
    }
    
    public left = function () {
        this._z--;
    };

    public right = function () {
        this._z++;
    };

    public up = function () {
        this._x++;
    };

    public down = function () {
        this._x--;
    };
}