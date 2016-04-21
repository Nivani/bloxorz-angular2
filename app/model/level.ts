import {Position} from "./position";

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

    private _startPosition: Position;
    get startPosition(): Position {
        return this._startPosition;
    }

    private _endPosition: Position;
    get endPosition(): Position {
        return this._endPosition;
    }

    constructor (private _tiles: String[]) {
        this._height = _tiles.length;

        for (let z = 0; z < _tiles.length; z++) {
            if (_tiles[z].length > this._width) {
                this._width = _tiles[z].length;
            }

            for (let x = 0; x < _tiles[z].length; x++) {
                switch (_tiles[z][x]) {
                    case "S":
                        this._startPosition = new Position(x, z);
                        break;
                    case "O":
                        this._endPosition = new Position(x, z);
                        break;
                }
            }
        }
        
        if (!this.startPosition) {
            throw "Invalid level, could not find startPosition.";
        }
        if (!this.endPosition) {
            throw "Invalid level, could not find endPosition.";
        }
    }

    public hasPosition(position: Position): boolean {
        if (position.z < this._tiles.length && position.x < this._tiles[position.z].length) {
            return ["S", "t", "O"].indexOf(this._tiles[position.z][position.x]) > -1;
        }

        return false;
    }
}
