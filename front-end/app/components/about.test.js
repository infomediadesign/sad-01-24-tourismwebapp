import React from 'react';
import { render } from '@testing-library/react';
import Footer from './Footer';

describe('Footer component', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Footer />);
    
    // Test for the presence of certain text/content
    expect(getByText('Contact Us')).toBeInTheDocument();
    expect(getByText('Menu')).toBeInTheDocument();
    expect(getByText('News letter')).toBeInTheDocument();
    expect(getByText('Language')).toBeInTheDocument();
  });

  // Add more specific tests as needed for your component
});