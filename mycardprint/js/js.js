// Create a new color picker instance
// https://iro.js.org/guide.html#getting-started
var colorPicker = new iro.ColorPicker(".colorPicker", {
    // color picker options
    // Option guide: https://iro.js.org/guide.html#color-picker-options
    width: 90,
    color: "rgb(255, 0, 0)",
    borderWidth: 2,
    borderColor: "#fff",
  });

var colorPicker2 = new iro.ColorPicker("#colorPicker", {
    // color picker options
    // Option guide: https://iro.js.org/guide.html#color-picker-options
    width: 90,
    color: "rgb(255, 0, 0)",
    borderWidth: 2,
    borderColor: "#fff",
  });
  
  var values = document.getElementById("values");
  var values2 = document.getElementById("values2");
  var hexInput1 = document.querySelector(".hexInput");
  var hexInput2 = document.querySelector("#hexInput");
  var hexInput21 = document.querySelector(".hexInput2");
  var hexInput22 = document.querySelector("#hexInput2");
  
  // https://iro.js.org/guide.html#color-picker-events
  colorPicker.on(["color:init", "color:change"], function(color){
    // Show the current color in different formats
    // Using the selected color: https://iro.js.org/guide.html#selected-color-api
    values.innerHTML = [
      "hex: " + color.hexString,
      "rgb: " + color.rgbString,
      "hsl: " + color.hslString,
    ].join("<br>");
    
    hexInput1.value = color.hexString;
    const event = new Event('change');

    // Dispatch it.
    hexInput1.dispatchEvent(event);


    hexInput2.value = color.hexString;
  });

  colorPicker2.on(["color:init", "color:change"], function(color){
    // Show the current color in different formats
    // Using the selected color: https://iro.js.org/guide.html#selected-color-api
    values2.innerHTML = [
      "hex: " + color.hexString,
      "rgb: " + color.rgbString,
      "hsl: " + color.hslString,
    ].join("<br>");
    
    hexInput21.value = color.hexString;
    const event = new Event('change');

    // Dispatch it.
    hexInput21.dispatchEvent(event);

    hexInput22.value = color.hexString;
  });
  
  hexInput1.addEventListener('change', function() {
    colorPicker.color.hexString = this.value;
  }); 
  hexInput1.addEventListener('keyup', function() {
    colorPicker.color.hexString = this.value;
  }); 
  hexInput2.addEventListener('change', function() {
    colorPicker.color.hexString = this.value;
  });
  hexInput2.addEventListener('keyup', function() {
    colorPicker2.color.hexString = this.value;
  });
  hexInput21.addEventListener('change', function() {
    colorPicker2.color.hexString = this.value;
  }); 
  hexInput21.addEventListener('keyup', function() {
    colorPicker2.color.hexString = this.value;
  }); 
  hexInput22.addEventListener('change', function() {
    colorPicker2.color.hexString = this.value;
  });
  hexInput22.addEventListener('keyup', function() {
    colorPicker2.color.hexString = this.value;
  });
