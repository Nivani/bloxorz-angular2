import {Bloxorz} from "./bloxorz";

describe("Bloxorz", () => {

    it ("moves left correctly", () => {
        const underTest = new Bloxorz();
        underTest.left();
        expect(underTest.x).toBe(2);
        expect(underTest.z).toBe(1);
    });

    it ("moves right correctly", () => {
        const underTest = new Bloxorz();
        underTest.right();
        expect(underTest.x).toBe(2);
        expect(underTest.z).toBe(3);
    });

    it ("moves up correctly", () => {
        const underTest = new Bloxorz();
        underTest.up();
        expect(underTest.x).toBe(3);
        expect(underTest.z).toBe(2);
    });

    it ("moves down correctly", () => {
        const underTest = new Bloxorz();
        underTest.down();
        expect(underTest.x).toBe(1);
        expect(underTest.z).toBe(2);
    });
});