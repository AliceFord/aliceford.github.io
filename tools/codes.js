function autoUpdate() {
    if (document.getElementById("autoGenerate").checked == 1) {
        update();
    }
}

function update() {
    const data = document.getElementById("input").value;
    const algos = (hash) => document.getElementById(hash).checked;
    var output = {};

    if (algos("micro-qr-m1")) {
        output["Micro QR M1"] = microQR(data);
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

        headers.forEach((value, index) => {
            var cell = row.insertCell(index + 1);
            cell.innerHTML = currentValue;
        });
    });
    $('[id=mainBox]').css({'padding-top': 100 + (34 * Object.entries(output).length.toString()) + 'px'});
}

$(document).ready(function() {

});