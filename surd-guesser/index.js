const mainTable = document.getElementById("main-table");

var timeTableTracked = [];

updateTable("");

var num;

function updateTable(query) {
    num = parseFloat(query);

    if (isNaN(num)) {
        return;  // fix later
    }

    mainTable.innerHTML = "";
    let outData = {};
    // a + b -> subtract a, then divide by b

    const divCount = 10;
    const limit = Math.round((num ** 2) * divCount);
    const lowerLimit = Math.round(num);

    for (let a = lowerLimit; a <= limit; a++) {
        for (let b = 0; b <= a; b++) {
            for (let aDiv = 1; aDiv <= divCount; aDiv++) {
                if (b === 0) {
                    outData[[a, b, aDiv, 1]] = [Math.sqrt(a) / aDiv + Math.sqrt(b), Math.abs(Math.sqrt(a) / aDiv + Math.sqrt(b) - num)];
                    continue;
                }
                for (let bDiv = 1; bDiv <= divCount; bDiv++) {
                    outData[[a, b, aDiv, bDiv]] = [Math.sqrt(a) / aDiv + Math.sqrt(b) / bDiv, Math.abs(Math.sqrt(a) / aDiv + Math.sqrt(b) / bDiv - num)];
                }
            }
        }
    }

    mainTable.innerHTML = "";

    // sort outData by value - https://stackoverflow.com/questions/1069666/sorting-object-property-by-values

    let sortable = [];
    for (var key in outData) {
        sortable.push([key, outData[key]]);
    }

    sortable.sort(function(a, b) {
        return a[1][1] - b[1][1];
    });

    for (let i = sortable.length - 1; i > 0; i--) {
        if (sortable[i][1][0] === sortable[i-1][1][0]) {
            sortable.splice(i, 1);
        }
    }
    //.slice(0,10)
    sortable.forEach(function(item) {
        let currentRow = mainTable.insertRow(-1);

        let a = item[0].split(",")[0];
        let b = item[0].split(",")[1];
        let aDiv = item[0].split(",")[2];
        let bDiv = item[0].split(",")[3];

        let surdVal = item[1][0]
        let surdAbsError = item[1][1]

        if (a / aDiv > b / bDiv) {
            // swap a and b and aDiv and bDiv
            let temp = a;
            a = b;
            b = temp;

            temp = aDiv;
            aDiv = bDiv;
            bDiv = temp;
        }

        currentRow.insertCell(0).innerHTML = `<math display="block"><mfrac><msqrt><mi>${a}</mi></msqrt><mi>${aDiv}</mi></mfrac> + <mfrac><msqrt><mi>${b}</mi></msqrt><mi>${bDiv}</mi></mfrac></math>`
        currentRow.insertCell(1).innerHTML = Math.round(surdVal * 1000000) / 1000000;
        currentRow.insertCell(2).innerHTML = Math.round(surdAbsError * 1000000) / 1000000;
        currentRow.insertCell(3).innerHTML = 100 * Math.round((surdAbsError / num) * 1000000) / 1000000 + "%";
    });
}

function addToTimetable(examCode) {
    if (timeTableTracked.includes(examCode)) {
        timeTableTracked = timeTableTracked.filter(item => item != examCode);
    } else {
        timeTableTracked.push(examCode);
    }
}

function updateSearch() {
    const searchInputValue = document.getElementById("chosen-number").value.toLowerCase();
    updateTable(searchInputValue);
}
