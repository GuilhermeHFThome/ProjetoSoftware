const somaparouimpar = require('./split');
const par = require('./split')
const impar = require('./split')
const num = require("./split.json")



test('soma par ou soma impar', () => {
    for (let i = 0; i < num.entrada.num.length; i++) {
      expect(somaparouimpar(num.entrada.num[i])).toBe(num.saida.num[i]);
    }
  });