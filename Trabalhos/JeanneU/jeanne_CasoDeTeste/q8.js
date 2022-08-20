function contador_vogal(str) { 
    
    var contador = 0;
    var vogal = /[aeiou]/i;
  
    for(var i = 0; i < str.length; i++) {
      if(str[i].match(vogal)) {
        contador++;
      }
    }

    return contador;
  }
  

module.exports = contador_vogal; 