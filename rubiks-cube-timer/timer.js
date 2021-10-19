var startTime = Date.now();

var interval = setInterval(function() {
    var elapsedTime = Date.now() - startTime;
    document.getElementById("timer").innerHTML = Math.floor((elapsedTime / 1000) / 60) + ":" + ((elapsedTime / 1000) % 60).toFixed(2).padStart(5, '0');
}, 16);

$(document).on("keypress", function(e) {
    if (e.which == 32) {
        
    }
});
