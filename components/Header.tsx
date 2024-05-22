import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();

  

  let left = (
    <div className="left" >
      <Link legacyBehavior href="/">
        <a className="bold" data-active={isActive('/')}>
          Eventos
        </a>
      </Link>
      <style jsx>{`
        .bold {
          font-weight: bold;
         
        }

        a {
          text-decoration: none;
          color: var(--geist-foreground);
          display: inline-block;
          font-family: Helvetica;
          font-size: 13.333px;
        }

        .left a[data-active='true'] {
          color: gray;
        }
        .left a{
          border: 1px solid ;
            padding: 0.5rem 1rem;
            border-radius: 6px;
        }

        a + a {
          margin-left: 1rem;
        }
      `}</style>
    </div>
  );
  let topo = null
  let right = null;

  if (status === 'loading') {
    left = (
      <div className="left">
        <Link legacyBehavior href="/">
          <a className="bold" data-active={isActive('/')}>
            Eventos
          </a>
        </Link>
        <style jsx>{`
          .bold {
            font-weight: bold;
            
          }

          a {
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
            font-family: Helvetica;
            font-size: 13.333px;
          }

          .left a[data-active='true'] {
            color: gray;
          }
          .left a{
            border: 1px solid #0f1729;
              padding: 0.5rem 1rem;
              border-radius: 6px;
          }

          a + a {
            margin-left: 1rem;
          }
        `}</style>
      </div>
    );
    right = (
      <div className="right">
        <p>Validando Sessão...</p>
        <style jsx>{`
          .right {
            margin-left: auto;
          }
        `}</style>
      </div>
    );
  }

  if (!session) {
    right = (
      <div className="right">
        <Link legacyBehavior href="/api/auth/signin">
          <a data-active={isActive('/signup')}>Entrar</a>
        </Link>
        <style jsx>{`
          a {
            text-decoration: none;
            color: #fff;
            display: inline-block;
            background-color: #0f1729;
            font-family: Helvetica;
            font-size: 13.333px;
          }
          a:hover{
            background-color: #364d81;  
          }

          a + a {
            margin-left: 1rem;
          }

          .right {
            margin-left: auto;
          }

          .right a {
            border: 1px solid var(--geist-foreground);
            padding: 0.5rem 1rem;
            border-radius: 6px;
          }
        `}</style>
      </div>
    );
  }

  if (session) {
    left = (
      <div className="left">
        <Link legacyBehavior href="/">
          <a className="bold" data-active={isActive('/')}>
            Eventos
          </a>
        </Link>
        <Link legacyBehavior href="/drafts">
          <a data-active={isActive('/drafts')}>Rascunhos</a>
        </Link>
        <style jsx>{`
          .bold {
            font-weight: bold;
          }

          a {
            text-decoration: none;
            color: #fff;
            display: inline-block;
            background-color: #0f1729;
            font-size: 13.333px;
            font-family: Helvetica;
          }
          a:hover{
            background-color: #364d81;  
          }
          .left{
            padding: 2rem;
          }

          .left a[data-active='true'] {
            color: #0f1729;
            background-color: var(--geist-foreground);
          }
          .left a{
            border: 1px solid #0f1729;
              padding: 0.5rem 1rem;
              border-radius: 6px;
          }

          a + a {
            margin-left: 1rem;
          }
        `}</style>
      </div>
    );
    right = (
      <div className="right">
        
        <Link href="/create">
          <button>
            <a>Novo Post</a>
          </button>
        </Link>
        <button onClick={() => signOut()}>
          <a>Sair</a>
        </button>
        <style jsx>{`

         
          a {
            text-decoration: none;
            color: #fff;
            display: inline-block;
            font-weight: bold;
            background-color: #0f1729;
            font-family: Helvetica;
          
          }
          a:hover{
            background-color: #364d81;  
          }

        

          a + a {
            margin-left: 1rem;
          }

          .right {
            margin-left: auto;
            padding: 2rem;
            
           
          }

          .right a {
            border: 1px solid #0f1729;
            padding: 0.5rem 1rem;
            border-radius: 6px;
            
          }

          button {
            border: none;
            padding: 0;
            margin: 0 8px 0 8px;
          }
        `}</style>
      </div>
    );
    topo = (
      <div className="avatar">
      <img src={session.user?.image} width={50} 
              height={50} alt="" />
          <p>
            {session.user.name}
          </p>
          <style jsx>{`
          .avatar{
            width:150px;
            background-color: #fff;
            border-radius: 8px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              box-shadow: 1.5px 1.5px 3px #aaa;
  
          }
          img{
            border-radius: 100px;
            padding: 0;
            margin: 1rem 0 0 0
            
          }
          p {
            display: inline-block;
            font-size: 12px;
            padding-right: 0.5rem;
            padding-left: 0.5rem;
            font-weight: 600;
            font-style: italic;
          }
          `}</style>
          </div>
    );
  }

  return (
    <nav>
      {topo}
      {left}
      {right}
      <style jsx>{`
        nav {
          display: flex;
          padding: 1rem;
          align-items: center;
          background-color: #d7deee;
          justify-content: center;
        }
      `}</style>
    </nav>
  );
};

export default Header;