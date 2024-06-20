import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { createEvent } from '../../utils/data/eventData';
import { getGames } from '../../utils/data/gameData';

const initialState = {
  game: '',
  description: '',
  date: '',
  time: '',
  organizer: 0,
};

const EventForm = () => {
  const [games, setGames] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    getGames().then(setGames);
  }, []);

  const handleChange = (e) => {
    // Complete the onChange function
    const { name, value } = e.target;
    setCurrentEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();

    const event = {
      game: currentEvent.game,
      description: currentEvent.description,
      date: currentEvent.date,
      time: currentEvent.time,
      organizer: Number(currentEvent.organizer),
    };

    // Send POST request to your API
    createEvent(event).then(console.log(event)).then(() => router.push('/events'));
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FloatingLabel controlId="floatingSelect" label="Game">
          <Form.Select
            aria-label="Game"
            name="game"
            onChange={handleChange}
            className="mb-3"
            value={currentEvent.game}
            required
          >
            <option value="">Select a Game</option>
            {
              games.map((game) => (
                <option
                  key={game.id}
                  value={game.id}
                >
                  {game.title}
                </option>
              ))
            }
          </Form.Select>
        </FloatingLabel>
        {/* TODO: create the rest of the input fields */}
        <FloatingLabel controlId="floatingTextarea" label="Description" className="mb-3">
          <Form.Control
            as="textarea"
            placeholder="Description"
            name="description"
            value={currentEvent.description}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingTextarea" label="Date" className="mb-3">
          <Form.Control
            as="textarea"
            placeholder="Date"
            name="date"
            value={currentEvent.date}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingTextarea" label="Time" className="mb-3">
          <Form.Control
            as="textarea"
            placeholder="Time"
            name="time"
            value={currentEvent.time}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingTextarea" label="Organizer Id" className="mb-3">
          <Form.Control
            as="textarea"
            placeholder="Organizer Id"
            name="organizer"
            value={currentEvent.organizer}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

EventForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
};

export default EventForm;