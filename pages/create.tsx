import React, { useState } from 'react';
import Layout from '../components/Layout';
import Router from 'next/router';

const Draft: React.FC = (props) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  //const [system, setSystem] = useState('');
  //const [total_players, setTotalPlayers] = useState('');
  //const [date, setDate] = useState('');

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, content };
      
      await fetch('http://localhost:3000/api/post/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        
      });
      await Router.push('/drafts');
    } catch (error) {
      
      console.error(error);
    }
  };

  return (
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <h1>Novo Rascunho</h1>
          <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título"
            type="text"
            value={title}
          />
     
          <textarea
            cols={50}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Conteúdo"
            rows={8}
            value={content}
          />
          <input disabled={!content || !title} type="submit" value="Criar" />
          <a className="back" href="#" onClick={() => Router.push('/')}>
            ou Cancelar
          </a>
        </form>
      </div>
      <style jsx>{`
        .page {
          background: var(--geist-background);
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type='text'], 
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }
        input[type='number'], [type='date']{
          width: 200px;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type='submit'] {
          background: #0f1729;
          color: #fff;
          font-weight: 600;
          border: 0;
          padding: 0.7rem 2rem;
          border-radius: 6px;
          font-size: 16px;
          font-family: Helvetica;
          letter-spacing: .6px;
        }
        a{
          text-decoration: none;
            color: #fff;
            display: inline-block;
            background-color:  #364d81;
            font-family: Helvetica;
            font-size: 16px;
            padding: 0.7rem 2rem;
            border-radius: 6px;
        }

        .back {
          margin-left: 1rem;
        }
        div{
            padding-top: 1rem;
            padding-bottom: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Draft;

    /* <input
            autoFocus
            onChange={(e) => setSystem(e.target.value)}
            placeholder="Sistema"
            type="text"
            value={system}
          />
            <div>Data de Início <input
            autoFocus
            onChange={(e) => setDate(e.target.value)}
            placeholder=""
            type="date"
            value={date}
          /></div>
            <div>Vagas <input
            autoFocus
            onChange={(e) => setTotalPlayers(e.target.value)}
            placeholder=""
            type="number"
            value={total_players}
          /></div> */