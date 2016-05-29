import {Component} from "angular2/core";
import {BloxorzGame} from "./view/bloxorz.game.directive";

@Component({
    selector: "nvn-app",
    template: "<nvn-bloxorz-game></nvn-bloxorz-game>",
    directives: [BloxorzGame]
})
export class AppComponent { }
