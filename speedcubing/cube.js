const notationToRot = {"'": 3, undefined: 1, "2": 2}

class Cube {
    constructor(cubeInstructions) { // wyogrb
        this.cubeData = [];
        for (let i = 0; i < 6; i++) {
            this.cubeData.push(cubeInstructions.substr(i * 9, 9).split(""));
        }
    }

    actuallyApply(a, b, c, d, aa, ab, ac, ba, bb, bc, ca, cb, cc, da, db, dc, rotface) {
        let temp = [this.cubeData[a][aa], this.cubeData[a][ab], this.cubeData[a][ac]];
        [this.cubeData[a][aa], this.cubeData[a][ab], this.cubeData[a][ac]] = [this.cubeData[d][da], this.cubeData[d][db], this.cubeData[d][dc]];
        [this.cubeData[d][da], this.cubeData[d][db], this.cubeData[d][dc]] = [this.cubeData[c][ca], this.cubeData[c][cb], this.cubeData[c][cc]];
        [this.cubeData[c][ca], this.cubeData[c][cb], this.cubeData[c][cc]] = [this.cubeData[b][ba], this.cubeData[b][bb], this.cubeData[b][bc]];
        [this.cubeData[b][ba], this.cubeData[b][bb], this.cubeData[b][bc]] = [temp[0], temp[1], temp[2]];

        if (rotface != -1) {
            temp = this.cubeData[rotface][3];
            this.cubeData[rotface][3] = this.cubeData[rotface][7];
            this.cubeData[rotface][7] = this.cubeData[rotface][5];
            this.cubeData[rotface][5] = this.cubeData[rotface][1];
            this.cubeData[rotface][1] = temp;

            temp = this.cubeData[rotface][0];
            this.cubeData[rotface][0] = this.cubeData[rotface][6];
            this.cubeData[rotface][6] = this.cubeData[rotface][8];
            this.cubeData[rotface][8] = this.cubeData[rotface][2];
            this.cubeData[rotface][2] = temp;
        }
    }

    applyMove(move) {
        switch (move[0]) {
        case "R":
            for (let i = 0; i < notationToRot[move[1]]; i++)
                this.actuallyApply(0, 5, 1, 3,  2, 5, 8,  6, 3, 0,  2, 5, 8,  2, 5, 8,  4)
            break;
        case "L":
            for (let i = 0; i < notationToRot[move[1]]; i++)
                this.actuallyApply(0, 3, 1, 5,  0, 3, 6,  0, 3, 6,  0, 3, 6,  8, 5, 2,  2)
            break;
        case "U":
            for (let i = 0; i < notationToRot[move[1]]; i++)
                this.actuallyApply(2, 5, 4, 3,  0, 1, 2,  0, 1, 2,  0, 1, 2,  0, 1, 2,  0)
            break;
        case "D":
            for (let i = 0; i < notationToRot[move[1]]; i++)
                this.actuallyApply(2, 3, 4, 5,  6, 7, 8,  6, 7, 8,  6, 7, 8,  6, 7, 8,  1)
            break;
        case "F":
            for (let i = 0; i < notationToRot[move[1]]; i++)
                this.actuallyApply(0, 4, 1, 2,  6, 7, 8,  0, 3, 6,  2, 1, 0,  8, 5, 2,  3)
            break;
        case "B":
            for (let i = 0; i < notationToRot[move[1]]; i++)
                this.actuallyApply(0, 2, 1, 4,  0, 1, 2,  6, 3, 0,  8, 7, 6,  2, 5, 8,  5)
            break;
        case "M":
            for (let i = 0; i < notationToRot[move[1]]; i++)
                this.actuallyApply(0, 3, 1, 5,  1, 4, 7,  1, 4, 7,  1, 4, 7,  7, 4, 1,  -1)
            break;
        }
    }

    applyMoves(moves) {
        moves.forEach((item, index) => {
            if (item !== "") this.applyMove(item);
        });
    }

    static Empty() {
        return new Cube("wwwwwwwwwyyyyyyyyyooooooooogggggggggrrrrrrrrrbbbbbbbbb");
    }
}