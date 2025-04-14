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

            // if (line.startsWith('$HOEGCC_N_APP:EGCC_F_APP') || line.startsWith('$HOEGCC_S_APP:EGCC_F_APP')) {
            //     let cs = line.split(':')[2];
            //     let time = parseInt(prevLine.slice(1, 3)) * 60 * 60 + parseInt(prevLine.slice(4, 6)) * 60 + parseInt(prevLine.slice(7, 9));
            //     handoffTimes.push([cs, time]);
            // }

            prevLine = line;
        });

        for (const key in data) {
            const planeData = data[key];
            temp = [];
            for (const item in planeData) {
                temp.push({lat: planeData[item][0], lon: planeData[item][1], alt: planeData[item][2]});
            }

            // var polyline = L.multiOptionsPolyline(temp, {
            //     multiOptions: {
            //         optionIdxFn: function (latLng) {
            //             if (latLng.alt >= 8000) {
            //                 return 79;
            //             }
            //             return Math.round(latLng.alt / 100);
            //         },
            //         options: [
            //             {color: '#f5e33e'}, {color: '#f2e13f'}, {color: '#efe040'}, {color: '#eddf41'}, {color: '#eade42'}, {color: '#e7dc43'}, {color: '#e5db44'}, {color: '#e2da45'}, {color: '#e0d946'}, {color: '#ddd747'}, 
            //             {color: '#dad648'}, {color: '#d8d549'}, {color: '#d5d44a'}, {color: '#d2d24b'}, {color: '#d0d14c'}, {color: '#cdd04d'}, {color: '#cbcf4e'}, {color: '#c8cd4f'}, {color: '#c5cc50'}, {color: '#c3cb51,'}, 
            //             {color: '#c0ca52'}, {color: '#bdc853'}, {color: '#bbc754'}, {color: '#b8c655'}, {color: '#b6c556'}, {color: '#b3c357'}, {color: '#b0c258'}, {color: '#aec159'}, {color: '#abc05a'}, {color: '#a9bf5b,'}, 
            //             {color: '#a6bd5c'}, {color: '#a3bc5d'}, {color: '#a1bb5e'}, {color: '#9eba5f'}, {color: '#9bb860'}, {color: '#99b761'}, {color: '#96b662'}, {color: '#94b563'}, {color: '#91b364'}, {color: '#8eb265,'}, 
            //             {color: '#8cb166'}, {color: '#89b067'}, {color: '#86ae68'}, {color: '#84ad69'}, {color: '#81ac6a'}, {color: '#7fab6b'}, {color: '#7ca96c'}, {color: '#79a86d'}, {color: '#77a76e'}, {color: '#74a66f,'}, 
            //             {color: '#71a470'}, {color: '#6fa371'}, {color: '#6ca272'}, {color: '#6aa173'}, {color: '#67a074'}, {color: '#649e75'}, {color: '#629d76'}, {color: '#5f9c77'}, {color: '#5d9b78'}, {color: '#5a9979,'}, 
            //             {color: '#57987a'}, {color: '#55977b'}, {color: '#52967c'}, {color: '#4f947d'}, {color: '#4d937e'}, {color: '#4a927f'}, {color: '#489180'}, {color: '#458f81'}, {color: '#428e82'}, {color: '#408d83,'}, 
            //             {color: '#3d8c84'}, {color: '#3a8a85'}, {color: '#388986'}, {color: '#358887'}, {color: '#338788'}, {color: '#308589'}, {color: '#2d848a'}, {color: '#2b838b'}, {color: '#28828c'}, {color: '#26818e'}
            //         ]
            //     },
            //     weight: 1.5,
            //     opacity: 0.8
            // }).addTo(map);

            var polyline = L.polyline(temp, {color: '#3a54ac', weight: 1.5, opacity: 0.6}).addTo(map);
            map.fitBounds(polyline.getBounds());
            
            // var polyline = L.polyline(temp, {color: '#3a54ac', weight: 1.5, opacity: 0.6}).addTo(map);
            // map.fitBounds(polyline.getBounds());
        }

        // for (const item in handoffTimes) {
        //     let timeData = handoffTimes[item];
        //     let position = [0, 0];

        //     for (const planeUpdateKey in data[timeData[0]]) {
        //         let planeUpdateItem = data[timeData[0]][planeUpdateKey];
        //         console.log(planeUpdateItem[3], timeData[1]);
        //         if (planeUpdateItem[3] >= timeData[1]) {
        //             position = [planeUpdateItem[0], planeUpdateItem[1]];
        //             break;
        //         }
        //     }

        //     var marker = L.marker(position).addTo(map);
        // }
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

    temp = [[51.305533055556, -0.44662361111111],
        [51.331243055556, 0.036423611111111],
        [51.505855555556, 0.056030555555556],
        [51.645652777778, 0.15050111111111],
        [51.655829722222, -0.32719861111111],
        [51.725996111111, -0.55000638888889],
        [51.477467777778, -0.46177444444444],
        [51.305533055556, -0.44662361111111]];
    
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
