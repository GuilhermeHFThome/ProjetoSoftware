
function reversedNum(num) {
  return (
    parseFloat(/* Converte o numero em float */
      num
        .toString()/* Transforma em string */
        .split('')/* Dividi os caracteres em array */
        .reverse()/* Realiza a inversão do array */
        .join('')/* Junta novamente */
    ) * Math.sign(num)
  )                 
}

module.exports = reversedNum;

console.log(reversedNum(123))//321
console.log(reversedNum(120))//21