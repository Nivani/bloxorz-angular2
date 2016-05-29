import {Level} from "./level";
import {Position} from "./position";

describe("Level", () => {

    it ("has correct state", () => {
        const underTest = new Level([
            "-----tttttt----",
            "-----t--ttt----",
            "-----t--ttttt--",
            "Sttttt-----tttt",
            "----ttt----ttOt",
            "----ttt-----ttt",
            "------t--tt----",
            "------ttttt----",
            "------ttttt----",
            "-------ttt-----",
        ]);

        expect(underTest.width).toBe(15);
        expect(underTest.height).toBe(10);
        expect(underTest.startPosition.equals(new Position(0, 3))).toBe(true);
        expect(underTest.endPosition.equals(new Position(13, 4))).toBe(true);
    });

    it ("isInside behaves correclty", () => {
        const underTest = new Level([
            "------ttttttt--",
            "tttt--ttt--tt--",
            "ttttttttt--tttt",
            "tStt-------ttOt",
            "tttt-------tttt",
            "------------ttt"
        ]);

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