"use strict";

// Dependencies
const axios = require("axios")
const fs = require("fs")

// Variables
const args = process.argv.slice(2)

var  Botgen-HHG  = {
    grabIndex: 0,
    max: 0,
    results: []
}

// Functions
async function grab(accountType){
    try{
        if(Botgen-HHG.grabIndex === Botgen-HHG.max){
            console.log(`Finished grabbing ${Botgen-HHG.max} ${accountType} accounts.`)
            console.log(`Saving the results to ${args[2]}`)
            fs.writeFileSync(args[2], Botgen-HHG.results.join("\n"), "utf8")
            return console.log(`Results successfully saved to ${args[2]}`)
        }
    
        console.log(`Grabbing ${accountType} accounts. Index: ${Botgen-HHG.grabIndex}`)
    
        var response = await axios(`https://opengen.dpkghub.com/api/generate.php?type=${accountType}`)
        response = response.data
    
        if(Botgen-HHG.results.includes(response)){
            console.log(`Unable to grab ${accountType} account, due to duplicate/error. Index: ${Botgen-HHG.grabIndex}`)
            console.log("Retrying...")
            return grab(accountType)
        }
    
        Botgen-HHG.results.push(response)
    
        Botgen-HHG.grabIndex++
        grab(accountType)
    }catch{
        console.log(`Unable to grab ${accountType} account, due to duplicate/error. Index: ${Botgen-HHG.grabIndex}`)
        console.log("Retrying... Porfavor espere 2 segundos.")

        setTimeout(()=>{
            grab(accountType)
        }, 2000)
    }
}

//Main
if(!args.length) return console.log(`Account Types: Netflix, Spotify, NordVPN & Disney(Disney plus).
node index.js <accountType> <amount> <output>`)

if(isNaN(args[1])) return console.log("esto no es número 😐.")
if(!args[2]) return console.log("esto no es correcto 😐.")

args[0] = args[0].toLowerCase()
openGenBot.max = parseInt(args[1])

switch(args[0]){
    case "netflix":
        grab("Netflix")
        break
    case "spotify":
        grab("Spotify")
        break
    case "nordvpn":
        grab("NordVPN")
        break
    case "disney":
        grab("Disney")
        break
    default:
        console.log("cuenta no valida ☹️.")
        break
}
