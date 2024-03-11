//Importação de designe
import Container  from "react-bootstrap/Container"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

//Importação de uso(caso um hook)
import { useState } from 'react'


function InputEditQuestion({edit,questionform}) {

    //Criando variável de estado
    const [questionedit, setQuestionEdit] = useState({})

    //Função para colocar as informações do evento na variável de estado
    function handleChange(e){
        e.preventDefault()
        setQuestionEdit({ ...questionedit,[e.target.name]: e.target.value})//perceba que eu coloco tudo e também o novo "name" com um novo "value"
    }

    //Função para adicionar o que está na variável de estado na função
    function submit(e){
        e.preventDefault()
        edit(questionedit)//aqui eu passo as informações do state para função edit vinda da QuestionCard que passa a informação para editQuestion vinda da Page Folder e lá é realmente feita a edição com  valor daqui

        setQuestionEdit({})//reiniciando o valor da variável de estado com um objeto vazio
        
    }

    return (
        <div>
            <Container>
                <Form  >
                    <Form.Group className="mb-3" >
                        <Form.Label>Questão</Form.Label>
                        <Form.Control
                             name="questao" //dando o nome , é sempre bom como referencia
                             type="text" 
                             placeholder="Questão"
                             onChange={(e) => handleChange(e)}//chama a função handleChange toda hora que algo é digitado
                               
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Resposta</Form.Label>
                        <Form.Control 
                            name="resposta" //dando o nome , é sempre bom como referencia
                            type="text" 
                            placeholder="Resposta"
                            onChange={(e) => handleChange(e)}//chama a função handleChange toda hora que algo é digitado
                        />
                    </Form.Group>

                    <Button 
                        variant="primary" 
                        onClick={(e) => {submit(e) ; questionform(e)}} //chama duas funções a submit e a questionForm(função vinda da QuestionCard)
                    >
                        Adicionar
                    </Button>
                </Form>

            </Container>
        </div>
    )
}

export default InputEditQuestion
