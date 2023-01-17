import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import MyCheckbox from './MyCheckbox';

describe('MyCheckbox Component Test', () => {
  it('MyCheckbox change the text after click', () => {
    const { queryByLabelText, getByLabelText } = render(
      <MyCheckbox
        htmlFor="check-1"
        labelOn="On"
        labelOff="Off"
      />,
    );

    expect(queryByLabelText(/off/i)).toBeTruthy();

    fireEvent.click(getByLabelText(/off/i));

    expect(queryByLabelText(/on/i)).toBeTruthy();
  });
});
