import { fireColorsPalette } from './fireColorsPalette.js';

const firePixelArray = [];
const fireWidth = 200;
const fireHeight = 40;


function start(){
    createFireDataStructure();
    createFireSource();
    renderFire();
    setInterval(calculateFirePropagation, 40);
}


function createFireDataStructure(){
    const numberOfPixels = fireWidth * fireHeight;

    for(let i = 0; i < numberOfPixels; i++){
        firePixelArray[i] = 0;
    }
}


function calculateFirePropagation(){
    for(let column = 0; column < fireWidth; column++){
        for(let row = 0; row < fireHeight; row++){
            const pixelIndex = column + (fireWidth * row);
            //console.log(pixelIndex)
            updateFireIntensityPerPixel(pixelIndex);
        }
    }
    renderFire();
}


function updateFireIntensityPerPixel(currentPixelIndex){
    const belowPixelIndex = currentPixelIndex + fireWidth;

    if(belowPixelIndex >= fireWidth * fireHeight){
        return;
    }
    const decay = Math.floor(Math.random() * 3);
    const belowPixelFireIntensity = firePixelArray[belowPixelIndex];
    const newFireIntensity = 
        belowPixelFireIntensity - decay >= 0 ?
        belowPixelFireIntensity - decay : 0;
    firePixelArray[currentPixelIndex - decay] = newFireIntensity
}


function renderFire(){
    const debug = false;
    let html = '<table cellpadding=0 cellspacing=0>';

    for (let row = 0; row < fireHeight; row++){
        html += '<tr>';

        for (let column = 0; column < fireWidth; column++){
            const pixelIndex = column + (fireWidth * row);
            const fireIntensity = firePixelArray[pixelIndex];

            if(debug === true){
                html += '<td>'
                html += `<div class="pixel-index">${pixelIndex}</div>`
                html += fireIntensity
                html += '</td>'
            } else{
                const color = fireColorsPalette[fireIntensity];
                const colorString = `${color.r},${color.g},${color.b}`;
                html += `<td class="pixel" style="background-color: rgb(${colorString})" />`;
                html += '</td>'
            }      
        }
        html += '</tr>';
    }
    html += '</table>';
    document.querySelector('#fireCanvas').innerHTML = html;
}

function createFireSource(){
    for (let column = 0; column <= fireWidth; column++){
        const overflowPixelIndex = fireWidth * fireHeight;
        const pixelIndex = (overflowPixelIndex - fireWidth) + column;

        firePixelArray[pixelIndex] = 36;
    }
}

start()