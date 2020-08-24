const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

async function pesquisar() {
    let loading = true;
    const categoria = document.getElementById('categoria').value;
    const key = '639a22fb47cc4abd81a5092d37618c60'
    const data = new Date();

    if (categoria.length == 0) return Toast.fire({
        icon: 'error',
        title: 'Digite um tema para continuar'
      })

    const area = document.getElementById("noticias");

    if (loading == true) {
        area.innerHTML = '<img class="w-50" src="./assets/0_BaN9eXoTV-r1AKge.gif" alt="carregando"/>'
    }


    await axios.get(`http://newsapi.org/v2/everything?q=${categoria}&from=${data.toLocaleDateString().replace(/[/]/g, '-')}&language=pt&sortBy=relevancy&pageSize=5&apiKey=${key}`)
    .then(res => {
        console.log(res)
        if (res.data.articles.length === 0) {
            area.innerHTML = '';
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Não encontramos nada com essa busca!',
            })
        }
        loading = false;
        renderizar(res.data.articles);
    })
    .catch(err => {
        console.log(err)
        loading = false;
        area.innerHTML = '';
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Não foi possível efetuar a pesquisa!' + err,
        })
    })
}

function renderizar(noticias) {
    const area = document.getElementById("noticias");

    const lista = document.createElement('ul');
    lista.classList.add('list-group');

    area.innerHTML = '';

    for (const noticia of noticias) {
        lista.innerHTML += '<li class="list-item mb-4" style="list-style: none;">'
                        +       '<div class="card" styles="height:50px;">'
                        +           `<div class="card-body">`
                        +               `<div class="row">`
                        +                   `<div class="col-4">`
                        +                       `<img class="card-img" styles="height:50px;" src="${noticia.urlToImage}" alt="Card image cap"/>`
                        +                   `</div>`
                        +                   `<div class="col-8">`
                        +                       `<h6 class="card-title">${noticia.title}</h5>` 
                        +                       `<p class="card-text">${noticia.description}</p>`    
                        +                   `</div>`
                        +               `</div>`
                        +           `</div>`
                        +           `<div class="card-footer">`
                        +               `<a href="${noticia.url}" class="btn btn-primary btn-block">Ver Notícia</a>`
                        +           `</div>`
                        +       `</div>`
                        +  '</li>'
    }  

    area.appendChild(lista);
}
