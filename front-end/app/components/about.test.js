import React from 'react';

import Footer from './Footer';
import { render, getAllByText } from '@testing-library/react';

describe('Footer component', () => {
  it('renders correctly', () => {
    const { getAllByText } = render(<Footer />);
    
    // Test for the presence of certain text/content
    const contactUsElements = getAllByText('Contact Us');
    expect(contactUsElements.length).toBeGreaterThan(0);

    const menu = getAllByText('Menu');
    expect(menu.length).toBeGreaterThan(0);




  });

  // Add more specific tests as needed for your component
});