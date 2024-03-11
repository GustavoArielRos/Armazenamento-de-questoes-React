
//Importação de designe
import  Button  from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card';

//Importando o componente link(não é um hook)
import {Link} from "react-router-dom"

//O componente recebe id, name e a função deletarPasta originária da pagina Folders
function FolderCard({id,name,deletarPasta}) {

    //função para deletar uma pasta apartir de seu id
    const remove = (e) => {
        e.preventDefault()
        deletarPasta(id)//Dessa forma eu consigo ativar a função deletarPasta da pagina Folders por aqui, pois ela foi passada pela props
                        //se voce perceber o id eu uso do que eu recebi la da props
    }

    return (
        <div>

            <Card style={{ width: '80rem' }}>{/*define o tamanho do card */}
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    

                    <Link to={`/folder/${id}`}>{/*eu levo o usuario até a pagina com URL, sendo o ultimo referente ao id da pasta, ou seja, eu levo o usuário até a página da pasta que tem esse id */}
                        <Button variant="primary" style={{margin: '5px'}}>Editar</Button>
                    </Link>
                    
                    {/*esse botão vai acionar para rodar a função remove */}
                    <Button variant="primary" onClick={(e) => remove(e)}>
                        Deletar
                    </Button>
                </Card.Body>
            </Card>
        </div>
      );
  
}

export default FolderCard
