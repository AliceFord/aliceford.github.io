var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);
var canvas = document.getElementById('imageCanvas');
var ctx = canvas.getContext('2d');


function handleImage(e){
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img,0,0);
        }

        img.onerror = function(){
            let decodedData = event.target.result;
            decodedData = atob(decodedData.replace(/^data:application\/octet-stream;base64,/, ""));
            let binary = new Uint8Array(decodedData.split("").map(function(e) { return e.charCodeAt(0); }));
            if (decodedData.startsWith("qoif")) {
                let width = 0;
                let height = 0;
                let channels = "";
                let colorspace = "";
                let QOI_OP_RGB = false;
                let currentPixel = [undefined, undefined, undefined];
                let pixelNumber = 0;
                binary.forEach((element, i) => {
                    if (i >= 4 && i < 8) {
                        width += element << (7 - i);
                    } else if (i >= 8 && i < 12) {
                        height += element << (11 - i);
                    } else if (i == 12) {
                        channels = element == 3 ? "RGB" : "RGBA";
                    } else if (i == 13) {
                        colorspace = element == 0 ? "sRGB with linear alpha" : "All channels are RGB";
                    } else {
                        if (QOI_OP_RGB) {
                            if (currentPixel[2] == undefined) {
                                if (currentPixel[1] == undefined) {
                                    if (currentPixel[0] == undefined) {
                                        currentPixel[0] = element;
                                    } else {
                                        currentPixel[1] = element;
                                    }
                                } else {
                                    currentPixel[2] = element;
                                    ctx.fillStyle = "rgb(" + currentPixel[0] + "," + currentPixel[1] + "," + currentPixel[2] + ")";
                                    ctx.fillRect(pixelNumber % width, Math.floor(pixelNumber / width), 1, 1);
                                    currentPixel = [undefined, undefined, undefined];
                                    QOI_OP_RGB = false;
                                    pixelNumber++;
                                }
                            }
                        } else {
                            if (element == 0xfe) {
                                QOI_OP_RGB = true;
                            }
                        }
                    }
                });

                canvas.width = width;
                canvas.height = height;

                console.log(width, height, channels, colorspace);
            }
        }

        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);     
}