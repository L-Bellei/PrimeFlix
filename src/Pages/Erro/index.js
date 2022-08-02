import { Link } from 'react-router-dom';
import './erro.css';

function Erro() {
  return (
    <div className='not-found container'>
      <h1>Erro 404 - Página não encontrada!</h1>
      <Link to='/'>Veja todos os filmes disponíveis!</Link>
    </div>
  );
}

export default Erro;