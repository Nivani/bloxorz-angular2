import {Position} from "./position";

describe("Position", () => {

    it ("moves left correctly", () => {
        const underTest = new Position(2, 2);
        underTest.left();
        expect(underTest.x).toBe(2);
        expect(underTest.z).toBe(1);
    });

    it ("moves right correctly", () => {
        const underTest = new Position(2, 2);
        underTest.right();
        expect(underTest.x).toBe(2);
        expect(underTest.z).toBe(3);
    });

    it ("moves up correctly", () => {
        const underTest = new Position(2, 2);
        underTest.up();
        expect(underTest.x).toBe(3);
        expect(underTest.z).toBe(2);
    });

    it ("moves down correctly", () => {
        const underTest = new Position(2, 2);
        underTest.down();
        expect(underTest.x).toBe(1);
        expect(underTest.z).toBe(2);
    });
});