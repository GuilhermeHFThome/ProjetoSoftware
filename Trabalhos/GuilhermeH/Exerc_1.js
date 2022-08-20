function identifica(string) {
  return (
    string.substring(0,5)/* Retornar string 6 primeiros disgitos */
  )
}

module.exports = identifica;


/* Resultado da string ===> */
console.log(identifica('hoje é meu dia preferido de aula remota')) //'hoje '
console.log(identifica('Mauris sit amet')) //'Mauri '

