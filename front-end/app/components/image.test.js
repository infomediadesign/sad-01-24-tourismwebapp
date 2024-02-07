import { render } from '@testing-library/react';
import Homepagebody from './Homepagebody'; // Import the component you want to test
import React from 'react';
import styles from './homepagebody.module.css';

describe('Homepagebody component', () => {
  it('renders with background images applied', () => {
    const { container } = render(<Homepagebody />); // Render the component

    // Get the elements with the classes that have background images applied
    const austriaElement = container.querySelector(`.${styles.Austria}`);
    const finlandElement = container.querySelector(`.${styles.Finland}`);
    const greeceElement = container.querySelector(`.${styles.Greece}`);

    // Assert that background images are applied
    expect(window.getComputedStyle(austriaElement).backgroundImage).toMatch(/Austria\.jpeg/);
    expect(window.getComputedStyle(finlandElement).backgroundImage).toMatch(/Finland\.jpeg/);
    expect(window.getComputedStyle(greeceElement).backgroundImage).toMatch(/Greece\.jpeg/);

  });
});