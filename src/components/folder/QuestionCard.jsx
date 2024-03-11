//Importação de componentes de designe
import  Container  from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"

//Importação para uso
import { Link } from "react-router-dom"
import { useState } from "react";

//Importação de componentes criados
import InputEditQuestion from "../form/InputEditQuestion";

function QuestionCard({id,questao,resposta,deleteQuestion,editQuestion}) {

    //Criando variável de estado
    const [showQuestionForm, setShowQuestionForm] = useState(false);//serve para controlar a exibição do formulário

    //perceba que as duas funções abaixo servem somente para chamar as funções da page Folder é na Folder que realmente acontece a parada aqui a gente só "conecta" elas(chama elas)

    //Função para editar
    const edit = (questionedit) => {
        
        setShowQuestionForm(false)
        editQuestion(id,questionedit)//ele chama a função da page Folder e passa tanto o id recebido na props e a questão editada
    }

    //Função para excluir a questão
    const remove = (e) => {
        e.preventDefault()
        deleteQuestion(id)//ela chama a função da page Folder e passa o id recebido na pros
    }

    //Função que faz aparecer e desaparecer o formulário de edição
    const questionform = (e) => {
        e.preventDefault()
        setShowQuestionForm(!showQuestionForm)//a variável de estado sempre vai receber seu valor inverso toda vez que essa função for acionada
    }

    return (
        <div>

            <Card style={{ width: '80rem' }}>
                <Card.Body>
                    <Card.Title>{questao}</Card.Title>{/*a questão vira o titulo */}
                    <Card.Subtitle className="mb-2 text-muted">{resposta}</Card.Subtitle>{/*a resposta vira o subtítulo*/}
                    

                    <Button 
                        variant="secondary"
                        onClick={(e) => questionform(e)} //Aqui eu aciono a função questionform(pra exibir e esconder o formulário de edição)
                        style={{margin: '5px'}}
                    >
                        Editar
                    </Button>
                    <Button 
                        variant="secondary"
                        onClick={(e) => {remove(e)}}// Aqui eu aciono a função remove que aciona a função deleteQuestion da page Folder
                    >
                        Excluir
                    </Button>
                    {showQuestionForm && 
                        <InputEditQuestion 
                            id={id} //passando o id recebido na props
                            edit={edit} // passando a função edit e consequentemente eu passo a função editQuestion da page Folder
                            questionform={questionform} //passando a função questionform 
                        /> 
                    }
                    
                </Card.Body>
            </Card>
        </div>
      );

}

export default QuestionCard
