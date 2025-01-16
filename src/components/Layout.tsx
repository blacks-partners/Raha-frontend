import Head from "next/head";
import Header from "./Header";

interface Props {
  headTitle: string;
  headName: string;
  headContent: string;
  pageTitle: string;
  children: React.ReactNode;
}

export default function Layout({
  headTitle,
  headName,
  headContent,
  pageTitle,
  children,
}: Props) {
  return (
    <>
      <Head>
        <title>{headTitle}</title>
        <meta name={headName} content={headContent} />
        <meta name="view  port" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/common/favicon.png" />
      </Head>
      <div>
        <Header />
        <main>
          <section>
            <p>{pageTitle}</p>
            {children}
          </section>
        </main>
      </div>
    </>
  );
}
