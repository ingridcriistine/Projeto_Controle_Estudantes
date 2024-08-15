let photo = document.getElementById('img-aluno');
let file = document.getElementById('input-img');

photo.addEventListener('click', () => {
    file.click();
});

file.addEventListener('change', () => {

    // Sem essa verificação, ele irá dar erro quando o usuário clicar em cancelar
    // pois enviará uma "imagem" vazia
    if (file.files.length == 0) {
        return;
    }

    // Inicializando a função que pega o caminho da imagem
    let reader = new FileReader();

    // Está pegando o caminho da imagem
    reader.readAsDataURL(file.files[0]);
    
    // Coloca o caminho da imagem no Source da tag IMG
    reader.onload = () => {
        photo.src = reader.result
    }

});