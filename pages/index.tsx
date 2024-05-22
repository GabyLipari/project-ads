import React from "react"
import { GetStaticProps, InferGetStaticPropsType } from "next"
import Layout from "../components/Layout"
import Post, { PostProps } from "../components/Post"
import prisma from './lib/prisma';

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return { 
    props: { feed: JSON.parse(JSON.stringify(feed)) }, 
    revalidate: 10 
  }
}

type Props = {
  feed: PostProps[]
}

const Blog: React.FC<Props> = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout>
      <div className="page">
        <h1>Eventos</h1>
        <main>
          {props.feed.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background:  #0f1729;
          transition: box-shadow 0.1s ease-in;
          color: #fff;
          border-radius: 8px;
        }

        .post:hover {
          box-shadow: 2px 2px 5px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  )
}

export default Blog
