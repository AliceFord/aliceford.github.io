var settings = {
    qrVersion: 0,
    qrErrorCorrection: "Q",
    qrMask: -1
};

var currentInputMethod = "ascii";

function doHash(data) {
    const algos = (hash) => document.getElementById(hash).checked;
    var output = {};

    if (currentInputMethod === "file") {
        if (algos("code39")) {
            output["Code39"] = dcode39(data);
        }
        if (algos("codabar")) {
            output["Codabar"] = dcodabar(data);
        }
        if (algos("code128")) {
            output["Code128"] = dcode128(data);
        }
        if (algos("i2of5")) {
            output["Interleaved 2 of 5"] = di2of5(data);
        }
        if (algos("qrcode")) {
            output["QR Code"] = dqrcode(data);
        }
    } else {
        if (algos("code39")) {
            output["Code39"] = ecode39(data);
        }
        if (algos("codabar")) {
            output["Codabar"] = ecodabar(data);
        }
        if (algos("code128")) {
            output["Code128"] = ecode128(data);
        }
        if (algos("i2of5")) {
            output["Interleaved 2 of 5"] = ei2of5(data);
        }
        if (algos("qrcode")) {
            output["QR Code"] = eqrcode(data, settings);
        }
    }

    const table = document.getElementById("outputTable");
    jQuery("[class=dynamic]").remove(); 
    Object.entries(output).forEach(([key, value]) => {
        const currentValue = value;
        const row = table.insertRow(-1);
        row.classList.add("dynamic");

        var cell1 = row.insertCell(0);
        cell1.innerHTML = key;
        var cell2 = row.insertCell(1);
        if (currentInputMethod == "file") {
            cell2.innerHTML = currentValue;
        } else {
            var img = document.createElement("img");
            img.src = currentValue;

            cell2.appendChild(img);
        }
    });
    $("[id=mainBox]").css({"padding-top": 100 + (34 * Object.entries(output).length.toString()) + "px"});
}

function updateHash() {
    var data;
    if (currentInputMethod === "ascii") {
        data = document.getElementById("dataEntry").value;
        doHash(data);
    } else if (currentInputMethod === "file") {
        var file = document.getElementById("dataEntry").files[0];
        var fr = new FileReader();
        fr.readAsText(file);
        fr.onload = function() { doHash(fr.result); };
    } else if (currentInputMethod === "bin") {
        data = document.getElementById("dataEntry").value;
        if (data === "") {
            doHash("");
            return;
        }
        let dataArr = data.match(/.{1,8}/g);
        let outputInAscii = "";
        dataArr.forEach((element) => {
            outputInAscii += String.fromCharCode(parseInt(element, 2));
        });
        doHash(outputInAscii);
    } else if (currentInputMethod === "hex") {
        data = document.getElementById("dataEntry").value;
        if (data == "") {
            doHash("");
            return;
        }
        let dataArr = data.match(/.{1,2}/g);
        let outputInAscii = "";
        dataArr.forEach((element) => {
            outputInAscii += String.fromCharCode(parseInt(element, 16));
        });
        doHash(outputInAscii);
    }
}


function autoUpdateHash() {
    if (document.getElementById("autoGenerate").checked === true) {
        updateHash();
    }
}

function updateSettings() {
    settings.qrVersion = parseInt(document.getElementById("qrVersion").value);
    settings.qrErrorCorrection = document.getElementById("qrErrorCorrection").value;
    settings.qrMask = parseInt(document.getElementById("qrMask").value);

    autoUpdateHash();
}

function changeInputMethod(method) {
    var data = jQuery("[class=inputMethod]");
    for (let i = 0; i < data.length; i++) {
        if (data[i].value !== method) {
            data[i].checked = false;
        }
    }
    var element;

    if (method === "ascii" || method === "bin" || method === "hex") {
        element = document.createElement("textarea");
        element.cols = 30;
        element.classList.add("form-control");
        element.style.minHeight = "100px";
        element.style.maxHeight = "500px";
        element.style.resize = "vertical";
        element.id = "dataEntry";
        element.placeholder = "Input";
        element.oninput = function(){ autoUpdateHash(); };
    } else if (method === "file") {
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
        let cell = table.insertCell(-1);
        cell.classList.add("tableHeader");
        cell.innerHTML = "Hex";
    }
    if (document.getElementById("outputDec").checked) {
        let cell = table.insertCell(-1);
        cell.classList.add("tableHeader");
        cell.innerHTML = "Dec";
    }
    if (document.getElementById("outputOct").checked) {
        let cell = table.insertCell(-1);
        cell.classList.add("tableHeader");
        cell.innerHTML = "Oct";
    }
    if (document.getElementById("outputBin").checked) {
        let cell = table.insertCell(-1);
        cell.classList.add("tableHeader");
        cell.innerHTML = "Bin";
    }
    updateHash();
}

$(document).ready(function() {

});