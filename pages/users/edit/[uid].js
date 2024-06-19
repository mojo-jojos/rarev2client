import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import UserForm from '../../../components/users/UserForm';
import { getUserByUid } from '../../../utils/data/userData';

export default function EditGame() {
  const router = useRouter();
  const { uid } = router.query;
  const [user, setUser] = useState(null); // Initialize as null

  useEffect(() => {
    if (uid) {
      getUserByUid(uid).then((data) => {
        setUser(data);
      });
    }
  }, [uid]);

  return <UserForm initialGame={user} />;
}
