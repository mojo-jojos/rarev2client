import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import { registerUser, updateUser } from '../utils/auth';
import { UserFormData } from './UserFormData';

function UserForm({ user, setUser, isNew, isLoggedInUser }) {
  // Create a const for the user so we don't change authContext's user state.
  const userObj = {...user}

  // Get userObj prepped for a new user.
  if (isNew) {
    userObj = {}
    // If the logged in user doesn't have a user in the database
    // we're creating a new user for them that needs their fb uid
    // otherwise, django still requires uid, so create a unique uid.
    userObj.uid = isLoggedInUser ? user?.uid : crypto.randomUUID()
}
  

  // UserFormData class is replacing initialState
  const [formData, setFormData] = useState(new UserFormData(userObj));
  const router = useRouter();
  useEffect(() => {
    // if (isNew) userObj = {}
    setFormData(new UserFormData(userObj))
  }, [user, isNew])

  const handleSubmit = async (e) => {
    e.preventDefault();
    // If the userObj has an id, it already exists in the database.
    if (userObj.id) {
      await updateUser(formData)
      router.push('/users')
    }
    // otherwise, create a new one
    else{
      const newUser = await registerUser(formData)
      if (isLoggedInUser){
        // Set the authContext user to everything it already had, plus the data
        // that comes back form the create endpoint e.g. first_name, last_name
        const newUserData = { ...user, ...newUser };
        setUser(newUserData)
        router.push('/');
      }
      else{
        router.push('/users')
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        {/* <Form.Label><h1>Rare User Register Form</h1></Form.Label> */}
        <Form.Control as="textarea" name="first_name" id="first_name" required placeholder='Enter your First Name' onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} value={formData?.first_name}/>
        <Form.Control as="textarea" name="last_name" id="last_name" required placeholder='Enter your Last Name' onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} value={formData?.last_name} />
        <Form.Control as="textarea" name="bio" id="bio" required placeholder='Enter your bio' onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} value={formData?.bio}/>

      </Form.Group>
      <Button variant="secondary" type="submit" className="btn btn-small">{userObj?.id ? 'Update' : 'Register'} User</Button>
    </Form>
  );
}

UserForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
  }).isRequired,
  setUser: PropTypes.func,
};



export default UserForm;
