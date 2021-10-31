#!/usr/bin/env node

const yargs = require("yargs");
const axios = require("axios");
const fs = require('fs')

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

const options = yargs
 .usage("Usage:cdn <option>")
 .option("n", { alias: "name", describe: "Dependency name", type: "string", demandOption: true })
 .option("l", { alias: "limit", describe: "Result limit, default value is 10", type: "string", demandOption: false })
 .argv;

if(!options.limit){
    var url = `https://api.cdnjs.com/libraries?search=${options.name}&fields=filename,version&limit=10`;
}
else{
    var url = `https://api.cdnjs.com/libraries?search=${options.name}&fields=filename,version&limit=${options.limit}`;
}
    


axios.get(url)
  .then(function (response) {

    console.log('\nCDN Finder\n----------------\n')
    
    if(response.data.results.length > 0){

        for (let i = 0; i < response.data.results.length; i++) {
        
            console.log(`${i}\t${response.data.results[i].filename}\t${response.data.results[i].version}`);
            
        }
    }
    else{
        console.log('No results found')
    }
    
    readline.question('\nWhich file do you want to save? ', num => {

        if(num == 'no'){

        }
        else if(num >= 0){

            let cdn = response.data.results[num].latest
            let fileName = response.data.results[num].filename
            downloadFile(cdn,fileName)
        }
            
        readline.close();
    });

  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })

  const downloadFile = (cdn,fileName) => {

    axios.get(cdn)
    .then(res => {

        fs.writeFile(fileName,res.data,(err) => { 
            if (err) {throw err }

            else{
                console.log('File saved successfully')
            }
        })
    })
    .catch(err => {

        console.log(err)
    })
  }



   
  