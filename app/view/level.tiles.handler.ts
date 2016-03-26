///<reference path="../../typings/browser/ambient/three/index.d.ts"/>

import {Position} from "../model/Position";
import {viewSettings} from "./view.settings";

export class LevelTilesHandler {
    private _startPosition: Position;
    public get startPosition() {
        return this._startPosition;
    }

    constructor (scene: THREE.Scene, level: String[]) {
        for (let z = 0; z < level.length; z++) {
            for (let x = 0; x < level[z].length; x++) {
                const char = level[z][x];
                switch (char) {
                    case 't':
                        this.addTileToScene(x, z, scene);
                        break;
                    case 'S':
                        this.addTileToScene(x, z, scene);
                        this._startPosition = new Position(x, z);
                        break;
                }
            }
        }
    }

    private addTileToScene(x: number, z: number, scene: THREE.Scene) {
        const geometry = new THREE.BoxGeometry(viewSettings.TILE_SIZE, viewSettings.TILE_HEIGHT, viewSettings.TILE_SIZE);
        const material = new THREE.MeshPhongMaterial();
        material.shading = THREE.FlatShading;
        const tile = new THREE.Mesh(geometry, material);
        tile.position.set(viewSettings.modelXToRealX(x), -viewSettings.TILE_HEIGHT, viewSettings.modelZToRealZ(z));

        scene.add(tile);
        scene.add(new THREE.WireframeHelper(tile, 0x000000));
    };
}