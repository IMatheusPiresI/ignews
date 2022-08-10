import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { RichText } from "prismic-dom";
import { Header } from "../../components/Header";
import HeadPage from "../../infra/components/Head/Head";
import { createClient } from "../../services/prismicio";

import styles from "../../styles/pages/post.module.scss";

type PostProps = {
  post: {
    slug: string;
    title: string;
    content: string;
    upadatedAt: string;
  };
};

const Preview = ({ post }: PostProps) => {
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
            className={styles.post__container__content}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
    </>
  );
};

export default Preview;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const session = await getSession({ req });
  const slug = params!.slug;
  console.log(session);

  if (!session) {
    return {
      redirect: {
        destination: `/posts/preview/${slug}`,
        permanent: false,
      },
    };
  }
  const prismic = createClient();

  const response = await prismic.getByUID("posts", String(slug), {});

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content),
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
