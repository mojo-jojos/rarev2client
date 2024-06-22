import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import {userState, userEffect} from 'react';
import { Button, Form } from 'react-bootstrap';

const initialState = {
  first_name: '',
  last_name: '',
  bio: '',
  profile_image_url: '',
  email: '',
  created_on: '',
  active: false,
  is_staff: false,
  uid: '',
};

const 
