var peer = new Peer();

function connectToController() {
    let conn = peer.connect(document.getElementById('controller-id').value);

    conn.on('open', function() {
        let name = document.getElementById('name').value;
        conn.send({name: name, type: 'connect'});

        conn.on('data', function(data) {
            if (data == 'success') {
                document.getElementById('connect').value = "Connected!";
                document.getElementById('connect').disabled = true;
            }
        });
    });
}

function submitAnswer() {
    let answer = document.getElementById('answer').value;
    let conn = peer.connect(document.getElementById('controller-id').value);

    conn.on('open', function() {
        let name = document.getElementById('name').value;
        conn.send({name: name, answer: answer, type: 'answer'});

        conn.on('data', function(data) {
            if (data == 'success') {
                document.getElementById('submit').value = "Submitted!";
                document.getElementById('submit').disabled = true;
            }
        });
    });
}