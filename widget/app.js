const fs = require('fs')

// fs.readFile("./data-eng.json",(err,data)=>{

//     if(err){
//         return alert("error")
//     }

    

// })

// console.log()
var data = fs.readFileSync(__dirname+'/..//data-eng.json')

var mydata = JSON.parse(data);

// console.log(mydata)

var verses = mydata.data

console.log(verses)

var text = document.getElementById('text')
var n = Math.round(Math.random() * verses.length);

text.innerHTML = verses[n];
setInterval(()=>{
    var n = Math.round(Math.random() * verses.length);

    text.innerHTML = verses[n];
},1000 * 60 * 5)