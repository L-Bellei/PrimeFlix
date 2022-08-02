import React from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../Services/api';
import './filme.css';

function Filme() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [filme, setFilme] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadFilme() {
      await api.get(`/movie/${id}`, {
        params: {
          api_key: '7a2645927b5c0f2fbd062f63300d654b',
          language: 'pt-BR',
        }
      })
        .then((response) => {
          setFilme(response.data);
          setLoading(false);
        })
        .catch(() => {
          navigate('/', { replace: true });
          return;
        });
    }

    loadFilme();
  }, [id, navigate]);

  function salvarFilme() {
    const minhaLista = localStorage.getItem('@primeFlix');
    let filmesSalvos = JSON.parse(minhaLista) || [];
    const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id);

    if (hasFilme) {
      toast.warn('Esse filme já está na lista!');
      return;
    } else {
      filmesSalvos.push(filme);
      localStorage.setItem('@primeFlix', JSON.stringify(filmesSalvos));
      toast.success('Filme salvo com sucesso!');
    }
  }

  if (loading) {
    return (
      <div className="filme-info">
        <h1>Carregando detalhes do filme...</h1>
      </div>
    )
  }

  return (
    <div className="filme-info container">
      <h1>{filme.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt='Poster do Filme' />
      <div className="area-buttons">
        <button onClick={salvarFilme}>Salvar</button>
        <button>
          <a
            target='blank'
            rel='external'
            href={`https://youtube.com/results?search_query=${filme.title} trailer`}
          >
            Assistir trailer
          </a>
        </button>
      </div>
      <h3>Sinopse</h3>
      <span>{filme.overview}</span>
      <strong>Avaliação: {filme.vote_average.toFixed(1)} / 10</strong>
    </div>
  )
}

export default Filme;