import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { deletePost } from '../utils/data/postData';

const PostCard = ({
  id,
  title,
  publicationDate,
  imageUrl,
  content,
  approved,
  rareUserId,
  onUpdate,
}) => {
  const deleteThisPost = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePost(id).then(() => onUpdate());
    }
  };

  return (
    <Card className="text-center">
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <Card.Text>By: {publicationDate}</Card.Text>
        <Card.Text>{imageUrl} </Card.Text>
        <Card.Text>content= {content} </Card.Text>
        <Card.Text className="text-muted"> {approved}</Card.Text>
        <Card.Text>{rareUserId} </Card.Text>

        <Link href={`/posts/edit/${id}`} passHref>
          <Button variant="primary" className="m-2">
            Edit Post
          </Button>
        </Link>
        <Button onClick={deleteThisPost}>
          Delete Post
        </Button>
      </Card.Body>
    </Card>
  );
};

PostCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  publicationDate: PropTypes.string.isRequired,
  imageUrl: PropTypes.number.isRequired,
  content: PropTypes.number.isRequired,
  approved: PropTypes.bool.isRequired,
  rareUserId: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PostCard;
