import { render, screen } from '@testing-library/react';
import App from './App';

// test(description, callback function)
test('renders learn react link', () => {
  // render - programatically renders the component as DOM tree
  render(<App />);

  // screen - replica of the screen that we see
  // getByText - find the element that contains the text
  // /learn react/i - text to be matched/case insensitive
  const linkElement = screen.getByText(/learn react/i);

  // Actual test
  // expect - built in function that tests what's in the parameter
  // linkElement - element to be tested
  // toBeInTheDocument() - test/assert 
  expect(linkElement).toBeInTheDocument();
});
