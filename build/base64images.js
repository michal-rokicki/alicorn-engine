var fs = require('fs');

if (process.argv.length!=4) {
    console.log("Required arguments: gfx-path output-file");
    process.exit(1);
}

var gfxPath = process.argv[2];
var outputFile = process.argv[3];

console.log("Processing images: "+gfxPath);

function findImages(srcDir) {
    var result = {};

    fs.readdirSync(srcDir).forEach(file => {
        var filePath = srcDir + "/" + file;
        var stats = fs.lstatSync(filePath);

        if (stats.isDirectory()) {
            result[file] = findImages(filePath);
        }
        else if (stats.isFile()) {
            if (file.endsWith("png") || file.endsWith("jpg")) {
                result[file.substring(0, file.length-4)] = filePath;
            }
        }
    });

    return result;
}

function imagesToBase64(images, prefix) {
    var out = "{\n";

    var first = true;

    for (var dirOrImg in images) {
        if (first) {
            first=false;
        }
        else {
            out +=",\n";
        }

        if (typeof images[dirOrImg] == "string") {
            out += prefix+"\t"+dirOrImg+":newBase64Image(\""+imageToBase64(images[dirOrImg])+"\")";
        }
        else {
            out += prefix+"\t"+dirOrImg+":"+imagesToBase64(images[dirOrImg], prefix+"\t");
        }
    }

    out += "\n"+prefix+"}";

    return out;
}

function imageToBase64(filePath) {
    var ext = filePath.replace(/^.*\./,"");
    return "data:image/"+ext+";base64,"+(new Buffer(fs.readFileSync(filePath)).toString('base64'));
}

var images = findImages(gfxPath);

console.log("Saving image VFS in: "+outputFile);

var cnt =
    "function newBase64Image(base64) {\n"+
    "   var result = new Image();\n"+
    "   result.src = base64;\n"+
    "   return result;\n"+
    "}\n"+
    "\n"+
    "var IMAGE_VFS = "+imagesToBase64(images,"")+";";

fs.writeFileSync(outputFile, cnt);

console.log("DONE");