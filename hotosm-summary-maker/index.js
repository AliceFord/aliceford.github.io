function generatePDF(event) {
    event.preventDefault();

    username = document.getElementById("username-input").value;
    console.log(username);

    var doc = new jsPDF();
    doc.setFontSize(40);
    doc.text(35, 25, "Test");

    //doc.save("summary.pdf");
}

var form = document.getElementById("main-form");
form.addEventListener('submit', generatePDF);
