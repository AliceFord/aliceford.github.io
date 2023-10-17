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

    const limit = Math.round(num ** 2);
    const lowerLimit = Math.round(num);

    for (let a = lowerLimit; a <= limit; a++) {
        for (let b = 0; b <= a; b++) {
            outData[[a, b]] = Math.abs(Math.sqrt(a) + Math.sqrt(b) - num);
        }
    }

    console.log(1);

    mainTable.innerHTML = "";

    // sort outData by value - https://stackoverflow.com/questions/1069666/sorting-object-property-by-values

    let sortable = [];
    for (var key in outData) {
        sortable.push([key, outData[key]]);
    }

    sortable.sort(function(a, b) {
        return a[1] - b[1];
    });

    sortable.slice(0,10).forEach(function(item) {
        let currentRow = mainTable.insertRow(-1);

        let a = item[0].split(",")[0];
        let b = item[0].split(",")[1];

        if (a > b) {
            let temp = a;
            a = b;
            b = temp;
        }

        currentRow.insertCell(0).innerHTML = `<math display="block"><msqrt><mi>${a}</mi></msqrt> + <msqrt><mi>${b}</mi></msqrt></math>`
        //currentRow.insertCell(0).innerHTML = `<span style='white-space: nowrap'>&radic;<span style='text-decoration:overline;'>${a}</span> + &radic;<span style='text-decoration:overline;'>${b}</span></span>`;
        currentRow.insertCell(1).innerHTML = Math.round(item[1] * 1000000) / 1000000;
        currentRow.insertCell(2).innerHTML = 100 * Math.round((item[1] / num) * 1000000) / 1000000 + "%";
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
