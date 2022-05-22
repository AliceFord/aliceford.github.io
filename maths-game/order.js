const colours = ["Red", "Orange", "Yellow", "Green", "Cyan", "Blue", "Magenta", "Purple", "White", "Black", "Grey", "Silver", "Pink", "Maroon", "Brown", "Beige", "Tan", "Peach", "Lime", "Indigo"];
var nums = Array.from(Array(20).keys());

function setupTable() {
    let table = $('#colours');
    let tbody = $('#coloursBody');

    nums.sort(() => Math.random() - 0.5);

    for (let colour in colours) {
        let tr = $('<tr>');
        tr.append($('<td>').text(colours[colour]));
        tr.append($('<td>').text(nums.shift() + 1));
        tbody.append(tr);
    }
}