var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function displayRoute() {
    const file = document.getElementById('myFile').files[0];
    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = function(event) {
        data = {};
        event.srcElement.result.split('\n').forEach(line => {
            // @N:BAW67AN:2018:1:53.53797:-2.71171:8000:220:0:0

            if (line.startsWith('@N')) {
                cs = line.split(':')[1];
                lat = line.split(':')[4];
                lon = line.split(':')[5];
                alt = line.split(':')[6];

                if (cs in data) {
                    data[cs].push([lat, lon, alt]);
                } else {
                    data[cs] = [[lat, lon, alt]];
                }
            }
        });

        for (const key in data) {
            const planeData = data[key];
            temp = [];
            for (const item in planeData) {
                temp.push([planeData[item][0], planeData[item][1]]);
            }
            var polyline = L.polyline(temp, {color: '#3a54ac', weight: 1.5, opacity: 0.6}).addTo(map);
            map.fitBounds(polyline.getBounds());
        }
    }
}

// // create a red polyline from an array of LatLng points
// var latlngs = [
//     [45.51, -122.68],
//     [37.77, -122.43],
//     [34.04, -118.2]
// ];

// var polyline = L.polyline(latlngs, {color: 'red'}).addTo(map);

// // zoom the map to the polyline
// map.fitBounds(polyline.getBounds());
