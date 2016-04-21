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
import {Level} from "../model/level";

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
        const level = levels[2];
        this.initializeRendering(level);
        this.levelTilesHandler = new LevelTilesHandler(this.scene, level);
        this.blockHandler = new BlockHandler(this.scene, level.startPosition);
        this.render();
        this.initializeInput();
    }

    private initializeRendering(level: Level) {
        this.scene = new THREE.Scene();
        this.initializeCamera(level);
        this.initializeRenderer();
        this.initializeLighting();
    };

    private initializeCamera(level) {
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 150, 3000);
        const levelCenterX = viewSettings.modelXToRealX(level.width / 2.0);
        const levelCenterZ = viewSettings.modelZToRealZ(level.height / 2.0);
        camera.position.set(-250 + levelCenterX, 650, 1000 + levelCenterZ);
        camera.lookAt(new THREE.Vector3(levelCenterX, 0, levelCenterZ));
        this.camera = camera;
    };

    private initializeRenderer() {
        const renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setSize(window.innerWidth, window.innerHeight);
        this.elementRef.nativeElement.appendChild(renderer.domElement);
        this.renderer = renderer;
    };

    private initializeLighting() {
        const ambLight = new THREE.AmbientLight(0x444444);
        this.scene.add(ambLight);

        const light = new THREE.DirectionalLight(0xdddddd, .8);
        light.position.set(0, 200, 0);
        light.lookAt(this.scene.position);
        this.scene.add(light);
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