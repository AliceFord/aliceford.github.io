function ascii85(message) {
    var strNum = "";
    var output = "";
    for (let i = 0; i < message.length; i++) strNum += message.charCodeAt(i).toString(16).padStart(2, "0");
    for (let i = 0; i < strNum.length; i += 8) {
        var currentWithoutPadding = strNum.substring(i, i+8);
        var current = currentWithoutPadding.padEnd(8, "0");
        var num = parseInt(current, 16);
        output += String.fromCharCode(Math.floor((num / 52200625) % 85) + 33);
        output += String.fromCharCode(Math.floor((num / 614125) % 85) + 33);
        output += String.fromCharCode(Math.floor((num / 7225) % 85) + 33);
        output += String.fromCharCode(Math.floor((num / 85) % 85) + 33);
        output += String.fromCharCode(((num) % 85) + 33);
        if (currentWithoutPadding.length != current.length && i + 8 > strNum.length) {
            output = output.substring(0, output.length - (4 - (currentWithoutPadding.length / 2)));
        }
    }

    return output;
}