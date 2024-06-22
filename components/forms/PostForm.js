import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useAuth } from '../../utils/context/authContext';
import { createPost, updatePost, deletePost } from '../../utils/data/postData';

const initialState = {
  title: '',
  image_url: '',
  content: '',
  approved: 'True',
};

const PostForm = ({ postObj }) => {
  const router = useRouter();
  const { user } = useAuth();

  const [currentPost, setCurrentPost] = useState({ ...initialState, rare_user: user?.id });
  useEffect(() => {
    if (postObj?.id) {
      setCurrentPost({
        id: postObj.id,
        title: postObj.title,
        image_url: postObj.image_url,
        content: postObj.content,
        approved: postObj.approved,
        rare_user: postObj.rare_user || user?.id,
      });
      console.warn('object was passed', postObj);
    }
  }, [postObj, user]);

  console.warn(currentPost);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const post = {
      title: currentPost.title,
      image_url: currentPost.image_url,
      content: currentPost.content,
      approved: currentPost.approved,
      rare_user: currentPost.rare_user,
    };

    if (currentPost.id) {
      post.id = currentPost.id;
      updatePost(post).then(() => router.push('/posts'));
    } else {
      createPost(post).then(() => router.push('/posts'));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FloatingLabel controlId="floatingTextarea" label="Title" className="mb-3">
          <Form.Control
            as="textarea"
            placeholder="Title"
            name="title"
            value={currentPost.title}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingTextarea" label="Image_url" className="mb-3">
          <Form.Control
            as="textarea"
            placeholder="Image_url"
            name="image_url"
            value={currentPost.image_url}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingTextarea" label="Content" className="mb-3">
          <Form.Control
            as="textarea"
            placeholder="Content"
            name="content"
            value={currentPost.content}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <Form.Check
          type="switch"
          id="custom-switch"
          label="Approved"
          name="approved"
          value={currentPost.approved}
        />
        <Button onClick={deletePost}>
          Delete Post
        </Button>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

PostForm.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  postObj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    image_url: PropTypes.string,
    content: PropTypes.string,
    approved: PropTypes.bool,
    rare_user: PropTypes.number,
  }),
};

PostForm.defaultProps = {
  postObj: initialState,
};

export default PostForm;
