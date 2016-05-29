import {Block} from "./block";
import {Position} from "./position";

describe("Block", () => {

    it ("has a correct initial state", () => {
        const underTest = new Block(new Position(2, 2));

        expect(underTest.pos1.x).toBe(2);
        expect(underTest.pos1.z).toBe(2);
        expect(underTest.pos2.x).toBe(2);
        expect(underTest.pos2.z).toBe(2);
    });

    it ("moves left correctly standing up", () => {
        const underTest = new Block(new Position(2, 2));
        underTest.left();

        expect(underTest.pos1.x).toBe(1);
        expect(underTest.pos1.z).toBe(2);
        expect(underTest.pos2.x).toBe(0);
        expect(underTest.pos2.z).toBe(2);

        underTest.left();

        expect(underTest.pos1.x).toBe(-1);
        expect(underTest.pos1.z).toBe(2);
        expect(underTest.pos2.x).toBe(-1);
        expect(underTest.pos2.z).toBe(2);

        underTest.left();

        expect(underTest.pos1.x).toBe(-2);
        expect(underTest.pos1.z).toBe(2);
        expect(underTest.pos2.x).toBe(-3);
        expect(underTest.pos2.z).toBe(2);
    });

    it ("moves left correctly laying down", () => {
        const underTest = new Block(new Position(2, 2));
        underTest.up();
        underTest.left();

        expect(underTest.pos1.x).toBe(1);
        expect(underTest.pos1.z).toBe(1);
        expect(underTest.pos2.x).toBe(1);
        expect(underTest.pos2.z).toBe(0);

        underTest.left();

        expect(underTest.pos1.x).toBe(0);
        expect(underTest.pos1.z).toBe(1);
        expect(underTest.pos2.x).toBe(0);
        expect(underTest.pos2.z).toBe(0);
    });

    it ("moves right correctly standing up", () => {
        const underTest = new Block(new Position(2, 2));
        underTest.right();

        expect(underTest.pos1.x).toBe(4);
        expect(underTest.pos1.z).toBe(2);
        expect(underTest.pos2.x).toBe(3);
        expect(underTest.pos2.z).toBe(2);

        underTest.right();

        expect(underTest.pos1.x).toBe(5);
        expect(underTest.pos1.z).toBe(2);
        expect(underTest.pos2.x).toBe(5);
        expect(underTest.pos2.z).toBe(2);

        underTest.right();

        expect(underTest.pos1.x).toBe(7);
        expect(underTest.pos1.z).toBe(2);
        expect(underTest.pos2.x).toBe(6);
        expect(underTest.pos2.z).toBe(2);
    });

    it ("moves right correctly laying down", () => {
        const underTest = new Block(new Position(2, 2));
        underTest.up();
        underTest.right();

        expect(underTest.pos1.x).toBe(3);
        expect(underTest.pos1.z).toBe(1);
        expect(underTest.pos2.x).toBe(3);
        expect(underTest.pos2.z).toBe(0);

        underTest.right();

        expect(underTest.pos1.x).toBe(4);
        expect(underTest.pos1.z).toBe(1);
        expect(underTest.pos2.x).toBe(4);
        expect(underTest.pos2.z).toBe(0);
    });

    it ("moves up correctly standing up", () => {
        const underTest = new Block(new Position(2, 2));
        underTest.up();

        expect(underTest.pos1.x).toBe(2);
        expect(underTest.pos1.z).toBe(1);
        expect(underTest.pos2.x).toBe(2);
        expect(underTest.pos2.z).toBe(0);

        underTest.up();

        expect(underTest.pos1.x).toBe(2);
        expect(underTest.pos1.z).toBe(-1);
        expect(underTest.pos2.x).toBe(2);
        expect(underTest.pos2.z).toBe(-1);

        underTest.up();

        expect(underTest.pos1.x).toBe(2);
        expect(underTest.pos1.z).toBe(-2);
        expect(underTest.pos2.x).toBe(2);
        expect(underTest.pos2.z).toBe(-3);
    });

    it ("moves up correctly laying down", () => {
        const underTest = new Block(new Position(2, 2));
        underTest.right();
        underTest.up();

        expect(underTest.pos1.x).toBe(4);
        expect(underTest.pos1.z).toBe(1);
        expect(underTest.pos2.x).toBe(3);
        expect(underTest.pos2.z).toBe(1);

        underTest.up();

        expect(underTest.pos1.x).toBe(4);
        expect(underTest.pos1.z).toBe(0);
        expect(underTest.pos2.x).toBe(3);
        expect(underTest.pos2.z).toBe(0);
    });

    it ("moves down correctly standing up", () => {
        const underTest = new Block(new Position(2, 2));
        underTest.down();

        expect(underTest.pos1.x).toBe(2);
        expect(underTest.pos1.z).toBe(4);
        expect(underTest.pos2.x).toBe(2);
        expect(underTest.pos2.z).toBe(3);

        underTest.down();

        expect(underTest.pos1.x).toBe(2);
        expect(underTest.pos1.z).toBe(5);
        expect(underTest.pos2.x).toBe(2);
        expect(underTest.pos2.z).toBe(5);

        underTest.down();

        expect(underTest.pos1.x).toBe(2);
        expect(underTest.pos1.z).toBe(7);
        expect(underTest.pos2.x).toBe(2);
        expect(underTest.pos2.z).toBe(6);
    });

    it ("moves down correctly laying down", () => {
        const underTest = new Block(new Position(2, 2));
        underTest.right();
        underTest.down();

        expect(underTest.pos1.x).toBe(4);
        expect(underTest.pos1.z).toBe(3);
        expect(underTest.pos2.x).toBe(3);
        expect(underTest.pos2.z).toBe(3);

        underTest.down();

        expect(underTest.pos1.x).toBe(4);
        expect(underTest.pos1.z).toBe(4);
        expect(underTest.pos2.x).toBe(3);
        expect(underTest.pos2.z).toBe(4);
    });
});