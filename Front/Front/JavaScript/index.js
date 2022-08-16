function contarTexto(campo, limite, container) {
  if (campo.value.length > limite) {
  campo.value = campo.value.substring(0, limite);
  } else {
  d = document.getElementById(container);
  d.innerHTML = 'Restam ' + (parseInt(limite) - parseInt(campo.value.length));
  }
 }
 document.getElementById("password").addEventListener("keydown", function(){
  contarTexto(this, 10, "falta");
 });

$(document).ready(function(){
  $('#num').mask('(00) 0000-0000'), {reverse: true};
  $('#cpf').mask('000.000.000-00'), {reverse: true};
  $('#cep').mask('00000-000'), {reverse: true};
});