import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../src/App';

// import axios from 'axios';
// jest.mock('axios');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn()
}));

describe('Groups', () => {

  it('renders the component', () => {
    render(<App />);
    expect(screen.getByText('Groups')).toBeInTheDocument();
  });
});