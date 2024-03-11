//Importação de componentes para designe
import Container  from "react-bootstrap/Container"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

//Importação de uso ( tem hook aqui)
import { useState } from "react";
import { useNavigate } from 'react-router-dom'



function InputQuestion({createQuestion,pasta}) {

    //colocando a função "useNavigate"(função que faz mudar de página) na variavel
    const navigate = useNavigate();

    //Criando a variável de estado que inicia como um objeto vazio
    const [questao, setQuestao] = useState({})
    
    //função que adiciona o evento na variavel de estado
    function handleChange(e){
        setQuestao({...questao, [e.target.name]: e.target.value})//note que eu pego todos os valores já existen na variavel de estado e também pego o nome valor vindo do evento
    }

    //função que chama a funcao createQuestion vinda da page Folder
    function submit(e){
        
        pasta.questions.push(questao)//colocando a variavel de estado na questions da pasta na ultima posição
        createQuestion(pasta)//chamando a função createQuestion da page Folder

        //reseta os valores do inputs
        setQuestao({})

        //atualiza a pagina
        navigate('.', { replace: true });
    }

    

    return (
        <div>
            <Container>
                <Form onSubmit={(e) => submit(e)} >
                    <Form.Group className="mb-3" >
                        <Form.Label>Questão</Form.Label>
                        <Form.Control
                             name="questao" //sempre bom dar o nome como referência
                             type="text" 
                             placeholder="Questão"
                             value={questao.questao || ''}//vai aparecer ou o valor da questao ou uma string vazia
                             onChange={(e) => handleChange(e)}//chama a função handleChange a cada mudança
                               
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Resposta</Form.Label>
                        <Form.Control 
                            name="resposta" //sempre bom dar o nome como referência
                            type="text" 
                            placeholder="Resposta"
                            value={questao.resposta || ''} //vai aparecer ou o valor da resposta ou uma string vazia
                            onChange={(e) => handleChange(e)} // a função handleChange é chamada a cada mudança 
                        />
                    </Form.Group>

                    <Button 
                        variant="primary" 
                        onClick={(e) => submit(e)} //Chama a função submit 
                    >
                        Adicionar
                    </Button>
                </Form>

            </Container>
        </div>
    )
}

export default InputQuestion
