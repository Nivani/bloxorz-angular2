import {Level} from "./level";

describe("Level", () => {

    it ("calculates level width and height correctly", () => {
        const underTest = new Level([
            "------ttttttt--",
            "tttt--ttt--tt--",
            "ttttttttt--tttt",
            "tStt-------ttOt",
            "tttt-------tttt",
            "------------ttt"
        ]);

        expect(underTest.width).toBe(15);
        expect(underTest.height).toBe(6);
    });
});