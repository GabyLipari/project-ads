import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useSession, getSession } from 'next-auth/react';
import Layout from '../components/Layout';
import Post, { PostProps } from '../components/Post';
import prisma from './lib/prisma';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { drafts: [] } };
  }

  const drafts = await prisma.post.findMany({
    where: {
      author: { email: session.user.email },
      published: false,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return {
    props: { drafts },
  };
};

type Props = {
  drafts: PostProps[];
};

const Drafts: React.FC<Props> = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Layout>
        <h1>Meus Rascunhos</h1>
        <div>Você precisa estar logado para ver essa página.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page">
        <h1>Meus Rascunhos</h1>
        <main>
          {props.drafts.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: #eff1f5;
          transition: box-shadow 0.1s ease-in;
          border: 1px solid #b1b9ce;
        }

        .post:hover {
          box-shadow: 1.5px 1.5px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default Drafts;