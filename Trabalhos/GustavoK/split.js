
function somaparouimpar (num) {
    let array = num.toString().split('')
    let soma = 0


for(let i = 0; i < array.length; i++) { 
    num2 = parseInt(array[i])
    soma += num2
}

if ((soma % 2) == 0) {
    let par = "Soma par"
    return par
} else {
    let impar = "Soma impar"
    return impar
}


}




module.exports = somaparouimpar
