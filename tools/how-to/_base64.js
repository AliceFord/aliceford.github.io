function roundUp(num, round) {
    if (num % round == 0) return num;
    else return num + (4 - (num % round));
}

function base64URL(message) {
    return base64(message, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_");
}

function base64Verbose(message, alphabet="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/") {
    var outputData = []
    var binString = "";
    for (let i = 0; i < message.length; i++) {
        binString += message.charCodeAt(i).toString(2).padStart(8, "0");
    }
    outputData.push(binString);

    var result = "";
    for (let i = 0; i < binString.length; i += 6) {
        let currentString = binString.substring(i, i+6);
        currentString = currentString.padEnd(6, "0");
        result += alphabet[parseInt(currentString, 2)];
        outputData.push(currentString);
    }
    outputData.push(result.length % 4 == 0 ? result : result.padEnd(roundUp(result.length, 4), "="));
    return outputData;
}

function refreshScreenElements(output) {
    document.getElementById("output").innerHTML = output[output.length-1];
    document.getElementById("binString").innerHTML = output[0];
    var currentStringValue = "";
    output.forEach((value, index) => {
        if (index > 0 && index < output.length - 1)
            currentStringValue += value + ",";
    });
    document.getElementById("currentString").innerHTML = currentStringValue.substr(0, currentStringValue.length - 1);
}
