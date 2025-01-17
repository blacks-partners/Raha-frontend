import Head from "next/head";
import Header from "../header/Header";
import LayoutStyle from "../layout/layout.module.css";

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
        <main className={LayoutStyle.layout}>
          <Header />

          <section className={LayoutStyle.sectionLayout}>
            <h1 className={LayoutStyle.title}>{pageTitle}</h1>
            {children}
          </section>
        </main>
      </div>
    </>
  );
}
