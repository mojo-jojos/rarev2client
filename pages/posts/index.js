import { useRouter } from 'next/router';
import React from 'react';
import { Button } from 'react-bootstrap';

export default function Post() {
  const router = useRouter();
  return (
    <div>
      <Button
        onClick={() => {
          router.push('/posts/new');
        }}
      >
        create New
      </Button>
    </div>
  );
}
