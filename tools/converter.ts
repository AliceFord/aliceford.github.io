const typeOfFileType = {"ico": "image", "png": "image", "bmp": "image", "Unknown": "unknown"}

var fileType = "Unknown";

function updateFile() {
    var file = (<HTMLInputElement>document.getElementById("dataEntry")).files[0];
    var fr = new FileReader();
    fr.readAsArrayBuffer(file);
    //fr.readAsText(file);
    fr.onload = function() {getFileType(<ArrayBuffer>fr.result)};
}

function arrLenEqual(a: Uint8Array, b: Uint8Array) {
    return b.every((val, index) => val === a[index]);
}

function getFileType(data: ArrayBuffer) {
    let dataView = new Uint8Array(data);
    if (arrLenEqual(dataView, new Uint8Array([0x49, 0x49, 0x2a, 0x00]))) fileType = "tiff";
    else if (arrLenEqual(dataView, new Uint8Array([0x00, 0x00, 0x01, 0x00, 0x01, 0x00]))) fileType = "ico";
    else if (arrLenEqual(dataView, new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) fileType = "png";
    else if (arrLenEqual(dataView, new Uint8Array([0x42, 0x4d]))) fileType = "bmp";
    else fileType = "Unknown";

    document.getElementById("fileType").innerHTML = "File Type: " + fileType;

    convert(new DataView(data));

    // console.log(dataView.slice(0, 8));
}

function convert(data: DataView) {
    switch (fileType) {
    case "ico":
        fromIco(data);
        break;
    case "bmp":
        fromBmp(data);
        break;
    default:
        break;
    }

    // switch (typeOfFileType[fileType]) {
    // case "image":
    //     if ((<HTMLInputElement>document.getElementById("tiff")).checked) {
    //         toTiff(data);
    //     }
    //     if ((<HTMLInputElement>document.getElementById("ico")).checked) {
    //         toIco(data);
    //     }
    //     break;
    // default:
    //     break;
    // }
}



function toTiff(data: Uint8Array) {

}

function toIco(data) {

}

function fromPNG(data: DataView) {
    let ihdrChunkLength = data[8] << 24 | data[9] << 16 | data[10] << 8 | data[11];
    if (ihdrChunkLength !== 13) {
        console.log("IHDR Chunk incorrect length!");
        return;
    }

}

function toPNG(data: DataView) {
    
}

function fromBmp(data: DataView) {
    let size = data.getUint32(2, true);
    let offset = data.getUint32(0x0a, true);

    let dibHeaderSize = data.getUint32(0x0e, true);
    let width = data.getInt32(0x12, true);
    let height = data.getInt32(0x16, true);
    let bpp = data.getUint16(0x1c, true);
    let compressionMethod = data.getUint32(0x1e, true);
    let rawSize = data.getUint32(0x22, true);
    let horizontalRes = data.getUint32(0x26, true);
    let verticalRes = data.getUint32(0x2a, true);
    let coloursInPalette = data.getUint32(0x2e, true);
    let importantColours = data.getUint32(0x32, true);

    var decodedData = new Array(height).fill(new Array(width).fill(new Array(Math.ceil(bpp / 8.0)).fill(0)));

    switch (compressionMethod) {
    case 0x0:
        if (bpp == 24) {
            for (let i = 0; i < height; i++) {
                for (let j = 0; j < width; j++) {
                    decodedData[i][j][0] = data.getUint8(offset + (j + i * width) * 3 + width * 2);
                    console.log(JSON.parse(JSON.stringify(decodedData)));
                    decodedData[i][j][1] = data.getUint8(offset + (j + i * width) * 3 + 1 + width * 2);
                    decodedData[i][j][2] = data.getUint8(offset + (j + i * width) * 3 + 2 + width * 2);
                    console.log(JSON.parse(JSON.stringify(decodedData)));
                }
            }
        }
        break;
    case 0x1:
        break;
    default:
        break;
    }
}

function fromIco(data: DataView) {
    let width = data[6] === 0x00 ? 256 : data[6];
    let height = data[7] === 0x00 ? 256 : data[7];
    let colourCount = data[8] === 0x00 ? 256 : data[8];
    let colourPlanes = data[11] << 8 | data[10];
    let bpp = data[13] << 8 | data[12];
    let size = data[17] << 24 | data[16] << 16 | data[15] << 8 | data[14];
    let offset = data[21] << 24 | data[20] << 16 | data[19] << 8 | data[18];
    console.log(offset);
}
