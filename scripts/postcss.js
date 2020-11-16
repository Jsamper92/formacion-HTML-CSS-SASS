// dependencies
const fs = require("fs");
const postcss = require("postcss");
const url = require("postcss-url");
// css to be processed


const options = [
  /* {url: "inline"}, */
  { filter: 'assets/img/**/*.{png,svg}', url: 'inline' },
];

fs.readFile("assets/css/styles.css", (err, css) => {
  postcss()
    .use(url(options))
    .process(css, {
      from: "assets/css/styles.css",
      to: "dist/index.css",
    })
    .then((result) => {
      const outputCSS = () => fs.writeFile("dist/index.css", result.css, () => true);

      if(!fs.existsSync('dist')){
        fs.mkdirSync('dist');
        outputCSS();
      } else {
        outputCSS();
      }
    }).then(() => console.log('Finalización del script'))
    .catch((err) => console.log(err)); 
});
