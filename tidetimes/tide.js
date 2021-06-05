const DAY_MAP = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

function doRequest(url, callback) {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = callback;
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const url = "http://hypixeleaderboards.com/private-proxy/?header=ocp&url=https://admiraltyapi.azure-api.net/uktidalapi/api/V1/Stations/" + urlParams.get("id") + "/TidalEvents"
    doRequest(url, function() {
        if (this.readyState == 4 && this.status == 200) {
            var locationData = JSON.parse(this.responseText);
            var tbody = document.getElementsByTagName("tbody")[0];
            locationData.forEach(element => {
                var row = document.createElement("tr");
                tbody.appendChild(row);
                var head = document.createElement("th");
                var highLow = document.createTextNode(element["EventType"] == "HighWater" ? "High" : "Low");
                head.appendChild(highLow);
                row.appendChild(head);
                var data = document.createElement("td");
                var date = new Date(element["DateTime"].split(".")[0]);
                var time = document.createTextNode(DAY_MAP[date.getDay()] + " " + date.getDate().toString().padStart(2, "0") + " - " + date.getHours().toString().padStart(2, "0") + ":" + date.getMinutes().toString().padStart(2, "0"));
                data.appendChild(time);
                row.appendChild(data);
            });
        }
    });
});