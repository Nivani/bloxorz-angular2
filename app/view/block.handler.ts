///<reference path="../../typings/browser/ambient/three/index.d.ts"/>

import {Position} from "../model/position";
import {Block} from "../model/block";
import {viewSettings} from "./view.settings";

export class BlockHandler {
    private model: Block;
    private block1: THREE.Mesh;
    private block2: THREE.Mesh;

    constructor (private scene: THREE.Scene, startPosition: Position) {
        this.model = new Block(startPosition);
        this.block1 = this.initializeBlock();
        this.block2 = this.initializeBlock();
        this.updateBlockPositions();
    }

    private initializeBlock() {
        const geometry = new THREE.BoxGeometry(viewSettings.TILE_SIZE, viewSettings.TILE_SIZE, viewSettings.TILE_SIZE);
        const material = new THREE.MeshPhongMaterial({color: 0xBB6600});
        material.shading = THREE.FlatShading;
        const block = new THREE.Mesh(geometry, material);
        block.position.y = viewSettings.TILE_SIZE / 2.0;
        this.scene.add(block);
        this.scene.add(new THREE.WireframeHelper(block, 0x000000));
        return block;
    };

    private updateBlockPositions() {
        this.updateBlockPosition(this.block1, this.model.pos1);
        this.updateBlockPosition(this.block2, this.model.pos2);
        if (this.model.pos1.equals(this.model.pos2)) {
            this.block2.position.y = viewSettings.TILE_SIZE * 1.5;
        } else {
            this.block2.position.y = viewSettings.TILE_SIZE / 2.0;
        }
    }

    private updateBlockPosition(mesh: THREE.Mesh, position: Position) {
        mesh.position.x = viewSettings.modelXToRealX(position.x);
        mesh.position.z = viewSettings.modelZToRealZ(position.z);
    }

    public left() {
        this.model.left();
        this.updateBlockPositions();
    }

    public right() {
        this.model.right();
        this.updateBlockPositions();
    }

    public up() {
        this.model.up();
        this.updateBlockPositions();
    }

    public down() {
        this.model.down();
        this.updateBlockPositions();
    }
}