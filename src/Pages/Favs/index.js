import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './favs.css';

function Favs() {
  const [filmes, setFilmes] = React.useState([]);

  React.useEffect(() => {
    const minhaLista = localStorage.getItem('@primeFlix');
    setFilmes(JSON.parse(minhaLista) || []);
  }, []);

  function excluiFilme(id) {
    let filtroFilmes = filmes.filter((item) => {
      return (item.id !== id);
    });

    setFilmes(filtroFilmes);
    localStorage.setItem('@primeFlix', JSON.stringify(filtroFilmes));
    toast.success('Filme removido com sucesso!');
  }

  return (
    <div className='container meus-filmes'>
      <h1>Meus favoritos</h1>

      {filmes.length === 0 && <span>Você não tem nenhum filme salvo ainda</span>}

      <ul>
        {filmes.map((filme) => {
          return (
            <li key={filme.id}>
              <span>{filme.title}</span>
              <div>
                <Link to={`/filme/${filme.id}`}>Ver detalhes</Link>
                <button onClick={() => excluiFilme(filme.id)}>Excluir</button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  );
}

export default Favs;