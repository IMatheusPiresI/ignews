import type { GetStaticPaths, GetStaticProps } from "next";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { RichText } from "prismic-dom";
import { useEffect } from "react";
import { Header } from "../../../components/Header";
import HeadPage from "../../../infra/components/Head/Head";
import { createClient } from "../../../services/prismicio";

import styles from "../../../styles/pages/post.module.scss";

type PostProps = {
  post: {
    slug: string;
    title: string;
    content: string;
    upadatedAt: string;
  };
};

const Posts = ({ post }: PostProps) => {
  const { data: session } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push(`/posts/${router.query.slug}`);
    }
  }, [session, router]);

  return (
    <>
      <HeadPage title="Ignews" description="">
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=7" />
      </HeadPage>
      <Header />
      <main className={styles.post}>
        <article className={styles.post__container}>
          <h1>{post.title}</h1>
          <div
            className={`${styles.post__container__content} ${styles.previewContent}`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div className={styles.previewLogIn}>
            <p>Wanna continue reading?</p>
            <button onClick={() => signIn("Github")}>
              Sign in with your Github account.
            </button>
            🤗
          </div>
        </article>
      </main>
    </>
  );
};

export default Posts;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params!.slug;

  const prismic = createClient();

  const response = await prismic.getByUID("posts", String(slug), {});

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content.splice(0, 5)),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    ),
  };

  return {
    props: {
      post,
    },
  };
};
