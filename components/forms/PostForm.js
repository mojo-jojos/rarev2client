import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { createPost } from '../../utils/data/postData';

const PostForm = ({ user }) => {
  const router = useRouter();
  const initialState = {
    title: '',
    image_url: '',
    content: '',
    approved: 'True',
    rare_user: user.id,
  };
  const [currentPost, setCurrentPost] = useState(initialState);

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

    createPost(post).then(() => router.push('/posts'));
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
};

export default PostForm;
