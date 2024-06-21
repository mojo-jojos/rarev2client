import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import UserForm from '../../../components/UserForm';
import { getUserByUid } from '../../../utils/data/userData';

export default function UserEdit() {
  const [user, setUser] = useState();
  const { id } = useRouter().query;

  useEffect(() => {
    const fetchData = async () => {
      const userByUid = await getUserByUid(id);
      setUser(userByUid);
    };
    fetchData();
  }, []);
  return (
    <div>
      <h2>Update User</h2>
      <UserForm user={user} setUser={setUser} isNew={false}/>
    </div>
  );
}
