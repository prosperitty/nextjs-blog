import Layout from '../../components/layout';
import { getData } from '../../lib/posts';
// Add this import
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';
import { loadPost } from '../../lib/posts';

export async function getStaticPaths() {
  //fetch paths from api must map and return an array of ids for each post
  // Call an external API endpoint to get posts
  const posts = await loadPost();

  // Get the paths we want to prerender based on posts
  // In production environments, prerender all pages
  // (slower builds, but faster initial page load)
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }));

  // { fallback: false } means other routes should 404
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const postData = await getData(params.id);
  const { largeDataField, ...filteredData } = postData;  
  return {
    props: {
      postData: filteredData,
    },
  };
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.content }} />
      </article>
    </Layout>
  );
}
