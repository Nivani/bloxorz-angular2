///<reference path="../../typings/browser/ambient/three/index.d.ts"/>

import {viewSettings} from "./view.settings";

export class LevelTilesHandler {
    constructor (private scene: THREE.Scene) {
        for (let x = 0; x < 5; x++) {
            for (let z = 0; z < 5; z++) {
                const tileResult = this.createTile(x, z);
                this.scene.add(tileResult.tile);
                this.scene.add(tileResult.helper);
            }
        }
    }

    private createTile(x: number, z: number) {
        const geometry = new THREE.BoxGeometry(viewSettings.TILE_SIZE, viewSettings.TILE_HEIGHT, viewSettings.TILE_SIZE);
        const material = new THREE.MeshPhongMaterial();
        material.shading = THREE.FlatShading;
        const tile = new THREE.Mesh(geometry, material);
        tile.position.set(viewSettings.modelXToRealX(x), -viewSettings.TILE_HEIGHT, viewSettings.modelZToRealZ(z));

        return {
            tile: tile,
            helper: new THREE.WireframeHelper(tile, 0x000000)
        };
    };
}