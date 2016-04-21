import {Level} from "./level";
import {Position} from "./position";

describe("Level", () => {
    const level2 = [
        "------ttttttt--",
        "tttt--ttt--tt--",
        "ttttttttt--tttt",
        "tStt-------ttOt",
        "tttt-------tttt",
        "------------ttt"
    ];

    it ("has correct state", () => {
        const underTest = new Level(level2);

        expect(underTest.width).toBe(15);
        expect(underTest.height).toBe(6);
        expect(underTest.startPosition.equals(new Position(1, 3))).toBeTruthy();
        expect(underTest.endPosition.equals(new Position(13, 3))).toBeTruthy();
    });

    it ("isInside behaves correclty", () => {
        const underTest = new Level(level2);

        expect(underTest.hasPosition(new Position(1, 3))).toBe(true);
        expect(underTest.hasPosition(new Position(1, 2))).toBe(true);
        expect(underTest.hasPosition(new Position(13, 2))).toBe(true);
        expect(underTest.hasPosition(new Position(0, 0))).toBe(false);
        expect(underTest.hasPosition(new Position(4, 1))).toBe(false);
        expect(underTest.hasPosition(new Position(9, 1))).toBe(false);
        expect(underTest.hasPosition(new Position(15, 2))).toBe(false);
        expect(underTest.hasPosition(new Position(13, 6))).toBe(false);
    });
});