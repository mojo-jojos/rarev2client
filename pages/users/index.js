import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getUser } from '../../utils/data/userData';
import UserCard from '../../components/users/UserCard';

function Home() {
  const [users, setUsers] = useState([]);
  const router = useRouter();
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    getUser().then((data) => {
      setUsers(data);
    });
  }, [update]);

  const onUpdate = () => {
    setUpdate((preVal) => preVal + 1);
  };

  return (
    <article className="text-center">
      <h1>Users</h1>
      {users?.map((user) => (
        <section key={`user--${user.id}`} className="text-center">
          <UserCard
            user={user}
            onUpdate={onUpdate}
          />
        </section>
      ))}
      <Button
        onClick={() => {
          router.push('/users/new');
        }}
      > Add New User
      </Button>
    </article>
  );
}

export default Home;
