var _hashFunction;

function initDynamic(hashFunction) {
    _hashFunction = hashFunction;
}

function updateDynamic() {
    const data = document.getElementById("dataEntry").value;
    refreshScreenElements(_hashFunction(data));
}