const mainTable = document.getElementById("outputTable");

var peer = new Peer("alicefordtest"); // Math.random().toString(36).slice(2)

var activeUsers = [];

peer.on('open', function(id) {
    document.getElementById('controller-key').innerHTML = "ID: " + id;
});

peer.on('connection', function(conn) {

    conn.on('data', function(data) {
        if (data.type == 'connect') {
            let row = mainTable.insertRow(-1);
            activeUsers.push(data.name);
            row.insertCell(0).innerHTML = data.name;
            row.insertCell(1);
            row.insertCell(2);
            conn.send('success');
        } else if (data.type == 'answer') {
            let rowPos = activeUsers.indexOf(data.name);
            let row = mainTable.rows[rowPos + 1];
            row.cells[1].innerHTML = document.getElementById('timer').innerHTML;
            row.cells[2].innerHTML = data.answer;
            conn.send('success');
        }
    });
});

function startTime() {
    let startTime = Date.now();

    let interval = setInterval(function() {
        let elapsedTime = Date.now() - startTime;
        document.getElementById("timer").innerHTML = (elapsedTime / 1000).toFixed(3);
    }, 40);
}
