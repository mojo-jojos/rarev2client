import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import UserForm from '../../../components/users/UserForm';

export default function EditGame() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(null); // Initialize as null

  useEffect(() => {
    if (id) {
      getGameById(id).then((data) => {
        setUser(data);
      });
    }
  }, [id]);

  if (!user) {
    return <div>Loading...</div>; // Handle loading state
  }

  return <UserForm initialGame={user} />;
}
