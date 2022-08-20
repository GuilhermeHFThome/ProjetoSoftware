const contador_vogal = require ('./q8')
const str = require("./palavras.json")
const contador = require("./q8")

test('Verifica se a sentença é nula', () => {
    for (let c = 0; c < str.length; c++) {
      expect(str[c] == null).not.toBeNull();
    }
  });

  test('Verifica se a resposta é a esperada', () => {
    for (let c = 0; c < str; c++) {
      expect(contador_vogal(str[c])).toBe(contador[c]);
    }
  });

  test('Verificando erro' ,()=>{
    for (let c = 0; c < str; c++){
    expect(contador_vogal(contador[c])).toThrow(Error)
    }
})


test("Verifica se o contador chega a 0",() => {
    for (let c = 0; c < str; c++){
        expect(contador_vogal(contador[c])).toEqual(0)
    }
})
