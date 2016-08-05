/* 
 * The MIT License
 *
 * Copyright 2016 Julian Selser.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */


document.getElementById('sayayinHair').onclick = function (event) {
    var clickPosition = getCursorPosition(this, event);

    drawHairOnCanvas(clickPosition);
};

document.getElementById('powerRange').oninput = drawHairOnCanvas;

document.getElementById('fakeImageSelector').onclick = function () {
    document.getElementById('imageSelector').click();
};

document.getElementById('imageSelector').onchange = function (eventImageSelected) {
    var file = eventImageSelected.target.files[0];
    var fileReader = new FileReader();

    fileReader.onload = function (eventImageLoaded) {
        var imageToSayaynize = document.getElementById('imageToSayanize');

        imageToSayaynize.src = eventImageLoaded.target.result;

        drawHairOnCanvas();
    };

    fileReader.readAsDataURL(file);
};

function getCursorPosition(canvas, event) {
    var rect = canvas.getBoundingClientRect();

    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

function drawHairOnCanvas(position) {
    var imageToSayaynize = document.getElementById('imageToSayanize');
    var hairCanvas = document.getElementById('sayayinHair');
    var powerCanvas = document.getElementById('powerLevel');
    var ctx = hairCanvas.getContext('2d');
    var hairImg = new Image();

    powerCanvas.height = hairCanvas.height = imageToSayaynize.height;
    powerCanvas.width = hairCanvas.width = imageToSayaynize.width;

    hairImg.onload = function () {
        var biggerHairImgSide = Math.max(hairImg.height, hairImg.width);
        var biggerUserImgSide = Math.min(hairCanvas.height, hairCanvas.width);
        var scaleRatio = biggerHairImgSide / (biggerUserImgSide / 2);
        var scaleRatio = (scaleRatio > 1) ? 1 / scaleRatio : scaleRatio;
        
        ctx.drawImage(hairImg,
                position.x - (hairImg.width * scaleRatio) / 2,
                position.y - (hairImg.height * scaleRatio) / 2,
                hairImg.width * scaleRatio, hairImg.height * scaleRatio);
    };

    hairImg.src = document.getElementById('powerRange').value > 80 
        ? 'img/superSaiyanHair.png' 
        : 'img/normalSaiyanHair.png';
}