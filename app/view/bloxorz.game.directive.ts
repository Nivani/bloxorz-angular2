///<reference path="../../typings/browser/ambient/three/index.d.ts"/>

import {Component} from "angular2/core";
import {ElementRef} from "angular2/core";
import {OnInit} from "angular2/core";

@Component({
    selector: "nvn-bloxorz-game",
    template: `
        <div class="expressions">
            <input type="text" [(ngModel)]="xExpression">
            <input type="text" [(ngModel)]="yExpression">
            <input type="text" [(ngModel)]="zExpression">
            <button (click)="updateCubes()">Update!</button>
        </div>
    `,
    styles: [`
        expressions: {
            position: absolute;
        }

        input {
            width: 50px;
        }
    `]
})
export class BloxorzGame implements OnInit {
    public xExpression = 'i * 50';
    public yExpression = '0';
    public zExpression = '0';

    private renderer: THREE.Renderer;
    private scene: THREE.Scene;
    private camera: THREE.Camera;
    private cubes: THREE.Mesh[] = [];

    constructor(private elementRef: ElementRef) {
    }

    ngOnInit() {
        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 150, 3000);
        //const camera = new THREE.OrthographicCamera(-0.5 * window.innerWidth, 0.5 * window.innerWidth, -0.5 * window.innerHeight, 0.5 * window.innerHeight, 150, 3000);
        camera.position.set(-1000, 1000, -1000);
        camera.lookAt(scene.position);

        const renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setSize(window.innerWidth, window.innerHeight);
        this.elementRef.nativeElement.appendChild(renderer.domElement);

        for (var i = 0; i < 5; i++) {
            const geometry = new THREE.BoxGeometry(50, 5, 50);
            const material = new THREE.MeshPhongMaterial();
            material.shading = THREE.FlatShading;
            const cube = new THREE.Mesh(geometry, material);
            this.setCubePosition(cube, i);
            this.cubes.push(cube);
            scene.add(cube);

            const helper = new THREE.WireframeHelper(cube, 0x000000);
            scene.add(helper);
        }

        const ambLight = new THREE.AmbientLight(0x444444);
        scene.add(ambLight);

        const light = new THREE.DirectionalLight(0xdddddd, .8);
        light.position.set(0, 200, 0);
        light.lookAt(scene.position);
        scene.add(light);

        renderer.render(scene, camera);

        this.renderer = renderer;
        this.scene = scene;
        this.camera = camera;
    }

    public updateCubes = function updateCubes() {
        for(var i=0; i < 5; i++) {
            this.setCubePosition(this.cubes[i], i);
        }
        this.renderer.render(this.scene, this.camera);
    };

    private setCubePosition(cube: THREE.Mesh, i: number) {
        cube.position.set(eval(this.xExpression), eval(this.yExpression), eval(this.zExpression));
    };
}