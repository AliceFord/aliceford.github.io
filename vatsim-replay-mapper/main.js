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
        let data = {};
        let handoffTimes = [];

        let prevLine = "";
        event.srcElement.result.split('\r\n').forEach(line => {
            // @N:BAW67AN:2018:1:53.53797:-2.71171:8000:220:0:0

            if (line.startsWith('@N')) {
                let cs = line.split(':')[1];
                let lat = line.split(':')[4];
                let lon = line.split(':')[5];
                let alt = line.split(':')[6];
                let time = parseInt(prevLine.slice(1, 3)) * 60 * 60 + parseInt(prevLine.slice(4, 6)) * 60 + parseInt(prevLine.slice(7, 9));

                if (cs in data) {
                    data[cs].push([lat, lon, alt, time]);
                } else {
                    data[cs] = [[lat, lon, alt, time]];
                }
            }

            if (line.startsWith('$HOEGCC_N_APP:EGCC_F_APP') || line.startsWith('$HOEGCC_S_APP:EGCC_F_APP')) {
                let cs = line.split(':')[2];
                let time = parseInt(prevLine.slice(1, 3)) * 60 * 60 + parseInt(prevLine.slice(4, 6)) * 60 + parseInt(prevLine.slice(7, 9));
                handoffTimes.push([cs, time]);
            }

            prevLine = line;
        });

        for (const key in data) {
            const planeData = data[key];
            temp = [];
            for (const item in planeData) {
                temp.push([planeData[item][0], planeData[item][1]]);
            }
            var polyline = L.polyline(temp, {color: '#3a54ac', weight: 1.5, opacity: 0.6}).addTo(map);
            map.fitBounds(polyline.getBounds());
            
            // var polyline = L.polyline(temp, {color: '#3a54ac', weight: 1.5, opacity: 0.6}).addTo(map);
            // map.fitBounds(polyline.getBounds());
        }

        for (const item in handoffTimes) {
            let timeData = handoffTimes[item];
            let position = [0, 0];

            for (const planeUpdateKey in data[timeData[0]]) {
                let planeUpdateItem = data[timeData[0]][planeUpdateKey];
                console.log(planeUpdateItem[3], timeData[1]);
                if (planeUpdateItem[3] >= timeData[1]) {
                    position = [planeUpdateItem[0], planeUpdateItem[1]];
                    break;
                }
            }

            var marker = L.marker(position).addTo(map);
        }
    }


    // CC RMA westerlies]
    temp = [[53.489343888889, -2.8510680555556],
        [53.6685325, -2.3464966666667],
        [53.615120555556, -1.8734611111111],
        [53.454884444444, -1.7702533333333],
        [53.448337222222, -1.8334680555556],
        [53.434553611111, -1.8417247222222],
        [53.280726944444, -1.7802586111111],
        [53.238272777778, -2.0316269444444],
        [53.358467222222, -2.2637297222222],
        [53.472045277778, -2.4297797222222],
        [53.335310555556, -2.8517847222222],
        [53.489343888889, -2.8510680555556]];
    
    var polyline = L.polyline(temp, {color: 'brown', weight: 3, opacity: 1}).addTo(map);
    map.fitBounds(polyline.getBounds());
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
