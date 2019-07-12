function convertToAlphaColor(cssColor, percent) {
    //create a temp div with the color so we can get computed style
    let tempDiv = document.createElement('div');
    tempDiv.setAttribute('style', 'color:' + cssColor);
    tempDiv.setAttribute('id', 'tempDiv');
    document.body.appendChild(tempDiv);

    let computedStyle = window.getComputedStyle(document.getElementById('tempDiv'));
    console.log(computedStyle.color)
    let percentDecimal = parseInt(percent)/100;
    // convert to rgba
    let rgbColor = computedStyle.color;

    let values = rgbColor.substring(
        rgbColor.lastIndexOf("(") + 1,
        rgbColor.lastIndexOf(")")
    );
    // check if color was already an rgba color and multiply times new percent for new alpha
    let valuesArray = values.split(',');

    // take the existing alpha and multiply times new alpha and put array back into value string
    if(valuesArray.length === 4) {
        percentDecimal = percentDecimal * valuesArray[valuesArray.length-1];
        valuesArray.pop();
        values = valuesArray.join();
    }

    let rgbaColor = 'rgba(' + values + ', ' + percentDecimal + ')';
    //remove the temp div and return alpha color
    document.body.removeChild(document.getElementById('tempDiv'));
    console.log(cssColor, percent)
    return rgbaColor;
}