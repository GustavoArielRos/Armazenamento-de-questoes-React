//Importação de designe
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

//Importação de uso(hook)
import { useState } from 'react';


//O componente recebe a função "criandoPasta" que veio da página "CreateFolder"
function InputFolder({criandoPasta}) {

    //Criando a variável de estado, ele inicializa com um objeto vazio
    const [pasta,setPasta] = useState({});


    //Aqui estamos adicionando o que o usuário digitou na variável de estado
    //Perceba que a variável de estado é um objeto, no qual a chave é o "name"
    //e o valor é o value
    function handleChange(e){

        setPasta({...pasta,[e.target.name]: e.target.value})//Atualiza a 'pasta' com um novo objeto que inclui todos os valores anterios da 'pasta' e o novo valor

    }

    //Aqui pegamos o que está na variável de estado e adicionando ela na função da página "CreateFolder"
    //Lá ela é adicionado no json "backend"
    const submit = (e) =>{
        e.preventDefault();
        criandoPasta(pasta);//chama a função que recebemos la da página "CreateFolder"
        setPasta({})//limpando a variável de estado 'pasta'
    }

    return (
        <div>
            <Container>
                <Form >
                    <Form.Group className="mb-3" >
                        <Form.Label>Nome Pasta</Form.Label>
                        <Form.Control
                            name="pasta" 
                            type="text" 
                            placeholder="Nome" 
                            value={pasta.pasta || ''} //o valor do input ou é o valor da pasta atual ou é um string vazia
                            onChange={((e) => handleChange(e))}
                        />
                    </Form.Group>
                
                    <Button variant="primary" onClick={(e) => submit(e)}>
                        Adicionar
                    </Button>
                </Form>
            </Container>
        </div>
    )
}

export default InputFolder
