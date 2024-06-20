import PostForm from '../../components/forms/PostForm';
import { useAuth } from '../../utils/context/authContext';

const NewEvent = () => {
  const { user } = useAuth();
  return (
    <div>
      <h2>Register New Event</h2>
      <PostForm user={user} />
    </div>
  );
};

export default NewEvent;
