import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import Date from '../components/date';
import { loadPosts } from '../lib/posts';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  const posts = await loadPosts();
  return {
    props: {
      allPostsData,
      posts,
    },
  };
}

function renderPosts(data, path) {
  return data.map(({ id, date, title }) => (
    <li className={utilStyles.listItem} key={id}>
      <Link href={`/${path}/${id}`}>{title}</Link>
      <br />
      <small className={utilStyles.lightText}>
        <Date dateString={date} />
      </small>
    </li>
  ));
}

export default function Home({ allPostsData, posts }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Welcome to my blog page! My name is Alex Marmolejo. I am a self-taught
          Full-Stack Javascript Developer based in New York. My skill set
          includes the MERN stack and "T3 stack". With these skills, I am able
          to build functional and visually appealing full-stack web applications
          with attention to detail.
        </p>
        <p>
          Aside from coding, investing and trading in stocks or cryptocurrencies
          is an active hobby I have participated in since my college years. I
          try to
          <a href='https://nextjs-blog-git-main-alex-lvl.vercel.app/'> blog </a>
          about interesting economic events and how they affect the price of
          these assets.
        </p>
      </section>
      {/* Add this <section> tag below the existing <section> tag */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {/* {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))} */}
          {renderPosts(allPostsData, 'posts')}
          {renderPosts(posts, 'profile')}
        </ul>
      </section>
    </Layout>
  );
}
