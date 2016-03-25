///<reference path="../../typings/browser/ambient/three/index.d.ts"/>

import {Component} from "angular2/core";
import {ElementRef} from "angular2/core";
import {OnInit} from "angular2/core";
import {Position} from "../model/position";

@Component({
    selector: "nvn-bloxorz-game",
    template: ""
})
export class BloxorzGame implements OnInit {
    private BLOCK_SIZE = 50;
    private TILE_HEIGHT = 5;
    private renderer: THREE.Renderer;
    private scene: THREE.Scene;
    private camera: THREE.Camera;
    private model: Position;
    block: THREE.Mesh;

    constructor(private elementRef: ElementRef) {
        this.model = new Position(2, 2);
    }

    ngOnInit() {
        this.initializeRendering();
        this.initializeTiles();
        this.initializeBlock();
        this.render();
        this.initializeInput();
    }

    private initializeRendering() {
        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 150, 3000);
        //const camera = new THREE.OrthographicCamera(-0.5 * window.innerWidth, 0.5 * window.innerWidth, -0.5 * window.innerHeight, 0.5 * window.innerHeight, 150, 3000);
        camera.position.set(-1000, 650, -250);
        camera.lookAt(scene.position);

        const renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setSize(window.innerWidth, window.innerHeight);
        this.elementRef.nativeElement.appendChild(renderer.domElement);

        const ambLight = new THREE.AmbientLight(0x444444);
        scene.add(ambLight);

        const light = new THREE.DirectionalLight(0xdddddd, .8);
        light.position.set(0, 200, 0);
        light.lookAt(scene.position);
        scene.add(light);

        this.renderer = renderer;
        this.scene = scene;
        this.camera = camera;
    };

    private initializeTiles() {
        for (let x = 0; x < 5; x++) {
            for (let z = 0; z < 5; z++) {
                const tileResult = this.createTile(x, z);
                this.scene.add(tileResult.tile);
                this.scene.add(tileResult.helper);
            }
        }
    };

    private createTile(x: number, z: number) {
        const geometry = new THREE.BoxGeometry(this.BLOCK_SIZE, this.TILE_HEIGHT, this.BLOCK_SIZE);
        const material = new THREE.MeshPhongMaterial();
        material.shading = THREE.FlatShading;
        const tile = new THREE.Mesh(geometry, material);
        tile.position.set(this.modelXToRealX(x), -this.TILE_HEIGHT, this.modelZToRealZ(z));

        return {
            tile: tile,
            helper: new THREE.WireframeHelper(tile, 0x000000)
        };
    };

    private modelXToRealX(x) {
        return (-2.5 + x) * this.BLOCK_SIZE;
    };

    private modelZToRealZ(z) {
        return (-2.5 + z) * this.BLOCK_SIZE;
    };

    private initializeBlock() {
        const geometry = new THREE.BoxGeometry(this.BLOCK_SIZE, this.BLOCK_SIZE * 2, this.BLOCK_SIZE);
        const material = new THREE.MeshPhongMaterial({ color: 0xBB6600 });
        material.shading = THREE.FlatShading;
        const block = new THREE.Mesh(geometry, material);
        block.position.y = this.BLOCK_SIZE;
        this.scene.add(block);
        this.scene.add(new THREE.WireframeHelper(block, 0x000000));
        this.block = block;
        this.updateBlockPosition();
    }

    private updateBlockPosition() {
        this.block.position.x = this.modelXToRealX(this.model.x);
        this.block.position.z = this.modelZToRealZ(this.model.z);
    }

    private render() {
        this.renderer.render(this.scene, this.camera);
    };

    private initializeInput() {
        document.documentElement.onkeydown = (event: KeyboardEvent) => {
            switch (event.keyCode) {
                case 37:
                    this.model = this.model.left();
                    this.updateBlockPosition();
                    this.render();
                    break;
                case 38:
                    this.model = this.model.up();
                    this.updateBlockPosition();
                    this.render();
                    break;
                case 39:
                    this.model = this.model.right();
                    this.updateBlockPosition();
                    this.render();
                    break;
                case 40:
                    this.model = this.model.down();
                    this.updateBlockPosition();
                    this.render();
                    break;
            }
        };
    }
}