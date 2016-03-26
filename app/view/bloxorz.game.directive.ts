///<reference path="../../typings/browser/ambient/three/index.d.ts"/>

import {Component} from "angular2/core";
import {ElementRef} from "angular2/core";
import {OnInit} from "angular2/core";
import {Position} from "../model/position";
import {Block} from "../model/block";
import {BlockHandler} from "./block.handler"
import {viewSettings} from "./view.settings";

@Component({
    selector: "nvn-bloxorz-game",
    template: ""
})
export class BloxorzGame implements OnInit {
    private renderer: THREE.Renderer;
    private scene: THREE.Scene;
    private camera: THREE.Camera;
    private blockHandler: BlockHandler;

    constructor(private elementRef: ElementRef) {
    }

    ngOnInit() {
        this.initializeRendering();
        this.initializeTiles();
        this.blockHandler = new BlockHandler(this.scene, new Position(2, 2));
        this.render();
        this.initializeInput();
    }

    private initializeRendering() {
        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 150, 3000);
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
        const geometry = new THREE.BoxGeometry(viewSettings.TILE_SIZE, viewSettings.TILE_HEIGHT, viewSettings.TILE_SIZE);
        const material = new THREE.MeshPhongMaterial();
        material.shading = THREE.FlatShading;
        const tile = new THREE.Mesh(geometry, material);
        tile.position.set(this.modelXToRealX(x), -viewSettings.TILE_HEIGHT, this.modelZToRealZ(z));

        return {
            tile: tile,
            helper: new THREE.WireframeHelper(tile, 0x000000)
        };
    };

    private modelXToRealX(x) {
        return (-2.5 + x) * viewSettings.TILE_SIZE;
    };

    private modelZToRealZ(z) {
        return (-2.5 + z) * viewSettings.TILE_SIZE;
    };

    private render() {
        this.renderer.render(this.scene, this.camera);
    };

    private initializeInput() {
        document.documentElement.onkeydown = (event: KeyboardEvent) => {
            switch (event.keyCode) {
                case 37:
                    this.blockHandler.left();
                    this.render();
                    break;
                case 38:
                    this.blockHandler.up();
                    this.render();
                    break;
                case 39:
                    this.blockHandler.right();
                    this.render();
                    break;
                case 40:
                    this.blockHandler.down();
                    this.render();
                    break;
            }
        };
    }
}