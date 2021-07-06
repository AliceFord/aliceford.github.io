const CODE_39_LOOKUP_TABLE = {
	"0": "111221211",
	"1": "211211112",
	"2": "112211112",
	"3": "212211111",
	"4": "111221112",
	"5": "211221111",
	"6": "112221111",
	"7": "111211212",
	"8": "211211211",
	"9": "112211211",
	"A": "211112112",
	"B": "112112112",
	"C": "212112111",
	"D": "111122112",
	"E": "211122111",
	"F": "112122111",
	"G": "111112212",
	"H": "211112211",
	"I": "112112211",
	"J": "111122211",
	"K": "211111122",
	"L": "112111122",
	"M": "212111121",
	"N": "111121122",
	"O": "211121121",
	"P": "112121121",
	"Q": "111111222",
	"R": "211111221",
	"S": "112111221",
	"T": "111121221",
	"U": "221111112",
	"V": "122111112",
	"W": "222111111",
	"X": "121121112",
	"Y": "221121111",
	"Z": "122121111",
	"-": "121111212",
	".": "221111211",
	" ": "122111211",
	"$": "121212111",
	"/": "121211121",
	"+": "121112121",
	"%": "111212121",
	"*": "121121211",
}

String.prototype.removeCharIfExists = function (char) {
    if (this.charAt(this.length - 1) == char) {
        return this.substr(0, this.length - 1);
    } else {
        return this;
    }
}

function generatePNGFromBinary(binary) {
    let barWidth = 2;
    let vspacing = 10;
    let spacingForNumbers = 0;
    let hspacing = 20;
    let barHeight = 100;

    let canvas = document.createElement("canvas");
    canvas.width = (binary.length * barWidth) + (2 * hspacing);
    canvas.height = barHeight + (2 * vspacing) + spacingForNumbers;
    let ctx = canvas.getContext("2d");
    let image = ctx.createImageData(canvas.width, canvas.height);
    let data = image.data;

    ctx.beginPath();
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width,canvas.height);
    ctx.fill();

    for (let i = 0; i < binary.length; i++) {
        if (binary[i] == "1") {
            for (let w = 0; w < barWidth; w++) {
                for (let h = 0; h < barHeight; h++) {
                    data[4 * ((hspacing + (i * barWidth) + w) + (canvas.width * (vspacing + h)))] = 0;
                    data[4 * ((hspacing + (i * barWidth) + w) + (canvas.width * (vspacing + h))) + 1] = 0;
                    data[4 * ((hspacing + (i * barWidth) + w) + (canvas.width * (vspacing + h))) + 2] = 0;
                    data[4 * ((hspacing + (i * barWidth) + w) + (canvas.width * (vspacing + h))) + 3] = 255;
                }
            }
        }
    }

    ctx.putImageData(image, 0, 0);

    return canvas.toDataURL();
}

function ecode39(code) {
    let output = "";
    for (let i = 0; i < code.length; i++) {
        output += CODE_39_LOOKUP_TABLE[code[i]] + "0"
    }

    let code39Code = CODE_39_LOOKUP_TABLE["*"] + "0" + output.removeCharIfExists("0") + "0" + CODE_39_LOOKUP_TABLE["*"];

    let finalOutput = "";
    code39Code.split("0").forEach(s => {
        for (let i = 0; i < 9; i++) {
            if (i % 2 == 0) {
                if (s.charAt(i) == "1") {
                    finalOutput += "1";
                } else {
                    finalOutput += "111";
                }
            } else {
                if (s.charAt(i) == "1") {
                    finalOutput += "0";
                } else {
                    finalOutput += "000";
                }
            }
        }
        finalOutput += "0";
    });

    return generatePNGFromBinary(finalOutput.substr(0, finalOutput.length-1));
}

function dcode39(code) {

}