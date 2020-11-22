var sass = require("sass");
var fs = require("fs");

/**
 * @description Función cuya finalidad es la de partiendo de un archivo scss, lo compile a css, creando un directorio propio
 * @param options - Objeto que recibe la url del archivo y el destino donde queremos compilar el mismo
 */
function compileSass(options) {
  /**
   * @param result - Objeto de sass que consumiendo el metodo renderSync de node-sass le pasamos la configuración a compilar
   */
  var result = sass.renderSync({
    file: options.src,
    outputStyle: "compressed",
    sourceMap: false,
    sourceComments: false,
    outFile: options.dest,
  });

  /**
   * Por medio del if, controlamos que exista el repositorio de destino y compila el archivo, en caso de no existir la carpeta dist
   * hace ambas cosas
   */
  

  if (fs.existsSync('css')) {
    createFile(result, options);
  } else {
    fs.mkdirSync('css', result.css, () => false);
    createFile(result, options);
  }

  console.log(
    `El archivo ha sido compilado en ${options.dest} en un tiempo de ${result.stats.duration}ms`
  );
}

/**
 * @param result - Objeto de configuración sass
 * @param options - Objeto que recibe la url del archivo y el destino donde queremos compilar el mismo
 */
function createFile(result, options) {
  fs.writeFileSync(options.dest, result.css, () => false);
}

compileSass({
  src: "assets/scss/main.scss",
  dest: "assets/css/styles.css",
});
