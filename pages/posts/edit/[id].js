import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../utils/context/authContext';
import { getSinglePost } from '../../../utils/data/postData';
import PostForm from '../../../components/forms/PostForm';

export default function EditPost() {
  const [editPost, setEditPost] = useState([]);
  const router = useRouter();

  const { id } = router.query;
  const { user } = useAuth();

  useEffect(() => {
    getSinglePost(id).then(setEditPost);
  }, [id]);

  return (
    <PostForm postObj={editPost} setEditPost={setEditPost} user={user} />
  );
}
