import UserForm from '../../components/UserForm';
import { useAuth } from '../../utils/context/authContext';

const NewUser = () => {
  const { user, setUser } = useAuth();
  return (
    <div>
      <h2>Register New User</h2>
      <UserForm user={user} setUser={setUser} isNew={true}/>
    </div>
  );
};

export default NewUser;
