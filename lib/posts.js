import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';


const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}

export async function loadPosts() {
  // Call an external API endpoint to get posts
  //set a proxy to localhost 8080 and boot up dev server. 
  const res = await fetch('https://event-horizon.onrender.com/users/62f0bd386af6c4216b5bb34c', {
    mode: 'cors',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json()
  // console.log(data);

  return data.user_posts
}

export async function getData(id) {
  // Call an external API endpoint to get posts
  //set a proxy to localhost 8080 and boot up dev server. 
  const res = await fetch(`https://event-horizon.onrender.com/blogs/${id}`, {
    mode: 'cors',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json()
  // console.log(data);

  return data.article
}

export async function loadPost() {
  // Call an external API endpoint to get posts
  //set a proxy to localhost 8080 and boot up dev server. 
  const res = await fetch('https://event-horizon.onrender.com/users/62f0bd386af6c4216b5bb34c', {
    mode: 'cors',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json()
  // console.log(data);

  return data.user_posts
}