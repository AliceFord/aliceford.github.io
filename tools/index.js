function autoUpdateHash() {
    if (document.getElementById("autoHash").checked == 1) {
        updateHash();
    }
}

var currentInputMethod = "ascii";

function changeInputMethod(method) {
    var data = jQuery("[class=inputMethod]");
    for (let i = 0; i < data.length; i++) {
        if (data[i].value != method) {
            data[i].checked = false;
        }
    }
    var element;

    if (method == "ascii" || method == "bin" || method == "hex") {
        element = document.createElement("textarea");
        element.cols = 30;
        element.classList.add("form-control");
        element.style.minHeight = "100px";
        element.style.maxHeight = "500px";
        element.style.resize = "vertical";
        element.id = "dataEntry";
        element.placeholder = "Input"
        element.oninput = function(){autoUpdateHash()};
    } else if (method == "file") {
        element = document.createElement("input");
        element.type = "file";
        element.id = "dataEntry";
    }
    const replace = document.getElementById("dataEntry");
    replace.parentNode.replaceChild(element, replace);

    currentInputMethod = method;
}

function updateColumns() {
    const table = document.getElementById("tableHeaderBox");
    jQuery("[class=tableHeader]").remove(); 
    if (document.getElementById("outputHex").checked) {
        var cell = table.insertCell(-1);
        cell.classList.add("tableHeader");
        cell.innerHTML = "Hex";
    }
    if (document.getElementById("outputDec").checked) {
        var cell = table.insertCell(-1);
        cell.classList.add("tableHeader");
        cell.innerHTML = "Dec";
    }
    if (document.getElementById("outputOct").checked) {
        var cell = table.insertCell(-1);
        cell.classList.add("tableHeader");
        cell.innerHTML = "Oct";
    }
    if (document.getElementById("outputBin").checked) {
        var cell = table.insertCell(-1);
        cell.classList.add("tableHeader");
        cell.innerHTML = "Bin";
    }
    updateHash();
}

function updateHash() {
    var data;
    if (currentInputMethod == "ascii") {
        data = document.getElementById("dataEntry").value;
        doHash(data);
    } else if (currentInputMethod == "file") {
        var file = document.getElementById("dataEntry").files[0];
        var fr = new FileReader();
        fr.readAsText(file);
        fr.onload = function() {doHash(fr.result)};
    } else if (currentInputMethod == "bin") {
        data = document.getElementById("dataEntry").value;
        if (data == "") {
            doHash("");
            return;
        }
        let dataArr = data.match(/.{1,8}/g);
        let outputInAscii = "";
        dataArr.forEach(element => {
            outputInAscii += String.fromCharCode(parseInt(element, 2));
        });
        doHash(outputInAscii);
    } else if (currentInputMethod == "hex") {
        data = document.getElementById("dataEntry").value;
        if (data == "") {
            doHash("");
            return;
        }
        let dataArr = data.match(/.{1,2}/g);
        let outputInAscii = "";
        dataArr.forEach(element => {
            outputInAscii += String.fromCharCode(parseInt(element, 16));
        });
        doHash(outputInAscii);
    }
}

function doHash(data) {
    const algos = (hash) => document.getElementById(hash).checked;
    var output = {};

    if (algos("md2")) {
        output["MD2"] = md2(data);
    }
    if (algos("md4")) {
        output["MD4"] = md4(data);
    }
    if (algos("md5")) {
        output["MD5"] = md5(data);
    }
    if (algos("crc8")) {
        output["CRC-8"] = crc8(data, 0x00, 0x07, 0x00, false, false);
        output["CRC-8/AUTOSAR"] = crc8(data, 0xff, 0x2f, 0xff, false, false);
        output["CRC-8/BLUETOOTH"] = crc8(data, 0x00, 0xa7, 0x00, true, true);
        output["CRC-8/CDMA2000"] = crc8(data, 0xff, 0x9b, 0x00, false, false);
        output["CRC-8/DARC"] = crc8(data, 0x00, 0x39, 0x00, true, true);
        output["CRC-8/DVB-S2"] = crc8(data, 0x00, 0xd5, 0x00, false, false);
        output["CRC-8/GSM-A"] = crc8(data, 0x00, 0x1d, 0x00, false, false);
        output["CRC-8/GSM-B"] = crc8(data, 0x00, 0x49, 0xff, false, false);
        output["CRC-8/I-432-1"] = crc8(data, 0x00, 0x07, 0x55, false, false);
        output["CRC-8/I-CODE"] = crc8(data, 0xfd, 0x1d, 0x00, false, false);
        output["CRC-8/LTE"] = crc8(data, 0x00, 0x9b, 0x00, false, false);
        output["CRC-8/MAXIM-DOW"] = crc8(data, 0x00, 0x31, 0x00, true, true);
        output["CRC-8/MIFARE-MAD"] = crc8(data, 0xc7, 0x1d, 0x00, false, false);
        output["CRC-8/NRSC-5"] = crc8(data, 0xff, 0x31, 0x00, false, false);
        output["CRC-8/OPENSAFETY"] = crc8(data, 0x00, 0x2f, 0x00, false, false);
        output["CRC-8/ROHC"] = crc8(data, 0xff, 0x07, 0x00, true, true);
        output["CRC-8/SAE-J1850"] = crc8(data, 0xff, 0x1d, 0xff, false, false);
        output["CRC-8/SMBUS"] = crc8(data, 0x00, 0x07, 0x00, false, false);
        output["CRC-8/TECH-3250"] = crc8(data, 0xff, 0x1d, 0x00, true, true);
        output["CRC-8/WCDMA"] = crc8(data, 0x00, 0x9b, 0x00, true, true);
    }
    if (algos("crc16")) {
        output["CRC-16/ARC"] = crc16(data, 0x0000, 0x8005, 0x0000, true , true );
        output["CRC-16/CDMA2000"] = crc16(data, 0xffff, 0xc867, 0x0000, false, false);
        output["CRC-16/CMS"] = crc16(data, 0xffff, 0x8005, 0x0000, false, false);
        output["CRC-16/DDS-110"] = crc16(data, 0x800d, 0x8005, 0x0000, false, false);
        output["CRC-16/DECT-R"] = crc16(data, 0x0000, 0x0589, 0x0001, false, false);
        output["CRC-16/DECT-X"] = crc16(data, 0x0000, 0x0589, 0x0000, false, false);
        output["CRC-16/DNP"] = crc16(data, 0x0000, 0x3d65, 0xffff, true , true );
        output["CRC-16/EN-13757"] = crc16(data, 0x0000, 0x3d65, 0xffff, false, false);
        output["CRC-16/GENIBUS"] = crc16(data, 0xffff, 0x1021, 0xffff, false, false);
        output["CRC-16/GSM"] = crc16(data, 0x0000, 0x1021, 0xffff, false, false);
        output["CRC-16/IBM-3740"] = crc16(data, 0xffff, 0x1021, 0x0000, false, false);
        output["CRC-16/IBM-SDLC"] = crc16(data, 0xffff, 0x1021, 0xffff, true , true );
        output["CRC-16/ISO-IEC-14443-3-A"] = crc16(data, 0xc6c6, 0x1021, 0x0000, true , true );
        output["CRC-16/KERMIT"] = crc16(data, 0x0000, 0x1021, 0x0000, true , true );
        output["CRC-16/LJ1200"] = crc16(data, 0x0000, 0x6f63, 0x0000, false, false);
        output["CRC-16/MAXIM-DOW"] = crc16(data, 0x0000, 0x8005, 0xffff, true , true );
        output["CRC-16/MCRF4XX"] = crc16(data, 0xffff, 0x1021, 0x0000, true , true );
        output["CRC-16/MODBUS"] = crc16(data, 0xffff, 0x8005, 0x0000, true , true );
        output["CRC-16/NRSC-5"] = crc16(data, 0xffff, 0x080b, 0x0000, true , true );
        output["CRC-16/OPENSAFETY-A"] = crc16(data, 0x0000, 0x5935, 0x0000, false, false);
        output["CRC-16/OPENSAFETY-B"] = crc16(data, 0x0000, 0x755b, 0x0000, false, false);
        output["CRC-16/PROFIBUS"] = crc16(data, 0xffff, 0x1dcf, 0xffff, false, false);
        output["CRC-16/RIELLO"] = crc16(data, 0xb2aa, 0x1021, 0x0000, true , true );
        output["CRC-16/SPI-FUJITSU"] = crc16(data, 0x1d0f, 0x1021, 0x0000, false, false);
        output["CRC-16/T10-DIF"] = crc16(data, 0x0000, 0x8bb7, 0x0000, false, false);
        output["CRC-16/TELEDISK"] = crc16(data, 0x0000, 0xa097, 0x0000, false, false);
        output["CRC-16/TMS37157"] = crc16(data, 0x89ec, 0x1021, 0x0000, true , true );
        output["CRC-16/UMTS"] = crc16(data, 0x0000, 0x8005, 0x0000, false, false);
        output["CRC-16/USB"] = crc16(data, 0xffff, 0x8005, 0xffff, true , true );
        output["CRC-16/XMODEM"] = crc16(data, 0x0000, 0x1021, 0x0000, false, false);
    }
    if (algos("crc32")) {
        output["CRC-32/AIXM"] = crc32(data, 0x00000000, 0x814141ab, 0x00000000, false, false);
        output["CRC-32/AUTOSAR"] = crc32(data, 0xffffffff, 0xf4acfb13, 0xffffffff, true , true );
        output["CRC-32/BASE91-D"] = crc32(data, 0xffffffff, 0xa833982b, 0xffffffff, true , true );
        output["CRC-32/BZIP2"] = crc32(data, 0xffffffff, 0x04c11db7, 0xffffffff, false, false);
        output["CRC-32/CD-ROM-EDC"] = crc32(data, 0x00000000, 0x8001801b, 0x00000000, true , true );
        output["CRC-32/CKSUM"] = crc32(data, 0x00000000, 0x04c11db7, 0xffffffff, false, false);
        output["CRC-32/ISCSI"] = crc32(data, 0xffffffff, 0x1edc6f41, 0xffffffff, true , true );
        output["CRC-32/ISO-HDLC"] = crc32(data, 0xffffffff, 0x04c11db7, 0xffffffff, true , true );
        output["CRC-32/JAMCRC"] = crc32(data, 0xffffffff, 0x04c11db7, 0x00000000, true , true );
        output["CRC-32/MPEG-2"] = crc32(data, 0xffffffff, 0x04c11db7, 0x00000000, false, false);
        output["CRC-32/XFER"] = crc32(data, 0x00000000, 0x000000af, 0x00000000, false, false);
    }
    if (algos("crc64")) {
        output["CRC-64/ECMA-182"] = crc64(data, 0x0000000000000000n, 0x42f0e1eba9ea3693n, 0x0000000000000000n, false, false);
        output["CRC-64/GO-ISO"] = crc64(data, 0xffffffffffffffffn, 0x000000000000001bn, 0xffffffffffffffffn, true , true );
        output["CRC-64/WE"] = crc64(data, 0xffffffffffffffffn, 0x42f0e1eba9ea3693n, 0xffffffffffffffffn, false, false);
        output["CRC-64/XZ"] = crc64(data, 0xffffffffffffffffn, 0x42f0e1eba9ea3693n, 0xffffffffffffffffn, true , true );
    }
    if (algos("bsd")) {
        output["BSD"] = bsd(data);
    }
    if (algos("sysv")) {
        output["SYSV"] = sysv(data);
    }
    if (algos("fletcher8")) {
        output["Fletcher-8"] = fletcher8(data);
    }
    if (algos("fletcher16")) {
        output["Fletcher-16"] = fletcher16(data);
    }
    if (algos("fletcher32")) {
        output["Fletcher-32"] = fletcher32(data);
    }
    if (algos("fletcher64")) {
        output["Fletcher-64"] = fletcher64(data);
    }
    if (algos("alder32")) {
        output["Alder-32"] = alder32(data);
    }
    if (algos("lrc")) {
        output["Longitudinal Redundancy Check"] = lrc(data);
    }
    if (algos("one-at-a-time")) {
        output["Jenkins One at a Time"] = oneAtATime(data);
    }
    if (algos("djb2")) {
        output["djb2"] = djb2(data);
    }
    if (algos("b64")) {
        output["Base64"] = base64(data);
    }
    if (algos("b64url")) {
        output["Base64URL"] = base64URL(data);
    }
    if (algos("a85")) {
        output["Ascii85"] = ascii85(data);
    }
    const table = document.getElementById("outputTable");
    jQuery("[class=dynamic]").remove(); 
    Object.entries(output).forEach(([key, value]) => {
        const currentValue = value;
        const row = table.insertRow(-1);
        row.classList.add("dynamic");

        var cell1 = row.insertCell(0);
        cell1.innerHTML = key;
        
        var headers = jQuery("[class=tableHeader]").map(function() {
            return this.innerHTML;
        }).get();
        if (key == "Base-64" || key == "Ascii85") {
            var cell = row.insertCell(1);
            cell.colSpan = 4;
            cell.innerHTML = currentValue;
        } else {
            headers.forEach((value, index) => {
                var cell = row.insertCell(index + 1);
                if (value == "Hex") {
                    cell.innerHTML = currentValue;
                } else if (value == "Dec") {
                    var maxLength = "";
                    for (let i = 0; i < currentValue.length; i++) maxLength += "f";
                    cell.innerHTML = parseInt(currentValue, 16).toString(10).padStart(parseInt(maxLength, 16).toString(10).length, "0");
                } else if (value == "Oct") {
                    cell.innerHTML = parseInt(currentValue, 16).toString(8).padStart(currentValue.length + (1 * ((currentValue.length - 1) / 3)) + 1, "0");
                } else if (value == "Bin") {
                    cell.innerHTML = parseInt(currentValue, 16).toString(2).padStart(currentValue.length * 4, "0");
                }
            });
        }
    });
    $('[id=mainBox]').css({'padding-top': 100 + (34 * Object.entries(output).length.toString()) + 'px'});
}

$(document).ready(function() {

});