
//Importação de componentes para designe
import  Button  from "react-bootstrap/Button"
import  Container  from "react-bootstrap/Container"

//Importação para uso, algumas aqui são hooks
import  { useState,useEffect }  from "react"
import  { useParams } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid'

//Importação de componentes criados
import QuestionCard from "../folder/QuestionCard";
import InputQuestion from "../form/InputQuestion";

function Folder() {
    //aqui eu estou pegando o valor referente ao id da URL
    const { id } = useParams();

    
    //Criando duas variáveis de estado com valor inicial sendo um array vazio
    const [pasta, setPasta] = useState([]);
    const [questoes,setQuestoes] = useState([]);
    
    //Ajuda na renderização de componente através da requisição de dados do servidor
    useEffect(() => {
        fetch(`http://localhost:5000/folders/${id}`,{//pegando os dados da pasta referente a essa URL
            method: "GET",//para pegar os dados da requisição
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((resp) => resp.json())//transofrma tudo em json
        .then((data) => {//pega essas dados em json
            setPasta(data)//atualiza a variável de estado com os dados referente a pasta obtida
            setQuestoes(data.questions)//atualiza a variável de estado referente as questões das pastas obtidias
        })
        .catch((err) => console.log(err))
    },[id])//toda vez que o valor do "id" mudar isso acima será executado
           //recebeu o valor do id executa aquilo acima e só volta a fazer isso de novo quando o valor do id for diferente

    //Função para criar uma nova questão     
    function createQuestion(pasta){

        //acessando o ultimo elemento do array
        const lastQuestion = pasta.questions[pasta.questions.length - 1]

        //adicionando um id a esse ultimo elemento do array de questions
        lastQuestion.id = uuidv4()

        //update pasta
        fetch(`http://localhost:5000/folders/${pasta.id}` , {//${pasta.id} é usado para criar uma URL dinâmica, é pasta.id pois queremos acessar o objeto que possui um id, quando queremos acessar algo que está dentro de alguma coisa específica , meio que escrevemos "ID/ID"
            method: 'PATCH',//Pedindo ao servidor para fazer alteração em algo que já existe
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pasta) //adicionando a pasta em modo json
        }).then((resp) => resp.json())
          .then((data) => {
            console.log(data)//eu pego os dados mas não uso eles para nada
          })
          .catch((err) => console.log(err))

    }

    //Função para deletar uma questão
    function deleteQuestion(id) {

        //fazendo um filtro, vou armazenar na variável todas as questões menos aquele que possui o id do parâmetro da função
        const questionUpdated = pasta.questions.filter(
            (questao) => questao.id !== id
        )
        
        //adiciona na variável o valor que está na variável de estado(pasta)
        const pastaUpdated = pasta
        
        //adiciono as questões filtradas no array "questions" existente na pasta
        pastaUpdated.questions = questionUpdated
        
        //mesmo esquema da anterior, eu estou acessando a pasta pelo id especifico(acessando algo dentro de algo)
        fetch(`http://localhost:5000/folders/${pastaUpdated.id}` ,{
            method: 'PATCH',//Pedindo ao servidor para fazer alteração de algo que já existe
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pastaUpdated)//adicionando no body a pasta no formato json

        }).then((resp) => resp.json())
        .then((data) =>{//pego os dados,porém não uso eles
            setPasta(pastaUpdated)// adiciono  a nova pasta na pasta(variável de estado)
            setQuestoes(questionUpdated)//e as novas questões na variavel de estado questioes
        })
        .catch((err) => console.log(err))
    }


    //Função para editar uma questão
    function editQuestion(id, updateQuestionData){
        
        //Atualiza os dados da questão com o id fornecido e também o "updtateQuestionData"
        //perceba que eu adiciono pelo .questao ou usando o .find e id
        const questaoAtualizada ={
            questao: updateQuestionData.questao || pasta.questions.find(questao => questao.id === id).questao,
            resposta: updateQuestionData.resposta || pasta.questions.find(questao => questao.id === id ).resposta
        }

        //encontrando a questao para ser editada
        //atualiza as questões da pasta com a questão editada
        //eu basicamente vou ter um novo array que vai ser gerado a partir desse map no pasta.questions
        const questoesAtualizadas = pasta.questions.map(questao => {
            if(questao.id === id){//se o id da questao for igual ao id do parametro passado na função
                return { ...questao, ...questaoAtualizada };//os valores do "questaoAtualizada" irão substituir os valores da "questao"
            }
            return questao;
        })

        //quase a mesma idea que a de cima
        //esse nova variavel vai receber os valores da pasta
        //porém os valores dentro do "questions" dessa pasta foi substituido pelos valores armazenados dentro da"questoesAtualizadas"
        const pastaAtualizada = { ...pasta, questions: questoesAtualizadas};

        
        //realizando a requisição PATCH para atualizar a questao no servidor
        fetch(`http://localhost:5000/folders/${pastaAtualizada.id}`, {//eu poderia tanto colocar pasta ou pastaAtualizada, ambas são pasta e possuem id então no caso eu acesso o "mesmo" pelo id, eu coloquei pastaAtualizada para fazer mais sentido na leitura
            method: 'PATCH',//vou alterar no servidor algo que já existe
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pastaAtualizada),//colocar os dados de pasta atualizados como json
        })
        .then((resp) => resp.json())
        .then((data) => {//pego os dados mas não uso
            setPasta(pastaAtualizada)//colocanda a pastatualizada na variavel de estado pasta
            setQuestoes(questoesAtualizadas)//colocando as questoes atualizdas na varivavel de estado questoes
            
        })
        .catch((err) => console.log(err))

    }

    


    return (
        <div>
            <Container>
                <h1>{pasta.pasta}</h1>
            </Container>
            <Container>
                <h3>Adicionar questao</h3>
                {/*esse componente irá receber a função "createQuestion" da página "Folder" e a variável de estado "pasta" */}
                <InputQuestion 
                    createQuestion={createQuestion}
                    pasta={pasta}
                />
            </Container>
            <br></br>
            <Container>
                {/*aqui pode gerar uma das duas opções de acordo com o questoes.length */}
                {questoes.length > 0 &&
                  questoes.map((questao) => (
                    //usando o componente criado
                    <QuestionCard 
                        id={questao.id} //passando o id da questão
                        questao={questao.questao}// passando a questao da questao
                        resposta={questao.resposta}//passando a resposta da questao 
                        deleteQuestion={deleteQuestion}//passando a função deleteQuestion vinda da page "Folder"
                        editQuestion={editQuestion}//passando a função editQuestion vinda da page "Folder"
                        
                    />
                  ))
                }
                {questoes.length === 0 && 
                   <p>Nao ha questoes</p>

                }
            </Container>
        </div>
    )
}

export default Folder

