import type { GetStaticProps, NextPage } from "next";
import { Header } from "../components/Header";
import { ViewPostsButton } from "../components/ViewPostsButton";
import HeadPage from "../infra/components/Head/Head";

import styles from "../styles/pages/home.module.scss";

const Home: NextPage = () => {
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
      <main className={styles.home}>
        <section className={styles.home__content}>
          <div className={styles.home__content__text}>
            <h3>👋 hey, welcome</h3>
            <h1>
              News about
              <br /> the <span>React</span> world
            </h1>
            <ViewPostsButton />
          </div>
          <picture>
            <source srcSet="/images/logo.svg" type="image/svg" />
            <img src="/images/avatar.svg" alt="Ignews" />
          </picture>
        </section>
      </main>
    </>
  );
};

export default Home;
