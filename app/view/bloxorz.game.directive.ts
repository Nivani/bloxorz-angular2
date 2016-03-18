///<reference path="../../typings/browser/ambient/three/index.d.ts"/>

import {Component} from "angular2/core";
import {ElementRef} from "angular2/core";
import {OnInit} from "angular2/core";

@Component({
    selector: "nvn-bloxorz-game",
    template: `
        <button (click)='xPlus()'>+X</button>
        <button (click)='xMinus()'>-X</button>
        <button (click)='zPlus()'>+Z</button>
        <button (click)='zMinus()'>-Z</button>
        x={{ block.position.x }}, z={{ block.position.z }}
        `
})
export class BloxorzGame implements OnInit {
    private renderer: THREE.Renderer;
    private scene: THREE.Scene;
    private camera: THREE.Camera;
    block: THREE.Mesh;

    constructor(private elementRef: ElementRef) {
    }

    ngOnInit() {
        this.initializeRendering();
        this.initializeTiles();
        this.initializeBlock();
        this.render();
    }

    public xPlus = function xPlus() {
        this.block.position.x += 50;
        this.render();
    };

    public xMinus = function xMinus() {
        this.block.position.x -= 50;
        this.render();
    };

    public zPlus = function zPlus() {
        this.block.position.z += 50;
        this.render();
    };

    public zMinus = function zMinus() {
        this.block.position.z -= 50;
        this.render();
    };

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
        const geometry = new THREE.BoxGeometry(50, 5, 50);
        const material = new THREE.MeshPhongMaterial();
        material.shading = THREE.FlatShading;
        const tile = new THREE.Mesh(geometry, material);
        const x = (-2.5 + x) * 50;
        const z = (-2.5 + z) * 50;
        tile.position.set(x, -5, z);

        return {
            tile: tile,
            helper: new THREE.WireframeHelper(tile, 0x000000)
        };
    };

    private initializeBlock() {
        const geometry = new THREE.BoxGeometry(50, 100, 50);
        const material = new THREE.MeshPhongMaterial({ color: 0xBB6600 });
        material.shading = THREE.FlatShading;
        const block = new THREE.Mesh(geometry, material);
        block.position.set(-25, 50, -25);
        this.scene.add(block);
        this.scene.add(new THREE.WireframeHelper(block, 0x000000));
        this.block = block;
    }

    private render() {
        this.renderer.render(this.scene, this.camera);
    };
}