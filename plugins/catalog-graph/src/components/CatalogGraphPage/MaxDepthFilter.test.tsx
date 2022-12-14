/*
 * Copyright 2021 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { MaxDepthFilter } from './MaxDepthFilter';

describe('<MaxDepthFilter/>', () => {
  test('should display current value', () => {
    const { getByLabelText } = render(
      <MaxDepthFilter value={5} onChange={() => {}} />,
    );

    expect(getByLabelText('maxp')).toBeInTheDocument();
    expect(getByLabelText('maxp')).toHaveValue(5);
  });

  test('should display infinite if non finite', () => {
    const { getByPlaceholderText, getByLabelText } = render(
      <MaxDepthFilter value={Number.POSITIVE_INFINITY} onChange={() => {}} />,
    );

    expect(getByPlaceholderText(/Infinite/)).toBeInTheDocument();
    expect(getByLabelText('maxp')).toHaveValue(null);
  });

  test('should clear max depth', async () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(
      <MaxDepthFilter value={10} onChange={onChange} />,
    );

    await userEvent.click(getByLabelText('clear max depth'));
    expect(onChange).toHaveBeenCalledWith(Number.POSITIVE_INFINITY);
  });

  test('should set max depth to undefined if below one', async () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(
      <MaxDepthFilter value={1} onChange={onChange} />,
    );

    await userEvent.clear(getByLabelText('maxp'));
    await userEvent.type(getByLabelText('maxp'), '0');

    expect(onChange).toHaveBeenCalledWith(Number.POSITIVE_INFINITY);
  });

  test('should select direction', async () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(
      <MaxDepthFilter value={5} onChange={onChange} />,
    );

    expect(getByLabelText('maxp')).toHaveValue(5);

    await userEvent.clear(getByLabelText('maxp'));
    await userEvent.type(getByLabelText('maxp'), '10');
    waitFor(() => {
      expect(onChange).toHaveBeenCalledWith(10);
    });
  });
});
