const Lifx  = require('node-lifx-lan');

const colors1 = ['green', 'blue', 'red', 'purple'];
const colors2 = ['red', 'green', 'yellow', 'pink'];
const timeout = 1000 * 5;

const cycle = function(label, colors, offset = 0) {
  if (offset >= colors.length) {
    offset = 0;
  }
  const color = colors[offset];
  console.log(`Setting ${label} to ${color}`);
  try {
    Lifx.setColorFilter({
      filters: [{ label }],
      color: { css: color, brightness: 1 },
      duration:  timeout
    });
  } catch (e) {
    console.log(label, color, e);
  }
  setTimeout(() => { 
    cycle(label, colors, offset + 1);
  }, timeout);
}

const main = async function() {
  const list = await Lifx.discover();
  console.log('Lights discovered');
  console.log(list);
  //cycle('Doorway Right', colors1);
  //cycle('Doorway Left', colors2);

}

main();
