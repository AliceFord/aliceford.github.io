function doRequest(url, callback) {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = callback;
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

$(document).ready(function() {
    $("#main-form").submit(function() {
        var locaton = document.getElementById("inputLocation").value;
        var url = "https://hypixeleaderboards.com/private-proxy/?header=pstack&url=http://api.positionstack.com/v1/forward&query=" + encodeURIComponent(locaton);

        var locationData;
        var allLocationsData;

        doRequest(url, function() {
            if (this.readyState == 4 && this.status == 200) {
                locationData = JSON.parse(this.responseText);
                var url = "https://hypixeleaderboards.com/private-proxy/?url=https://admiraltyapi.azure-api.net/uktidalapi/api/V1/Stations&header=ocp";
                doRequest(url, function() {
                    if (this.readyState == 4 && this.status == 200) {
                        allLocationsData = JSON.parse(this.responseText);
                        var distances = [];
                        allLocationsData["features"].forEach(element => {
                            try {
                                const coordinates = element["geometry"]["coordinates"];
                                distances.push(((coordinates[1] - locationData["data"][0]["latitude"]) ** 2) + ((coordinates[0] - locationData["data"][0]["longitude"]) ** 2));
                            } catch (error) {
                                distances.push(130000);
                            }
                        });
                        var min = [-1, 130000];
                        for (var i = 0; i < distances.length; i++) {
                            if (distances[i] < min[1]) {
                                min = [i, distances[i]];
                            }
                        }
                        window.location.href = window.location.href.substr(0, window.location.href.indexOf("index.html")) + "tide.html?id=" + allLocationsData["features"][min[0]]["properties"]["Id"];
                    }
                });
            }
        });
    });
});