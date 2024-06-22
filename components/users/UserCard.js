import Card from 'react-bootstrap/Card';
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import Link from 'next/link';
import { deleteUser } from '../../utils/data/userData';

function UserCard({ user, onUpdate }) {
  const deleteThisUser = () => {
    if (window.confirm(`Delete this user?`)) {
      deleteUser(user.id).then(() => onUpdate());
    }
  };
  return (
    <Card className="text-center">
      {/* <Card.Img variant="top" src={userObj.profileImageUrl} alt={userObj.firstName} style={{ minHeight: '250px' }} /> */}
      <Card.Body>

        <Card.Title>Name: {user?.first_name} {user?.last_name} </Card.Title>

        <ListGroup>
          <ListGroupItem>
            <p> Bio: {user?.bio}</p>

          </ListGroupItem>
        </ListGroup>

        <div>
          <Link href={`/users/edit/${user?.id}`} passHref>
            <Button variant="light">edit user</Button>
          </Link>
          <Button variant="secondary" onClick={deleteThisUser} className="m-2 btn-block">
              DELETE
            </Button>
          {/* <Link href={`/users/${userObj.id}`} passHref>
            <Button variant="light" className="m-2">view</Button>
          </Link> */}
        </div>

      </Card.Body>
    </Card>
  );
}

export default UserCard;
