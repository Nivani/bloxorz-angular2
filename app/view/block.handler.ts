///<reference path="../../typings/browser/ambient/three/index.d.ts"/>
import {Position} from "../model/position";
import {viewSettings} from "./view.settings";
import {Bloxorz} from "../model/bloxorz";

export class BlockHandler {
    private DEFAULT_COLOR = 0xBB6600;
    private WIN_COLOR = 0x00FF00;
    private LOSS_COLOR = 0xFF0000;

    private block1: THREE.Mesh;
    private block2: THREE.Mesh;

    constructor (private scene: THREE.Scene, private model: Bloxorz) {
        this.block1 = this.initializeBlock();
        this.block2 = this.initializeBlock();
        this.updateBlockPositions();
    }

    private initializeBlock() {
        const geometry = new THREE.BoxGeometry(viewSettings.TILE_SIZE, viewSettings.TILE_SIZE, viewSettings.TILE_SIZE);
        const material = new THREE.MeshPhongMaterial({color: this.DEFAULT_COLOR});
        material.shading = THREE.FlatShading;
        const block = new THREE.Mesh(geometry, material);
        block.position.y = viewSettings.TILE_SIZE / 2.0;
        this.scene.add(block);
        this.scene.add(new THREE.WireframeHelper(block, 0x000000));
        return block;
    }

    public left() {
        this.model.left();
        this.updateBlocks();
    }

    public right() {
        this.model.right();
        this.updateBlocks();
    }

    public up() {
        this.model.up();
        this.updateBlocks();
    }

    public down() {
        this.model.down();
        this.updateBlocks();
    }

    private updateBlocks() {
        this.updateBlockPositions();
        this.updateBlockMaterial();
    }

    private updateBlockPositions() {
        this.updateBlockPosition(this.block1, this.model.block.pos1);
        this.updateBlockPosition(this.block2, this.model.block.pos2);
        if (this.model.block.pos1.equals(this.model.block.pos2)) {
            this.block2.position.y = viewSettings.TILE_SIZE * 1.5;
        } else {
            this.block2.position.y = viewSettings.TILE_SIZE / 2.0;
        }
    }

    private updateBlockPosition(mesh: THREE.Mesh, position: Position) {
        mesh.position.x = viewSettings.modelXToRealX(position.x);
        mesh.position.z = viewSettings.modelZToRealZ(position.z);
    }

    private updateBlockMaterial() {
        if (this.model.isWon) {
            this.setColor(this.WIN_COLOR);
        } else if (this.model.isLost) {
            this.setColor(this.LOSS_COLOR);
        }
    }

    private setColor(color) {
        const material = new THREE.MeshPhongMaterial({color: color});
        this.block1.material = material;
        this.block2.material = material;
    }
}