const api=process.env.API

function plusWord(string){
    let arr = string.split(' ')
    let newString = arr.join("+")
    console.log(newString)
}

plusWord('Your');