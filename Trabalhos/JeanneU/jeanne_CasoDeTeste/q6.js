function frequencia_array(entrada){
    var maior = null;
    var frequenciaMaior = -1;

    for ( var i = 0 ; i < entrada.length ; i++ ) {
    var frequencia = 1;
    for ( var t = i+1 ; t < entrada.length ; t++ )
        if ( entrada[i] == entrada[t] )
        frequencia++;
    
    if ( frequencia > frequenciaMaior ) {
        maior = entrada[i];
        frequenciaMaior = frequencia;
    }

}
    return maior

}

module.exports = frequencia_array