const frequencia_array = require ('./q6')
const entrada = require("./arrays.json")
const maior = require ('./q6')
const frequenciaMaior = require ('./q6')

test('Verifica se o array é nulo', () => {
    for (let c = 0; c < entrada; c++) {
      expect(entrada[c] == null).not.toBeNull();
    }
  });

  test('Verifica se a resposta é a esperada', () => {
    for (let c = 0; c < entrada; c++) {
      expect(frequencia_array(entrada[c])).toBe(maior[c]);
    }
  });

  test('Verifica se a frequencia é maior ou igual ao esperado',() => {
    for (let c = 0; c < entrada; c++) {
      expect(frequencia_array(entrada[c])).toBeGreaterThanOrEqual(frequenciaMaior[c])
    }
})


test('Verificando erro' ,()=>{
  for (let c = 0; c < entrada; c++){
  expect(frequencia_array(maior[c])).toThrow(Error)
  }
})
