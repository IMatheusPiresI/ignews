import Head from "next/head";
import { ReactNode } from "react";

type HeadPageProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export default function HeadPage({
  title,
  description,
  children,
}: HeadPageProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      {children}
    </Head>
  );
}
