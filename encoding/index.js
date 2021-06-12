function autoUpdateHash() {
    if (document.getElementById("autoHash").checked == 1) {
        updateHash();
    }
}

function updateHash() {
    const data = document.getElementById("input").value;
    const algos = (hash) => document.getElementById(hash).checked;
    var output = {};

    if (algos("md2")) {
        output["MD2"] = md2(data);
    }
    if (algos("md4")) {
        output["MD4"] =  md4(data);
    }
    if (algos("md5")) {
        output["MD5"] =  md5(data);
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
    const table = document.getElementById("outputTable");
    jQuery("[id=dynamic]").remove(); 
    Object.entries(output).forEach(([key, value]) => {
        const row = table.insertRow(-1);
        row.id = "dynamic"
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);

        cell1.innerHTML = key;
        cell2.innerHTML = value;
    });
    $('[id=mainBox]').css({'padding-top': (34 * Object.entries(output).length.toString()) + 'px'});
}

$(document).ready(function() {

});