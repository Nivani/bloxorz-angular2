
export class Level {
    get tiles(): String[] {
        return this._tiles;
    }

    private _width = 0;
    get width(): number {
        return this._width;
    }

    private _height = 0;
    get height(): number {
        return this._height;
    }

    constructor (private _tiles: String[]) {
        this._height = _tiles.length;

        for (let z = 0; z < _tiles.length; z++) {
            if (_tiles[z].length > this._width) {
                this._width = _tiles[z].length;
            }
        }
    }
}
