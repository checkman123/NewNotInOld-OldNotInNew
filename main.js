var fs = require("fs");

//get txt name from command line argument
const myArgs = process.argv.slice(2);

let OldNotInNew = [];
let NewNotInOld = [];

//read old file
let oldFile = fs
  .readFileSync(myArgs[0])
  .toString()
  .split("\n")
  .reduce(function (obj, str) {
    //separate SHA1 code and file name
    str.trim();
    let sha1Str = str.substring(0, 40).trim();
    let fileStr = str.substring(40, str.length).trim();

    obj[sha1Str] = fileStr.trim();
    return obj;
  }, {});

//read new file
let newFile = fs
  .readFileSync(myArgs[1])
  .toString()
  .split("\n")
  .reduce(function (obj, str) {
    //separate SHA1 code and file name
    str.trim();
    let sha1Str = str.substring(0, 40);
    let fileStr = str.substring(40, str.length).trim();

    obj[sha1Str] = fileStr.trim();
    return obj;
  }, {});

//OldNotInNew
for (const shaNum in oldFile) {
  //Not in new file
  if (!newFile[shaNum]) {
    OldNotInNew.push(oldFile[shaNum]);
  }
}

//NewNotInOld
for (const shaNum in newFile) {
  //Not in old file
  if (!oldFile[shaNum]) {
    NewNotInOld.push(newFile[shaNum]);
  }
}

//Turn array into String and write to file
let oldTxt = OldNotInNew.join("\n");
let newTxt = NewNotInOld.join("\n");

fs.writeFile("OldNotInNew.txt", oldTxt, function (err) {
  if (err) return console.log(err);
});

fs.writeFile("NewNotInOld.txt", newTxt, function (err) {
  if (err) return console.log(err);
});
