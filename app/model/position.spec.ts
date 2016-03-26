import {Position} from "./position";

describe("Position", () => {

    it ("moves left correctly", () => {
        const pos = new Position(2, 2);
        const newPos = pos.left();
        expect(newPos.x).toBe(1);
        expect(newPos.z).toBe(2);
    });

    it ("moves right correctly", () => {
        const pos = new Position(2, 2);
        const newPos = pos.right();
        expect(newPos.x).toBe(3);
        expect(newPos.z).toBe(2);
    });

    it ("moves up correctly", () => {
        const pos = new Position(2, 2);
        const newPos = pos.up();
        expect(newPos.x).toBe(2);
        expect(newPos.z).toBe(1);
    });

    it ("moves down correctly", () => {
        const pos = new Position(2, 2);
        const newPos = pos.down();
        expect(newPos.x).toBe(2);
        expect(newPos.z).toBe(3);
    });
});