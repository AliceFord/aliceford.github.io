var form = document.getElementById("submit-boat-form");

function submitBoat(event) {
    event.preventDefault();
    console.log("boat");
}

form.addEventListener('submit', submitBoat);
