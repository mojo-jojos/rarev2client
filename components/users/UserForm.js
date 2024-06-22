import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { updateUser } from '../../utils/data/userData';

const initialState = {
  first_name: '',
  last_name: '',
  bio: '',
  profile_image_url: '',
  email: '',
  created_on: '',
  active: false,
  is_staff: false,
  uid: '',
};

const UserForm = ({ initialUser }) => {
  const [currentUser, setCurrentUser] = useState(initialUser || initialState);
  const router = useRouter();

  useEffect(() => {
    if (initialUser) {
      setCurrentUser(initialUser);
    }
  }, [initialUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCurrentUser((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(currentUser);
      router.push('/users');
    } catch (error) {
      console.error('Failed to update user', error);
      // TODO:  dont log error, reveals server information
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="first_name">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          name="first_name"
          value={currentUser.first_name}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="last_name">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          name="last_name"
          value={currentUser.last_name}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="bio">
        <Form.Label>Bio</Form.Label>
        <Form.Control
          type="text"
          name="bio"
          value={currentUser.bio}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="profile_image_url">
        <Form.Label>Profile Image URL</Form.Label>
        <Form.Control
          type="text"
          name="profile_image_url"
          value={currentUser.profile_image_url}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={currentUser.email}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="created_on">
        <Form.Label>Created On</Form.Label>
        <Form.Control
          type="date"
          name="created_on"
          value={currentUser.created_on}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="active">
        <Form.Check
          type="checkbox"
          name="active"
          label="Active"
          checked={currentUser.active}
          onChange={handleCheckboxChange}
        />
      </Form.Group>

      <Form.Group controlId="is_staff">
        <Form.Check
          type="checkbox"
          name="is_staff"
          label="Is Staff"
          checked={currentUser.is_staff}
          onChange={handleCheckboxChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

UserForm.propTypes = {
  initialUser: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    bio: PropTypes.string,
    profile_image_url: PropTypes.string,
    email: PropTypes.string,
    created_on: PropTypes.string,
    active: PropTypes.bool,
    is_staff: PropTypes.bool,
    uid: PropTypes.string,
  }),
};

UserForm.defaultProps = {
  initialUser: initialState,
};

export default UserForm;
