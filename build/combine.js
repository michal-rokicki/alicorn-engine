var fs = require('fs');

var i;
var files = [];
var options = {
    lang:"js"
};

for (i=2; i<process.argv.length; ++i) {
    var arg = ""+(process.argv[i]);
    var key, value;

    if (arg.startsWith("-D")) {
        arg = arg.replace("-D","");

        key = arg.replace(/=.*$/, "");
        value = arg.replace(/^[^=]*=/, "");

        options[key]=value;
    }
    else {
        files.push(arg);
    }
}

if (files.length<=1) {
    console.log("Required arguments: [-Doption=value] input0, [input1] ... [inputN] output")
}

var inputFiles = [];
var outputFile = files[files.length-1];
var comment = {begin:"",end:""};
var fileFilter = fName => true;
var warnings = [];

for (i=0; i<files.length-1; ++i) {
    inputFiles.push(files[i]);
}

if (options.lang=="js") {
    comment.begin="//////// ";
    fileFilter = fName => fName.endsWith("js");
}
else if (options.lang=="html") {
    comment.begin="<!------ ";
    comment.end="-->";
    fileFilter = fName => fName.endsWith("html");
}

var result = "";

if (!options.noComments) {
    result += comment.begin + "included files: ";

    for (i=0; i<inputFiles.length; ++i) {
        result += inputFiles[i]+", ";
    }
    result += comment.end;

    result += "\n" + comment.begin + (new Date()) + comment.end + "\n\n";
}

var scanDir = function (dirPath) {
    fs.readdirSync(dirPath).forEach(function(file) {
        var filePath = dirPath + "/" + file;
        var stats = fs.lstatSync(filePath);

        if (stats.isDirectory()) {
            scanDir(filePath);
        }
        else if (stats.isFile()) {
            if (fileFilter(file)) {
                includeFile(filePath);
            }
        }
    });
};

var includeFile = function(filePath) {
    console.log("    including: "+filePath);
    var content = ""+fs.readFileSync(filePath);
    findWarnings(filePath, content);
    if (!options.noComments) {
        result += comment.begin + filePath + comment.end+"\n\n";
    }
    result += content+"\n\n";
};

var findWarnings = function(filePath, content) {
    var fileName = filePath.replace(/^.*\//,"").replace(/\.js$/,"");

    if (options.lang=="js" && !options.noWarnings) {
        if (content.indexOf("//@NoMainFunction") === -1) {
            if (!(new RegExp("function\\s+"+fileName+"\\(", "m")).test(content)) {
                warnings.push("No main function (class) found in "+filePath);
            }
        }

        var prototypeRegex = /[a-zA-Z0-9]+\.prototype\./mg;
        var expected = fileName+".prototype.";
        var found = (content.match(prototypeRegex)||[]).filter(s => s!=expected);

        if (found.length>0) {
            found.forEach(s => {
                var other = s.replace(".prototype.","");
                warnings.push(other+" function (class) prototype modified in "+filePath);
            });
        }
    }
};

var sleep = function(seconds) {
    var start = new Date().getTime();
    while (start+seconds*1000>new Date().getTime());
};

for (i=0; i<inputFiles.length; ++i) {
    var filePath = inputFiles[i];
    console.log("including: "+filePath);

    var stats = fs.lstatSync(filePath);
    if (stats.isDirectory()) {
        scanDir(filePath);
    }
    else if (stats.isFile()) {
        includeFile(filePath);
    }
    else {
        throw "Can't include source: "+filePath;
    }
}

if (warnings.length>0) {
    console.log();
    console.log(warnings.length+" warning(s) found!");
    for (i=0; i<warnings.length; ++i) {
        console.log((i+1)+".\t"+warnings[i]);
    }

    for (i=0; i<4; ++i) {
        sleep(0.5);
        console.log();
    }
}

console.log("saving in: "+outputFile);
fs.writeFileSync(outputFile, result);