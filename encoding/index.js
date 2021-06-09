function updateHash() {
    const data = document.getElementById("input").value;
    const algo = document.getElementById("inputAlgo").value;
    var output = "Invalid options.";
    switch (algo) {
    case "MD2":
        output = md2(data);
        break;
    case "MD4":
        output = md4(data);
        break;
    case "MD5":
        output = md5(data);
        break;
    default:
        break;
    }
    const outputTextarea = document.getElementById("output");
    outputTextarea.innerHTML = output;
}

$(document).ready(function() {

});