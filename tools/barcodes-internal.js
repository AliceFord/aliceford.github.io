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

const CODABAR_LOOKUP_TABLE = {
    "0": "101010001110", "1": "101011100010", "2": "101000101110", "3": "111000101010",
    "4": "101110100010", "5": "111010100010", "6": "100010101110", "7": "100010111010",
    "8": "100011101010", "9": "111010001010", "-": "101000111010", "$": "101110001010",
    ":": "11101011101110", "/": "11101110101110", ".": "11101110111010", "+": "101110001110001110",
    "A": "10111000100010", "B": "10001000101110", "C": "10100010001110", "D": "10100011100010"
}

const CODE_128A_LOOKUP_TABLE = {
    " ": ["11011001100", 0], "!": ["11001101100", 1], "\"": ["11001100110", 2], "#": ["10010011000", 3], "$": ["10010001100", 4], "%": ["10001001100", 5], "&": ["10011001000", 6], "'": ["10011000100", 7], "(": ["10001100100", 8], ")": ["11001001000", 9], "*": ["11001000100", 10], "+": ["11000100100", 11], ",": ["10110011100", 12], "-": ["10011011100", 13], ".": ["10011001110", 14], "/": ["10111001100", 15], "0": ["10011101100", 16], "1": ["10011100110", 17], "2": ["11001110010", 18], "3": ["11001011100", 19], "4": ["11001001110", 20], "5": ["11011100100", 21], "6": ["11001110100", 22], "7": ["11101101110", 23], "8": ["11101001100", 24], "9": ["11100101100", 25], ":": ["11100100110", 26], ";": ["11101100100", 27], "<": ["11100110100", 28], "=": ["11100110010", 29], ">": ["11011011000", 30], "?": ["11011000110", 31], "@": ["11000110110", 32], "A": ["10100011000", 33], "B": ["10001011000", 34], "C": ["10001000110", 35], "D": ["10110001000", 36], "E": ["10001101000", 37], "F": ["10001100010", 38], "G": ["11010001000", 39], "H": ["11000101000", 40], "I": ["11000100010", 41], "J": ["10110111000", 42], "K": ["10110001110", 43], "L": ["10001101110", 44], "M": ["10111011000", 45], "N": ["10111000110", 46], "O": ["10001110110", 47], "P": ["11101110110", 48], "Q": ["11010001110", 49], "R": ["11000101110", 50], "S": ["11011101000", 51], "T": ["11011100010", 52], "U": ["11011101110", 53], "V": ["11101011000", 54], "W": ["11101000110", 55], "X": ["11100010110", 56], "Y": ["11101101000", 57], "Z": ["11101100010", 58], "[": ["11100011010", 59], "\\": ["11101111010", 60], "]": ["11001000010", 61], "^": ["11110001010", 62], "_": ["10100110000", 63], "NUL": ["10100001100", 64], "SOH": ["10010110000", 65], "STX": ["10010000110", 66], "ETX": ["10000101100", 67], "EOT": ["10000100110", 68], "ENQ": ["10110010000", 69], "ACK": ["10110000100", 70], "BEL": ["10011010000", 71], "BS": ["10011000010", 72], "HT": ["10000110100", 73], "LF": ["10000110010", 74], "VT": ["11000010010", 75], "FF": ["11001010000", 76], "CR": ["11110111010", 77], "SO": ["11000010100", 78], "SI": ["10001111010", 79], "DLE": ["10100111100", 80], "DC1": ["10010111100", 81], "DC2": ["10010011110", 82], "DC3": ["10111100100", 83], "DC4": ["10011110100", 84], "NAK": ["10011110010", 85], "SYN": ["11110100100", 86], "ETB": ["11110010100", 87], "CAN": ["11110010010", 88], "EM": ["11011011110", 89], "SUB": ["11011110110", 90], "ESC": ["11110110110", 91], "FS": ["10101111000", 92], "GS": ["10100011110", 93], "RS": ["10001011110", 94], "US": ["10111101000", 95], "FNC 3": ["10111100010", 96], "FNC 2": ["11110101000", 97], "Shift B": ["11110100010", 98], "Code C": ["10111011110", 99], "Code B": ["10111101110", 100], "FNC 4": ["11101011110", 101], "FNC 1": ["11110101110", 102], 
}

const CODE_128B_LOOKUP_TABLE = {
    " ": ["11011001100", 0], "!": ["11001101100", 1], "\"": ["11001100110", 2], "#": ["10010011000", 3], "$": ["10010001100", 4], "%": ["10001001100", 5], "&": ["10011001000", 6], "'": ["10011000100", 7], "(": ["10001100100", 8], ")": ["11001001000", 9], "*": ["11001000100", 10], "+": ["11000100100", 11], ",": ["10110011100", 12], "-": ["10011011100", 13], ".": ["10011001110", 14], "/": ["10111001100", 15], "0": ["10011101100", 16], "1": ["10011100110", 17], "2": ["11001110010", 18], "3": ["11001011100", 19], "4": ["11001001110", 20], "5": ["11011100100", 21], "6": ["11001110100", 22], "7": ["11101101110", 23], "8": ["11101001100", 24], "9": ["11100101100", 25], ":": ["11100100110", 26], ";": ["11101100100", 27], "<": ["11100110100", 28], "=": ["11100110010", 29], ">": ["11011011000", 30], "?": ["11011000110", 31], "@": ["11000110110", 32], "A": ["10100011000", 33], "B": ["10001011000", 34], "C": ["10001000110", 35], "D": ["10110001000", 36], "E": ["10001101000", 37], "F": ["10001100010", 38], "G": ["11010001000", 39], "H": ["11000101000", 40], "I": ["11000100010", 41], "J": ["10110111000", 42], "K": ["10110001110", 43], "L": ["10001101110", 44], "M": ["10111011000", 45], "N": ["10111000110", 46], "O": ["10001110110", 47], "P": ["11101110110", 48], "Q": ["11010001110", 49], "R": ["11000101110", 50], "S": ["11011101000", 51], "T": ["11011100010", 52], "U": ["11011101110", 53], "V": ["11101011000", 54], "W": ["11101000110", 55], "X": ["11100010110", 56], "Y": ["11101101000", 57], "Z": ["11101100010", 58], "[": ["11100011010", 59], "\\": ["11101111010", 60], "]": ["11001000010", 61], "^": ["11110001010", 62], "_": ["10100110000", 63], "`": ["10100001100", 64], "a": ["10010110000", 65], "b": ["10010000110", 66], "c": ["10000101100", 67], "d": ["10000100110", 68], "e": ["10110010000", 69], "f": ["10110000100", 70], "g": ["10011010000", 71], "h": ["10011000010", 72], "i": ["10000110100", 73], "j": ["10000110010", 74], "k": ["11000010010", 75], "l": ["11001010000", 76], "m": ["11110111010", 77], "n": ["11000010100", 78], "o": ["10001111010", 79], "p": ["10100111100", 80], "q": ["10010111100", 81], "r": ["10010011110", 82], "s": ["10111100100", 83], "t": ["10011110100", 84], "u": ["10011110010", 85], "v": ["11110100100", 86], "w": ["11110010100", 87], "x": ["11110010010", 88], "y": ["11011011110", 89], "z": ["11011110110", 90], "{": ["11110110110", 91], "|": ["10101111000", 92], "}": ["10100011110", 93], "~": ["10001011110", 94], "DEL": ["10111101000", 95], "FNC 3": ["10111100010", 96], "FNC 2": ["11110101000", 97], "Shift A": ["11110100010", 98], "Code C": ["10111011110", 99], "FNC 4": ["10111101110", 100], "Code A": ["11101011110", 101], "FNC 1": ["11110101110", 102], 
}

const CODE_128C_LOOKUP_TABLE = {
    "00": ["11011001100", 0], "01": ["11001101100", 1], "02": ["11001100110", 2], "03": ["10010011000", 3], "04": ["10010001100", 4], "05": ["10001001100", 5], "06": ["10011001000", 6], "07": ["10011000100", 7], "08": ["10001100100", 8], "09": ["11001001000", 9], "10": ["11001000100", 10], "11": ["11000100100", 11], "12": ["10110011100", 12], "13": ["10011011100", 13], "14": ["10011001110", 14], "15": ["10111001100", 15], "16": ["10011101100", 16], "17": ["10011100110", 17], "18": ["11001110010", 18], "19": ["11001011100", 19], "20": ["11001001110", 20], "21": ["11011100100", 21], "22": ["11001110100", 22], "23": ["11101101110", 23], "24": ["11101001100", 24], "25": ["11100101100", 25], "26": ["11100100110", 26], "27": ["11101100100", 27], "28": ["11100110100", 28], "29": ["11100110010", 29], "30": ["11011011000", 30], "31": ["11011000110", 31], "32": ["11000110110", 32], "33": ["10100011000", 33], "34": ["10001011000", 34], "35": ["10001000110", 35], "36": ["10110001000", 36], "37": ["10001101000", 37], "38": ["10001100010", 38], "39": ["11010001000", 39], "40": ["11000101000", 40], "41": ["11000100010", 41], "42": ["10110111000", 42], "43": ["10110001110", 43], "44": ["10001101110", 44], "45": ["10111011000", 45], "46": ["10111000110", 46], "47": ["10001110110", 47], "48": ["11101110110", 48], "49": ["11010001110", 49], "50": ["11000101110", 50], "51": ["11011101000", 51], "52": ["11011100010", 52], "53": ["11011101110", 53], "54": ["11101011000", 54], "55": ["11101000110", 55], "56": ["11100010110", 56], "57": ["11101101000", 57], "58": ["11101100010", 58], "59": ["11100011010", 59], "60": ["11101111010", 60], "61": ["11001000010", 61], "62": ["11110001010", 62], "63": ["10100110000", 63], "64": ["10100001100", 64], "65": ["10010110000", 65], "66": ["10010000110", 66], "67": ["10000101100", 67], "68": ["10000100110", 68], "69": ["10110010000", 69], "70": ["10110000100", 70], "71": ["10011010000", 71], "72": ["10011000010", 72], "73": ["10000110100", 73], "74": ["10000110010", 74], "75": ["11000010010", 75], "76": ["11001010000", 76], "77": ["11110111010", 77], "78": ["11000010100", 78], "79": ["10001111010", 79], "80": ["10100111100", 80], "81": ["10010111100", 81], "82": ["10010011110", 82], "83": ["10111100100", 83], "84": ["10011110100", 84], "85": ["10011110010", 85], "86": ["11110100100", 86], "87": ["11110010100", 87], "88": ["11110010010", 88], "89": ["11011011110", 89], "90": ["11011110110", 90], "91": ["11110110110", 91], "92": ["10101111000", 92], "93": ["10100011110", 93], "94": ["10001011110", 94], "95": ["10111101000", 95], "96": ["10111100010", 96], "97": ["11110101000", 97], "98": ["11110100010", 98], "99": ["10111011110", 99], "Code B": ["10111101110", 100], "Code A": ["11101011110", 101], "FNC 1": ["11110101110", 102], 
}

const I2OF5_LOOKUP_TABLE = {
    "0": "00110", "1": "10001", "2": "01001", "3": "11000", "4": "00101", "5": "10100", "6": "01100", "7": "00011", "8": "10010", "9": "01010"
}

const QRCODE_ALPHANUMERIC_LOOKUP_TABLE = {
    "0": 0, "6": 6, "C": 12, "I": 18, "O": 24, "U": 30, " ": 36, "1": 1, "7": 7, "D": 13, "J": 19, "P": 25, "V": 31, "$": 37, "2": 2, "8": 8, "E": 14, "K": 20, "Q": 26, "W": 32, "%": 38, "3": 3, "9": 9, "F": 15, "L": 21, "R": 27, "X": 33, "*": 39, "4": 4, "A": 10, "G": 16, "M": 22, "S": 28, "Y": 34, "+": 40, "5": 5, "B": 11, "H": 17, "N": 23, "T": 29, "Z": 35, "-": 41, ".": 42, "/": 43, ":": 44
}

const QRCODE_ANTILOG_TABLE = {
    "1": 0, "2": 1, "4": 2, "8": 3, "16": 4, "32": 5, "64": 6, "128": 7, "29": 8, "58": 9, "116": 10, "232": 11, "205": 12, "135": 13, "19": 14, "38": 15, "76": 16, "152": 17, "45": 18, "90": 19, "180": 20, "117": 21, "234": 22, "201": 23, "143": 24, "3": 25, "6": 26, "12": 27, "24": 28, "48": 29, "96": 30, "192": 31, "157": 32, "39": 33, "78": 34, "156": 35, "37": 36, "74": 37, "148": 38, "53": 39, "106": 40, "212": 41, "181": 42, "119": 43, "238": 44, "193": 45, "159": 46, "35": 47, "70": 48, "140": 49, "5": 50, "10": 51, "20": 52, "40": 53, "80": 54, "160": 55, "93": 56, "186": 57, "105": 58, "210": 59, "185": 60, "111": 61, "222": 62, "161": 63, "95": 64, "190": 65, "97": 66, "194": 67, "153": 68, "47": 69, "94": 70, "188": 71, "101": 72, "202": 73, "137": 74, "15": 75, "30": 76, "60": 77, "120": 78, "240": 79, "253": 80, "231": 81, "211": 82, "187": 83, "107": 84, "214": 85, "177": 86, "127": 87, "254": 88, "225": 89, "223": 90, "163": 91, "91": 92, "182": 93, "113": 94, "226": 95, "217": 96, "175": 97, "67": 98, "134": 99, "17": 100, "34": 101, "68": 102, "136": 103, "13": 104, "26": 105, "52": 106, "104": 107, "208": 108, "189": 109, "103": 110, "206": 111, "129": 112, "31": 113, "62": 114, "124": 115, "248": 116, "237": 117, "199": 118, "147": 119, "59": 120, "118": 121, "236": 122, "197": 123, "151": 124, "51": 125, "102": 126, "204": 127, "133": 128, "23": 129, "46": 130, "92": 131, "184": 132, "109": 133, "218": 134, "169": 135, "79": 136, "158": 137, "33": 138, "66": 139, "132": 140, "21": 141, "42": 142, "84": 143, "168": 144, "77": 145, "154": 146, "41": 147, "82": 148, "164": 149, "85": 150, "170": 151, "73": 152, "146": 153, "57": 154, "114": 155, "228": 156, "213": 157, "183": 158, "115": 159, "230": 160, "209": 161, "191": 162, "99": 163, "198": 164, "145": 165, "63": 166, "126": 167, "252": 168, "229": 169, "215": 170, "179": 171, "123": 172, "246": 173, "241": 174, "255": 175, "227": 176, "219": 177, "171": 178, "75": 179, "150": 180, "49": 181, "98": 182, "196": 183, "149": 184, "55": 185, "110": 186, "220": 187, "165": 188, "87": 189, "174": 190, "65": 191, "130": 192, "25": 193, "50": 194, "100": 195, "200": 196, "141": 197, "7": 198, "14": 199, "28": 200, "56": 201, "112": 202, "224": 203, "221": 204, "167": 205, "83": 206, "166": 207, "81": 208, "162": 209, "89": 210, "178": 211, "121": 212, "242": 213, "249": 214, "239": 215, "195": 216, "155": 217, "43": 218, "86": 219, "172": 220, "69": 221, "138": 222, "9": 223, "18": 224, "36": 225, "72": 226, "144": 227, "61": 228, "122": 229, "244": 230, "245": 231, "247": 232, "243": 233, "251": 234, "235": 235, "203": 236, "139": 237, "11": 238, "22": 239, "44": 240, "88": 241, "176": 242, "125": 243, "250": 244, "233": 245, "207": 246, "131": 247, "27": 248, "54": 249, "108": 250, "216": 251, "173": 252, "71": 253, "142": 254, "1": 255
}

const QRCODE_LOG_TABLE = {
    "0": 1, "1": 2, "2": 4, "3": 8, "4": 16, "5": 32, "6": 64, "7": 128, "8": 29, "9": 58, "10": 116, "11": 232, "12": 205, "13": 135, "14": 19, "15": 38, "16": 76, "17": 152, "18": 45, "19": 90, "20": 180, "21": 117, "22": 234, "23": 201, "24": 143, "25": 3, "26": 6, "27": 12, "28": 24, "29": 48, "30": 96, "31": 192, "32": 157, "33": 39, "34": 78, "35": 156, "36": 37, "37": 74, "38": 148, "39": 53, "40": 106, "41": 212, "42": 181, "43": 119, "44": 238, "45": 193, "46": 159, "47": 35, "48": 70, "49": 140, "50": 5, "51": 10, "52": 20, "53": 40, "54": 80, "55": 160, "56": 93, "57": 186, "58": 105, "59": 210, "60": 185, "61": 111, "62": 222, "63": 161, "64": 95, "65": 190, "66": 97, "67": 194, "68": 153, "69": 47, "70": 94, "71": 188, "72": 101, "73": 202, "74": 137, "75": 15, "76": 30, "77": 60, "78": 120, "79": 240, "80": 253, "81": 231, "82": 211, "83": 187, "84": 107, "85": 214, "86": 177, "87": 127, "88": 254, "89": 225, "90": 223, "91": 163, "92": 91, "93": 182, "94": 113, "95": 226, "96": 217, "97": 175, "98": 67, "99": 134, "100": 17, "101": 34, "102": 68, "103": 136, "104": 13, "105": 26, "106": 52, "107": 104, "108": 208, "109": 189, "110": 103, "111": 206, "112": 129, "113": 31, "114": 62, "115": 124, "116": 248, "117": 237, "118": 199, "119": 147, "120": 59, "121": 118, "122": 236, "123": 197, "124": 151, "125": 51, "126": 102, "127": 204, "128": 133, "129": 23, "130": 46, "131": 92, "132": 184, "133": 109, "134": 218, "135": 169, "136": 79, "137": 158, "138": 33, "139": 66, "140": 132, "141": 21, "142": 42, "143": 84, "144": 168, "145": 77, "146": 154, "147": 41, "148": 82, "149": 164, "150": 85, "151": 170, "152": 73, "153": 146, "154": 57, "155": 114, "156": 228, "157": 213, "158": 183, "159": 115, "160": 230, "161": 209, "162": 191, "163": 99, "164": 198, "165": 145, "166": 63, "167": 126, "168": 252, "169": 229, "170": 215, "171": 179, "172": 123, "173": 246, "174": 241, "175": 255, "176": 227, "177": 219, "178": 171, "179": 75, "180": 150, "181": 49, "182": 98, "183": 196, "184": 149, "185": 55, "186": 110, "187": 220, "188": 165, "189": 87, "190": 174, "191": 65, "192": 130, "193": 25, "194": 50, "195": 100, "196": 200, "197": 141, "198": 7, "199": 14, "200": 28, "201": 56, "202": 112, "203": 224, "204": 221, "205": 167, "206": 83, "207": 166, "208": 81, "209": 162, "210": 89, "211": 178, "212": 121, "213": 242, "214": 249, "215": 239, "216": 195, "217": 155, "218": 43, "219": 86, "220": 172, "221": 69, "222": 138, "223": 9, "224": 18, "225": 36, "226": 72, "227": 144, "228": 61, "229": 122, "230": 244, "231": 245, "232": 247, "233": 243, "234": 251, "235": 235, "236": 203, "237": 139, "238": 11, "239": 22, "240": 44, "241": 88, "242": 176, "243": 125, "244": 250, "245": 233, "246": 207, "247": 131, "248": 27, "249": 54, "250": 108, "251": 216, "252": 173, "253": 71, "254": 142, "255": 1
}

const QRCODE_MASKS = {
    0: (i, j) => (i + j) % 2 == 0, 1: (i, j) => i % 2 == 0, 2: (i, j) => j % 3 == 0, 3: (i, j) => (i + j) % 3 == 0, 4: (i, j) => (i / 2 + j / 3) % 2 == 0, 5: (i, j) => ((i * j) % 2) + ((i * j) % 3) == 0, 6: (i, j) => (((i * j) % 3) + (i * j)) % 2 == 0, 7: (i, j) => (((i * j) % 3) + i + j) % 2 == 0
}

String.prototype.removeCharIfExists = function (char) {
    if (this.charAt(this.length - 1) == char) {
        return this.substr(0, this.length - 1);
    } else {
        return this;
    }
}

String.prototype.removeFromStart = function (char) {
    if (this.charAt(0) == char) {
        return this.substr(1).removeCharIfExists(char);
    } else {
        return this;
    }
}

function isNumeric(str) {
    return !isNaN(str) && !isNaN(parseInt(str));
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

/**
 * @param  {Number[][]} bitarr
 */
function generatePNGFromBitArray(bitarr) {
    let canvas = document.createElement("canvas");
    canvas.width = bitarr.length;
    canvas.height = bitarr[0].length;
    let ctx = canvas.getContext("2d");
    let image = ctx.createImageData(canvas.width, canvas.height);
    let data = image.data;

    for (let i = 0; i < bitarr.length; i++) {
        for (let j = 0; j < bitarr[0].length; j++) {
            if (bitarr[j][i] == 0) {
                data[(i * bitarr.length + j) * 4] = 255;
                data[(i * bitarr.length + j) * 4 + 1] = 255;
                data[(i * bitarr.length + j) * 4 + 2] = 255;
                data[(i * bitarr.length + j) * 4 + 3] = 255;
            } else {
                data[(i * bitarr.length + j) * 4] = 0;
                data[(i * bitarr.length + j) * 4 + 1] = 0;
                data[(i * bitarr.length + j) * 4 + 2] = 0;
                data[(i * bitarr.length + j) * 4 + 3] = 255;
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

function ecodabar(code) {
    let output = "";
    for (let i = 0; i < code.length; i++) {
        output += CODABAR_LOOKUP_TABLE[code[i]];
    }

    return generatePNGFromBinary(CODABAR_LOOKUP_TABLE["A"] + output + CODABAR_LOOKUP_TABLE["B"]);
}

function dcodabar(code) {
    
}

function ecode128(code) {
    function charToName(c) {
        switch (c) {
        case "\n":
            return "LF";
        default:
            return c;
        }
    }

    if (code == "") return generatePNGFromBinary("0");
    let output = "";
    let sum = 0;
    let currentMode = "";

    if (isNumeric(code)) {
        console.log(parseInt(code))
        output += "11010011100";
        currentMode = "C";
        sum = 105;
    } else if (code.toUpperCase() == code) {
        output += "11010000100";
        currentMode = "A";
        sum = 103;
    } else {
        output += "11010010000";
        currentMode = "B";
        sum = 104;
    }

    for (let i = 0; i < code.length; i++) {
        let current = code[i];
        if (currentMode === "A") {
            if (Object.keys(CODE_128A_LOOKUP_TABLE).includes(current)) {
                output += CODE_128A_LOOKUP_TABLE[charToName(current)][0];
                sum += CODE_128A_LOOKUP_TABLE[charToName(current)][1] * (i + 1);
            } else {
                output += CODE_128A_LOOKUP_TABLE["Code B"][0];
                sum += CODE_128A_LOOKUP_TABLE["Code B"][1] * (i + 1);
                currentMode = "B";

                output += CODE_128B_LOOKUP_TABLE[current][0];
                sum += CODE_128B_LOOKUP_TABLE[current][1] * (i + 1);
            }
        } else if (currentMode === "B") {
            if (Object.keys(CODE_128B_LOOKUP_TABLE).includes(current)) {
                output += CODE_128B_LOOKUP_TABLE[current][0];
                sum += CODE_128B_LOOKUP_TABLE[current][1] * (i + 1);
            } else {
                output += CODE_128B_LOOKUP_TABLE["Shift A"][0];
                sum += CODE_128B_LOOKUP_TABLE["Shift A"][1] * (i + 1);
                
                output += CODE_128A_LOOKUP_TABLE[charToName(current)][0];
                sum += CODE_128A_LOOKUP_TABLE[charToName(current)][1] * (i + 1);
            }
        } else {
            if (Object.keys(CODE_128B_LOOKUP_TABLE).includes(current)) {
                output += CODE_128B_LOOKUP_TABLE[current][0];
                sum += CODE_128B_LOOKUP_TABLE[current][1] * (i + 1);
            } else {
                output += CODE_128C_LOOKUP_TABLE["Code B"][0];
                sum += CODE_128C_LOOKUP_TABLE["Code B"][1] * (i + 1);
                currentMode = "B";

                output += CODE_128B_LOOKUP_TABLE[current][0];
                sum += CODE_128B_LOOKUP_TABLE[current][1] * (i + 1);
            }
        }
    }

    sum %= 103;

    Object.entries(CODE_128A_LOOKUP_TABLE).forEach(([key, value]) => {
        if (value[1] == sum) {
            output += value[0];
            return;
        }
    });

    output += "1100011101011";

    console.log(generatePNGFromBinary(output));

    return generatePNGFromBinary(output);
}

function dcode128(code) {
    
}

function ei2of5(code) {
    if (code.length % 2 == 0) code = "0" + code;

    let checksum = 0;
    for (let i = 0; i < code.length; i += 2) {
        checksum += parseInt(code[i]);
    }

    checksum *= 3;

    for (let i = 1; i < code.length; i += 2) {
        checksum += parseInt(code[i]);
    }

    checksum %= 10;
    checksum = (checksum == 0 ? 0 : 10 - checksum);

    code += checksum.toString();

    let output = "0000";
    let a = "";
    let b = "";
    for (let i = 0; i < code.length; i += 2) {
        a = I2OF5_LOOKUP_TABLE[code[i]];
        b = I2OF5_LOOKUP_TABLE[code[i+1]];
        for (let j = 0; j < 5; j++) output += a[j] + b[j]
    }

    output += "100"

    let finalOutput = "";
    let bar = true;

    for (let i = 0; i < output.length; i++) {
        if (output[i] == "1") {
            if (bar) finalOutput += "111";
            else finalOutput += "000";
        } else {
            if (bar) finalOutput += "1";
            else finalOutput += "0";
        }
        bar = !bar;
    }

    return generatePNGFromBinary(finalOutput)
}

function di2of5(code) {
    
}

function dqrcode(code) {

}

function eqrcode(code) {
    function arrToBitstring(arr) {
        return arr.join("");
    }

    function arr2dtoBitstring(arr, index) {
        let _bs = "";
        for (let i = 0; i < arr.length; i++) {
            _bs += arr[i][index].toString();
        }
        return _bs;
    }

    function setupQRCode(_modules) {
        let size = _modules.length - 1;
        for (let i = 0; i < 7; i++) {
            _modules[i][0] = 1;
            _modules[i][6] = 1;
            _modules[0][i] = 1;
            _modules[6][i] = 1;

            _modules[i][size] = 1;
            _modules[i][size - 6] = 1;
            _modules[0][size - i] = 1;
            _modules[6][size - i] = 1;

            _modules[size - i][0] = 1;
            _modules[size - i][6] = 1;
            _modules[size][i] = 1;
            _modules[size - 6][i] = 1;
        }

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                _modules[i + 2][j + 2] = 1;
                _modules[size - (i + 2)][j + 2] = 1;
                _modules[i + 2][size - (j + 2)] = 1;
            }
        }

        // ADD ALIGNMENT PATTERNS

        for (let i = 0; i < size - 16 + 1; i += 2) {
            _modules[i + 8][6] = 1;
            _modules[6][i + 8] = 1;
        }
        
        _modules[8][size - 7] = 1;
        
        return _modules;
    }

    function determineMaskPenalty(_modules) {
        let score1 = 0;
        for (let i = 0; i < _modules.length; i++) {
            let prev = -1;
            let run = 0;
            for (let j = 0; j < _modules[i].length; j++) {
                let current = _modules[j][i];
                if (current == prev) {
                    run++;
                } else {
                    if (run >= 5) {
                        score1 += 3 + (run - 5);
                    }
                    run = 1;
                    prev = current;
                }
            }
            if (run >= 5) {
                score1 += 3 + (run - 5);
            }
        }
        for (let i = 0; i < _modules.length; i++) {
            let prev = -1;
            let run = 0;
            for (let j = 0; j < _modules[i].length; j++) {
                let current = _modules[i][j];
                if (current == prev) {
                    run++;
                } else {
                    if (run >= 5) {
                        score1 += 3 + (run - 5);
                    }
                    run = 1;
                    prev = current;
                }
            }
            if (run >= 5) {
                score1 += 3 + (run - 5);
            }
        }

        let score2 = 0;

        for (let i = 0; i < _modules.length; i++) {
            for (let j = 0; j < _modules[i].length; j++) {
                let current = _modules[j][i];
                try {
                    if (_modules[j][i+1] == current && _modules[j+1][i] == current && _modules[j+1][i+1] == current) {
                        score2 += 3;
                    }
                } catch (error) {
                    
                }
                
            }
        }

        let score3 = 0;

        for (let i = 0; i < _modules.length; i++) {
            let bs = arrToBitstring(_modules[i]);
            score3 += (bs.match(/10111010000/g) || []).length * 40;
            score3 += (bs.match(/00001011101/g) || []).length * 40;

            bs = arr2dtoBitstring(_modules, i);
            score3 += (bs.match(/10111010000/g) || []).length * 40;
            score3 += (bs.match(/00001011101/g) || []).length * 40;
        }

        let score4 = 0;
        let totalSize = _modules.length * _modules[0].length;
        let darkmodules = 0;
        for (let i = 0; i < _modules.length; i++) {
            for (let j = 0; j < _modules.length; j++) {
                darkmodules += parseInt(_modules[i][j]);
            }
        }
        let darkmodulesPercentage = (darkmodules / totalSize) * 100;
        let upper = Math.abs((Math.ceil(darkmodulesPercentage / 5) * 5) - 50) / 5;
        let lower = Math.abs((Math.floor(darkmodulesPercentage / 5) * 5) - 50) / 5;
        
        score4 = (upper < lower ? upper * 10 : lower * 10);

        return score1 + score2 + score3 + score4;
    }

    function applyMask(_modules, mask) {
        let size = _modules.length - 1;
        let mods = _modules;
        console.log(mods[20][19]);
        for (let i = 0; i < mods.length; i++) {
            for (let j = 0; j < mods[0].length; j++) {
                if (!((i < 8 && j < 8) || (i > size - 8 && j < 8) || (i < 8 && j > size - 8) || (i == 8 && j == size - 7) || (i == 6) || (j == 6))) {
                    console.log(i, j, mods[i][j]);
                    if (mask(i, j)) {
                        console.log(i, j, mods[i][j]);
                        mods[i][j] = 1 - mods[i][j];
                        console.log(i, j, mods[i][j]);
                    }
                }
            }
        }
        return _modules;
    }

    function fillFormatString(_modules, format) {
        let size = _modules.length - 1;

        let pos = 0;
        for (let i = 0; i < 7; i++) {
            _modules[8][size - i] = parseInt(format[pos++]);
        }
        for (let i = 0; i < 8; i++) {
            _modules[size - (7 - i)][8] = parseInt(format[pos++]);
        }

        pos = 0;
        for (let i = 0; i < 6; i++) {
            _modules[i][8] = parseInt(format[pos++]);
        }
        _modules[7][8] = parseInt(format[pos++]);
        _modules[8][8] = parseInt(format[pos++]);
        _modules[8][7] = parseInt(format[pos++]);

        for (let i = 0; i < 6; i++) {
            _modules[8][5 - i] = parseInt(format[pos++]);
        }

        return _modules;
    }

    code = "HELLO WORLD";

    // CURRENTLY ONLY ALPHANUMERIC MODE
    let ecl = "Q";  // Error Correction Level
    let V = 1;  // version

    let decimals = [];
    for (let i = 0; i < code.length; i++) {
        decimals.push(QRCODE_ALPHANUMERIC_LOOKUP_TABLE[code[i]]);
    }

    let bitstring = "";
    let current = 0;
    for (let i = 0; i < decimals.length; i += 2) {
        if (decimals[i+1] !== undefined) {
            current = decimals[i] * 45;
            current += decimals[i+1];
            bitstring += current.toString(2).padStart(11, "0");
        } else {
            current = decimals[i];
            bitstring += current.toString(2).padStart(6, "0");
        }
    }
    bitstring = "0010" + code.length.toString(2).padStart(9, "0") + bitstring
    bitstring += "0000";  // NOT DYNAMIC
    bitstring += "00";  // NOT DYNAMIC
    bitstring += "111011000001000111101100";  // NOT DYNAMIC

    let g1b1 = bitstring.match(/.{1,8}/g);
    for (let i = 0; i < g1b1.length; i++) {
        g1b1[i] = parseInt(g1b1[i], 2);
    }

    for (let i = 0; i < 13; i++) {
        let generator = [0, 74, 152, 176, 100, 86, 100, 106, 104, 130, 218, 206, 140, 78];
        let alpha = QRCODE_ANTILOG_TABLE[g1b1[0].toString()];
        for (let j = 0; j < generator.length; j++) {
            generator[j] = QRCODE_LOG_TABLE[(generator[j] + alpha) % 255];
        }

        if (g1b1.length <= 13) g1b1.push(0);
        
        for (let j = 0; j < g1b1.length; j++) {
            g1b1[j] = generator[j] ^ g1b1[j];
        }

        g1b1.shift();
    }

    for (let i = 0; i < g1b1.length; i++) {
        bitstring += g1b1[i].toString(2).padStart(8, "0");
    }

    var modules = [];
    for (let i = 0; i < 21; i++) {
        modules[i] = [];
        for (let j = 0; j < 21; j++) {
            modules[i][j] = 0;
        }
    }

    //bitstring = "0010000001011011000010110111100011010001011100101101110001001101010000110100000011101100000100011110110000010001111011000001000111000100001000110010011101110111111010111101011111100111111000100101110100010111"
    modules = setupQRCode(modules);

    let pos = 0;

    let s = 20;  // size

    console.log(bitstring);  // 0010000001011011000010110111100011010001011100101101110001001101010000110100000011101100000100011110110010101000010010000001011001010010110110010011011010011100000000000010111000001111101101000111101000010000

    for (let i = 0; i < 12; i++) {
        modules[s][s-i] = parseInt(bitstring[pos++]);
        modules[s-1][s-i] = parseInt(bitstring[pos++]);
    }

    for (let i = 0; i < 12; i++) {
        modules[s-2][s-(11-i)] = parseInt(bitstring[pos++]);
        modules[s-3][s-(11-i)] = parseInt(bitstring[pos++]);
    }

    for (let i = 0; i < 12; i++) {
        modules[s-4][s-i] = parseInt(bitstring[pos++]);
        modules[s-5][s-i] = parseInt(bitstring[pos++]);
    }

    for (let i = 0; i < 12; i++) {
        modules[s-6][s-(11-i)] = parseInt(bitstring[pos++]);
        modules[s-7][s-(11-i)] = parseInt(bitstring[pos++]);
    }
    
    for (let i = 0; i < 14; i++) {
        modules[s-8][s-i] = parseInt(bitstring[pos++]);
        modules[s-9][s-i] = parseInt(bitstring[pos++]);
    }
    for (let i = 5; i >= 0; i--) {
        modules[s-8][i] = parseInt(bitstring[pos++]);
        modules[s-9][i] = parseInt(bitstring[pos++]);
    }

    for (let i = 0; i < 6; i++) {
        modules[s-10][i] = parseInt(bitstring[pos++]);
        modules[s-11][i] = parseInt(bitstring[pos++]);
    }
    for (let i = 0; i < 14; i++) {
        modules[s-10][s-(13-i)] = parseInt(bitstring[pos++]);
        modules[s-11][s-(13-i)] = parseInt(bitstring[pos++]);
    }

    for (let i = 0; i < 4; i++) {
        modules[8][s-i-8] = parseInt(bitstring[pos++]);
        modules[7][s-i-8] = parseInt(bitstring[pos++]);
    }

    for (let i = 0; i < 4; i++) {
        modules[5][i+8] = parseInt(bitstring[pos++]);
        modules[4][i+8] = parseInt(bitstring[pos++]);
    }

    for (let i = 0; i < 4; i++) {
        modules[3][s-i-8] = parseInt(bitstring[pos++]);
        modules[2][s-i-8] = parseInt(bitstring[pos++]);
    }

    for (let i = 0; i < 4; i++) {
        modules[1][i+8] = parseInt(bitstring[pos++]);
        modules[0][i+8] = parseInt(bitstring[pos++]);
    }

    console.log(modules);

    let scores = [];
    //scores.push(determineMaskPenalty(applyMask(modules, QRCODE_MASKS[0])));
    //scores.push(determineMaskPenalty(applyMask(modules, QRCODE_MASKS[1])));
    //scores.push(determineMaskPenalty(applyMask(modules, QRCODE_MASKS[2])));
    //scores.push(determineMaskPenalty(applyMask(modules, QRCODE_MASKS[3])));
    //scores.push(determineMaskPenalty(applyMask(modules, QRCODE_MASKS[4])));
    //scores.push(determineMaskPenalty(applyMask(modules, QRCODE_MASKS[5])));
    //scores.push(determineMaskPenalty(applyMask(modules, QRCODE_MASKS[6])));
    //scores.push(determineMaskPenalty(applyMask(modules, QRCODE_MASKS[7])));

    //let bestMask = scores.indexOf(Math.min(...scores));

    let bestMask = 6;

    modules = applyMask(modules, QRCODE_MASKS[bestMask]);

    let formatString = "00" + bestMask.toString(2).padStart(3, "0") + "0000000000";

    //formatString = formatString.removeFromStart("0");

    // let generator = "10100110111";
    // generator.padEnd(formatString.length, "0");
    // let newString = "";
    // for (let i = 0; i < generator.length; i++) {
    //     newString += (parseInt(generator[i]) ^ parseInt(formatString[i])).toString();
    // }

    let finalFormatString = "";
    let mask = "101010000010010";
    for (let i = 0; i < formatString.length; i++) {
        finalFormatString += (parseInt(formatString[i]) ^ parseInt(mask[i])).toString();
    }

    finalFormatString = "010111011011010"

    modules = fillFormatString(modules, finalFormatString);

    return generatePNGFromBitArray(modules);
}
