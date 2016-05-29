import {Level} from "./level";
import {Bloxorz} from "./bloxorz";

describe("Bloxorz", () => {
    const simpleLevel = new Level([
        "tttttt",
        "tSttOt",
        "tttttt"
    ]);

    it ("detects victory correctly", () => {
        const underTest = new Bloxorz(simpleLevel);

        underTest.right();
        underTest.right();

        expect(underTest.isOver).toBe(true);
        expect(underTest.isWon).toBe(true);
        expect(underTest.isLost).toBe(false);

        const pos1 = underTest.block.pos1;
        const pos2 = underTest.block.pos2;
        underTest.left();

        expect(underTest.block.pos1).toBe(pos1);
        expect(underTest.block.pos2).toBe(pos2);
    });

    it ("detects loss correctly", () => {
        const underTest = new Bloxorz(simpleLevel);

        underTest.right();
        underTest.left();
        underTest.left();

        expect(underTest.isOver).toBe(true);
        expect(underTest.isWon).toBe(false);
        expect(underTest.isLost).toBe(true);

        const pos1 = underTest.block.pos1;
        const pos2 = underTest.block.pos2;
        underTest.left();

        expect(underTest.block.pos1).toBe(pos1);
        expect(underTest.block.pos2).toBe(pos2);
    });
});