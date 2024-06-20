import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import PostCard from '../../components/PostCard';
import { getPosts } from '../../utils/data/postData';

function Home() {
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  const getAllPosts = () => {
    getPosts().then((data) => setPosts(data));
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <>
      <article className="posts">
        <h1>Posts</h1>
        {posts.map((post) => (
          <section key={`post--${post.id}`} className="post">
            <PostCard title={post.title} publicationDate={post.publication_date} imageUrl={post.image_url} content={post.content} approved={post.approved} rareUserId={post.rare_user_id} onUpdate={getAllPosts} />
          </section>
        ))}
      </article>
      <>
        <Button onClick={() => { router.push('/posts/new'); }}>
          New Post
        </Button>
      </>
    </>
  );
}

export default Home;
