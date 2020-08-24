
function buscarCidade(){
    let city = 'Belo Horizonte';
    axios.get(`http://api.postmon.com.br/v1/geo/cities/${city}`)
    .then(response => {

      console.log(response);
      //document.getElementById("cidade").innerHTML = dados.bairro;
    })
    .catch(error => {
        console.log(error);
    });
  }