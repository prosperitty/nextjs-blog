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
          Hello! My name is Alex Marmolejo and I am a self-taught Full-Stack Javascript
          Developer based in New York. I am particularly focused on the MERN
          stack (MongoDB, Express.js, React, and Node.js) and, I am skilled in
          creating visually appealing web pages with attention to detail.
        </p>
        <p>
          Aside from coding, I enjoy various activities across the internet in
          my free time. I enjoy playing video games in a variety of genres or
          viewing the artistic storytelling of anime(japanese animation).
          Additionally, exploring the new iteration of the internet, web3, has
          become a recent interest of mine. In relation to web3/cryptocurrency,
          investing and trading in stocks or cryptocurrencies is an active hobby
          I have participated in since my college years. I try to blog about
          interesting economic events and how they affect the price of these
          assets so, make sure to checkout some of the articles I have written
          if interested!
        </p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
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
          {renderPosts(allPostsData,"posts")}
          {renderPosts(posts, "profile")}
        </ul>
      </section>
    </Layout>
  );
}
