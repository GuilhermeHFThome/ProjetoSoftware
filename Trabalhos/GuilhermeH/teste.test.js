/* identificação */
const identifica = require('./Exerc_1');
const string = require('./casos_de_teste.json');

test('Identificação de valor nulo ou não definido', () => {
  for (let i = 0; i < string.Frase.string.length; i++) {
    expect(string.Frase.string[i]).not.toBeNull();
    expect(string.Frase.string[i]).not.toBeUndefined();
  }
});

test('Identificação de string, 0-5', () => {
  for (let i = 0; i < string.Frase.string.length; i++) {
    expect(identifica(string.Frase.string[i])).toContain(string.Palavra.string[i]);
  }
});

/* Inversão */
const reversedNum = require('./Exerc_11');
const num = require('./casos_de_teste.json');

test('Identificação de valor nulo, não definido e valore max e min dos numeros inicias', () => {
  for (let i = 0; i < num.NumInicial.num.length; i++) {
    expect(num.NumInicial.num[i]).not.toBeNull();
    expect(num.NumInicial.num[i]).not.toBeUndefined();
    expect(num.NumInicial.num[i]).toBeGreaterThan(0);
    expect(num.NumInicial.num[i]).toBeLessThan(1001);
  }
});

test('Inversão de numeros', () => {
  for (let i = 0; i < num.NumInicial.num.length; i++) {
    expect(reversedNum(num.NumInicial.num[i])).toBe(num.NumInvertido.num[i]);
  }
});