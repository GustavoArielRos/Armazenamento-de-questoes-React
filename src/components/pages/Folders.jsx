
//Import de designe
import Container  from "react-bootstrap/Container"

//Import de uso(hooks)
import { useState,useEffect } from "react"

//Importação de componente criado
import FolderCard from "../folder/FolderCard";



function Folders() {

    //Criando uma variável de estado que começa com um valor de array vazio
    const [allFolders, setAllFolders] = useState([]);

    //O useEffect é chamado após o componente ser montado
    //Ele é usado para lidar com ações que acontecem apos a renderização de componentes
    useEffect(() => {
        fetch('http://localhost:5000/folders' ,{
            method: 'GET',//Esse método faz a gente pegar dados do servidor
            headers: {
                "Content-Type": "application/json",
            },
        })
           .then((resp) => resp.json())//pega a resposta do servidor e transforma em JSON
           .then((data) =>{
                setAllFolders(data)//pega esses dados agora em JSON e coloca eles na variavel de estado
           })

    },[])// O segundo argumento '[]' indica que esse efeito acima só deve ser realizado uma vez após a montagem do componente
        //  A variavel de estado começa assim ai depois que ela for preenchida isso acima não acontece mais, isso impede que o negócio fique atualizando toda hora sem parar, é só para atualizar e renderizar o componente uma vez
        //toda vez que a variavel de estado for um array vazio isso acima será executado

    //Função para deletar uma pasta a partir do id dela    
    function deletarPasta(id){


        fetch(`http://localhost:5000/folders/${id}`,{//Esse é o URL que será usada para deletar a pasta, se a URL final for "http://localhost:5000/folders/443" então a pasta com ID 443 será deletada
            method: "DELETE",//Vai deletar algo do servidor
            headers: {
                'Content-Type': 'application/json'
            },

        }).then((resp) => resp.json())
        .then((data) => {
            setAllFolders(allFolders.filter((pasta) => pasta.id !== id))//Ele não deleta, na real ele pega todos os dados e vai passar para a variável de estados todos os dados EXECETO aquele que possui o ID da URL
        })
        .catch((err) => console.log(err))
    }

    return (
        <div>
            <Container>
                <h1>Minhas Pastas</h1>
            </Container>
            <Container>
                {/*Aqui eu faço uma verificação, se tem pastas na variavel de estado ele faz algo se não ele faz outra coisa */}
                {allFolders.length > 0 && 
                    //o map vai passar pelo array e cada indice do array ele irá fazer algo(nesse caso ele ira gerar o componente FolderCard para cada índice do vetor)
                    allFolders.map((folder) => (
                        <FolderCard 
                                id={folder.id}//passando o id da pasta 
                                name={folder.pasta}//passando o nome da pasta
                                deletarPasta={deletarPasta}//passando a função deletarPasta da pagina Folders
                        />
                    ))       
                }
                {allFolders.length === 0 && (
                    <p>Não há pastas</p>
                 )

                }

            </Container>
            
        </div>
    )
}

export default Folders
