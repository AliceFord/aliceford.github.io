var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var files = [];
var borderSegments = [];
var polylines = [];
var markers = [];
var sectorColours = {};
var xmlDoc;

document.querySelector("form").onkeypress = λ => λ.keyCode === 13 ? λ.preventDefault() : null;

function clearMap() {
    borderSegments = [];
    
    for (const polyline of polylines) {
        polyline.removeFrom(map);
    }

    for (const marker of markers) {
        marker.removeFrom(map);
    }

    polylines = [];
    markers = [];
}

function decimalToESCoord(lat, lon) {
    let out = lat >= 0 ? "N" : "S"
    lat = Math.abs(lat)
    out += Math.floor(lat).toString().padStart(3, "0") + "."; lat -= Math.floor(lat); lat *= 60
    out += Math.floor(lat).toString().padStart(2, "0") + "."; lat -= Math.floor(lat); lat *= 60
    out += Math.floor(lat).toString().padStart(2, "0") + "."; lat -= Math.floor(lat); lat *= 1000
    out += Math.floor(lat).toString().padStart(3, "0"); lat -= Math.floor(lat); 

    out += " "
    out += lon >= 0 ? "E" : "W"
    lon = Math.abs(lon)
    out += Math.floor(lon).toString().padStart(3, "0") + "."; lon -= Math.floor(lon); lon *= 60
    out += Math.floor(lon).toString().padStart(2, "0") + "."; lon -= Math.floor(lon); lon *= 60
    out += Math.floor(lon).toString().padStart(2, "0") + "."; lon -= Math.floor(lon); lon *= 1000
    out += Math.floor(lon).toString().padStart(3, "0"); lon -= Math.floor(lon); 

    return out
}

function esCoordToDecimal(esLat) {
    let dir = esLat.slice(0, 1);
    let degrees = parseInt(esLat.slice(1, 4));
    let minutes = parseInt(esLat.slice(5, 7));
    let seconds = parseFloat(esLat.slice(8, 14));
    return (degrees + minutes / 60 + seconds / 3600) * (dir === 'N' || dir === "E" ? 1 : -1);
}

function loadSingleSector(event) {
    loadMultipleSingleSectors(event);

    for (const file of files) {  // load the rest!
        if (file.name.startsWith("Lines - ")) {
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = loadSectorBoundaries;
        }
    }
}

function loadMultipleSingleSectors(event) {
    event.srcElement.result.split('\r\n').forEach(line => {
        if (line.startsWith("BORDER")) {
            let currentSegments = line.split(':');
            currentSegments.shift();
            for (let segment of currentSegments) {
                if (!(segment in borderSegments.map(λ => λ[0]))) {
                    borderSegments.push([segment, event.target.fileName]);
                }
            }
        }
    });
}

function loadSectorBoundaries(event) {
    let displayCurrentLine = false;
    let currentSector = "";
    let currentLine = [];

    event.srcElement.result.split('\r\n').forEach(line => {
        if (line.startsWith("SECTORLINE")) {
            if (displayCurrentLine) {  // safety check. Array will be empty if !displayCurrentLine anyway
                if (!(currentSector in sectorColours)) {
                    sectorColours[currentSector] = "red"
                    // sectorColours[currentSector] = '#' + Math.floor(Math.random()*16777215).toString(16);
                }

                var polyline = L.polyline(currentLine, {color: sectorColours[currentSector], weight: 3, opacity: 0.4}).addTo(map);
                polylines.push(polyline);
                map.fitBounds(polyline.getBounds());
                currentLine = [];
            }
            
            let sectorName = line.split(':')[1];
            if (sectorName.includes(";")) {
                sectorName = sectorName.split(";")[0];
            }
            sectorName = sectorName.trim();

            if (borderSegments.map(λ => λ[0]).includes(sectorName)) {
                console.log(sectorName);
                currentSector = borderSegments.filter(λ => λ[0] === sectorName)[0][1];
                displayCurrentLine = true;
            } else {
                displayCurrentLine = false;
            }
        } else if (line.startsWith("COORD") && displayCurrentLine) {
            let esLat = line.split(":")[1];
            let esLon = line.split(":")[2];

            let re = /;.*$/g;
            let regex = re.exec(line);
            var marker;
            if (regex != null) {
                marker = L.marker([esCoordToDecimal(esLat), esCoordToDecimal(esLon)]).bindTooltip(regex[0].split(";")[1] + "\n" + esLat + " " + esLon, {permanent: false}).addTo(map);
            } else {
                marker = L.marker([esCoordToDecimal(esLat), esCoordToDecimal(esLon)]).bindTooltip("(unnamed)" + "\n" + esLat + " " + esLon, {permanent: false}).addTo(map);
            }
            markers.push(marker)

            currentLine.push([esCoordToDecimal(esLat), esCoordToDecimal(esLon)]);
        }
    });
}

function displayRoute() {
    files = document.getElementById('uksf').files;

    //loadPoints();
    // console.log(files);

    // for (const file of files) {
    //     if (file.name === 'London TC JACKO.txt') {
    //         const reader = new FileReader();
    //         reader.readAsText(file);
    //         reader.onload = loadSingleSector;
    //     }
    // }
}

function changeSector() {
    clearMap();
    for (const file of files) {
        if (file.name === document.getElementById('sector').value + ".txt") {
            const reader = new FileReader();
            reader.fileName = file.name;
            reader.readAsText(file);
            reader.onload = loadSingleSector;
        }
    }
}

function allTCSectors() {
    clearMap();

    let sectors = ["COWLY", "CPT", "DAGGA", "JACKO", "LAM", "LOREL", "NE", "NW", "REDFA", "SABER", "SE", "SW", "VATON", "WELIN"];
    sectors = sectors.map(λ => "London TC " + λ + ".txt");

    for (const file of files) {
        if (sectors.includes(file.name)) {
            const reader = new FileReader();
            reader.fileName = file.name;
            reader.readAsText(file);
            if (sectors.length === 1) {
                reader.onload = loadSingleSector;
            } else {
                reader.onload = loadMultipleSingleSectors;
            }
            sectors = sectors.filter(λ => λ !== file.name);
        }
    }
}


function allACSectors() {
    clearMap();

    let sectors = [...Array(25).keys()];
    sectors.splice(sectors.indexOf("0.txt"), 1)
    sectors.splice(sectors.indexOf("9.txt"), 1)
    sectors = sectors.map(λ => λ + ".txt");

    for (const file of files) {
        if (sectors.includes(file.name)) {
            const reader = new FileReader();
            reader.fileName = file.name;
            reader.readAsText(file);
            if (sectors.length === 1) {
                reader.onload = loadSingleSector;
            } else {
                reader.onload = loadMultipleSingleSectors;
            }
            sectors = sectors.filter(λ => λ !== file.name);
        }
    }
}


function loadPoints() {
    for (const file of files) {  // load the rest!
        if (file.name.startsWith("Lines - ")) {
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = loadPointsFromFile;
        }
    }
}

function loadPointsFromFile(event) {
    event.srcElement.result.split('\r\n').forEach(line => {
        if (line.startsWith("COORD")) {
            let esLat = line.split(":")[1];
            let esLon = line.split(":")[2];

            let re = /;.*$/g;
            let regex = re.exec(line);
            if (regex != null) {
                L.marker([esCoordToDecimal(esLat), esCoordToDecimal(esLon)]).bindTooltip(regex[0].split(";")[1] + "\n" + esLat + " " + esLon, {permanent: false}).addTo(map);
            } else {
                L.marker([esCoordToDecimal(esLat), esCoordToDecimal(esLon)]).bindTooltip("(unnamed)" + "\n" + esLat + " " + esLon, {permanent: false}).addTo(map);
            }
        }
    });
}

function loadNATSSectorBounds(event) {
    var parser = new DOMParser();
    xmlDoc = parser.parseFromString(event.srcElement.result, "text/xml")
}

function loadNATSSector() {
    const xmlFile = document.getElementById('nats-xml').files[0];
    const reader = new FileReader();
    reader.readAsText(xmlFile);
    reader.onload = loadNATSSectorBounds;
}

function changeNATSSector() {
    const num = document.getElementById('nats-sector').value

    for (const airspace of xmlDoc.getElementsByTagName("aixm:AirspaceTimeSlice")) {
        const name = airspace.getElementsByTagName("aixm:name")[0].childNodes[0].nodeValue
        if (!name.startsWith("SWANWICK AC S" + num) && !name.startsWith(num)) continue

        var line = []

        for (const pos of airspace.getElementsByTagName("gml:pos")) {
            var currentPos = pos.childNodes[0].nodeValue

            var marker = L.marker(currentPos.split(" ")).bindTooltip(decimalToESCoord(currentPos.split(" ")[0], currentPos.split(" ")[1]), {permanent: false}).addTo(map);
            markers.push(marker)

            line.push(currentPos.split(" "))
        }

        var polyline = L.polyline(line, {color: "purple", weight: 3, opacity: 0.4}).addTo(map);
        polylines.push(polyline);
        map.fitBounds(polyline.getBounds());
    }
}