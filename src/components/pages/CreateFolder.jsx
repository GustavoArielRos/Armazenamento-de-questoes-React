//Importação de Componente criado
import InputFolder from "../form/InputFolder"

//Importação de designe
import  Container  from "react-bootstrap/Container"



//A ideia é a pagina ter só os componentes dela e suas funções
function CreateFolder() {

    
    //função para criar uma nova pasta
    function criandoPasta(folder){

        folder.questions = [];//Cada pasta criada vai ter dentro dela um array vazio chamado "question"

        //faz uma requisição POST para o servidor com os dados da pasta
        fetch("http://localhost:5000/folders", {
            method: 'POST',//metodo para enviar dados para um servidor(no caso vai enviar pro json)
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(folder),//converte o objeto folder para json e envia no corpo da requisição
        })
         .then((resp) => resp.json())
         .then((data) => {
            console.log(data)
            
        })
         .catch((err) => console.log(err))

    }

    return (
        <div>
            <Container>
                <InputFolder criandoPasta={criandoPasta} />{/*Aqui a gente envia a função criandoPasta para o componente InputFolder */}
            </Container>
        </div>
    )
}

export default CreateFolder
