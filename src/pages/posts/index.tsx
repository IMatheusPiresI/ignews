import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { RichText } from "prismic-dom";
import { Header } from "../../components/Header";
import HeadPage from "../../infra/components/Head/Head";
import { createClient } from "../../services/prismicio";

import styles from "../../styles/pages/posts.module.scss";

type Post = {
  slug: string;
  title: string;
  desc: string;
  upadatedAt: string;
};

interface PostsProps {
  posts: Post[];
}

const Posts = ({ posts }: PostsProps) => {
  return (
    <>
      <HeadPage
        title="Ignews"
        description="Bem vindo ao melhor blog de tecnologia, aqui você poderá conferir conteúdos sobre as tecnologias mais utilizadas no mercado."
      >
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=7" />
      </HeadPage>
      <Header />
      <main>
        <section className={styles.post}>
          {posts.map((post) => (
            <Link href={`/posts/${post.slug}`} key={post.slug}>
              <div className={styles.post__view}>
                <time>{post.upadatedAt}</time>
                <h2>{post.title}</h2>
                <p>
                  {post.desc.length > 220
                    ? post.desc.substring(0, 220) + "..."
                    : post.desc}
                </p>
              </div>
            </Link>
          ))}
        </section>
      </main>
    </>
  );
};

export default Posts;

export const getStaticProps: GetStaticProps = async () => {
  const prismic = createClient();

  const response = await prismic.getAllByType("posts");

  const posts = response.map((post) => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      desc:
        post.data.content.find(
          (content: { type: string }) => content.type === "paragraph"
        )?.text ?? "",
      updatedAt: new Date(post.last_publication_date).toLocaleDateString(
        "pt-BR",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }
      ),
    };
  });

  return {
    props: {
      posts,
    },
    revalidate: 60 * 60 * 24, // 24 horas
  };
};
