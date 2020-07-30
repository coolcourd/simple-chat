fs = require('fs');

const getData = (path) => {
    const dataFile = `../public/data/${path}.json`
    try {
        return require(dataFile)
    } catch(error) {
        console.log(`Data not found. can not open ${dataFile}`)
        return []
    }
}

const addData = (path, data) => {
    let allData
    const dataFile = `../public/data/${path}.json`
    try {
        allData = require(dataFile)
    } catch(error) {
        allData = []
    }
    allData.push(data)
    fs.writeFile(dataFile.substr(1), JSON.stringify(allData, undefined, 2), (err) => {
        if (err) return console.log("could not write file",err);
        console.log(`Wrote to ${dataFile.substr(1)}`);
      });
}


module.exports = {getData, addData}