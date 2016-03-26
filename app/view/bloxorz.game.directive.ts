///<reference path="../../typings/browser/ambient/three/index.d.ts"/>

import {Component} from "angular2/core";
import {ElementRef} from "angular2/core";
import {OnInit} from "angular2/core";
import {Position} from "../model/position";
import {Block} from "../model/block";
import {BlockHandler} from "./block.handler"
import {viewSettings} from "./view.settings";
import {LevelTilesHandler} from "./level.tiles.handler";
import {levels} from "../model/levels";

@Component({
    selector: "nvn-bloxorz-game",
    template: ""
})
export class BloxorzGame implements OnInit {
    private renderer: THREE.Renderer;
    private scene: THREE.Scene;
    private camera: THREE.Camera;
    private levelTilesHandler: LevelTilesHandler;
    private blockHandler: BlockHandler;

    constructor(private elementRef: ElementRef) {
    }

    ngOnInit() {
        this.initializeRendering();
        this.levelTilesHandler = new LevelTilesHandler(this.scene, levels[1]);
        this.blockHandler = new BlockHandler(this.scene, this.levelTilesHandler.startPosition);
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