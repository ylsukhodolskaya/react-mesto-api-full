import React from 'react';
import avatar from '../images/Photo-content/Avatar.jpg';

export const CurrentUserContext = React.createContext();

export const defaultUserInfo = { 
  name: 'Юлия', 
  about: 'Fox', 
  avatar: avatar 
}