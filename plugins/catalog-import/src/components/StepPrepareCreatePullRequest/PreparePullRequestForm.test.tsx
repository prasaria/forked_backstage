/*
 * Copyright 2020 The Backstage Authors
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

import { FormHelperText, TextField } from '@material-ui/core';
import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { asInputRef } from '../helpers';
import { PreparePullRequestForm } from './PreparePullRequestForm';

describe('<PreparePullRequestForm />', () => {
  it('renders without exploding', async () => {
    const onSubmitFn = jest.fn();

    const { getByRole } = render(
      <PreparePullRequestForm<{ main: string }>
        defaultValues={{ main: 'default' }}
        render={({ register }) => (
          <>
            <TextField {...asInputRef(register('main'))} />
            <button type="submit">Submit</button>{' '}
          </>
        )}
        onSubmit={onSubmitFn}
      />,
    );

    await act(async () => {
      await userEvent.click(getByRole('button', { name: /submit/i }));
    });

    expect(onSubmitFn).toHaveBeenCalledTimes(1);
    expect(onSubmitFn.mock.calls[0][0]).toMatchObject({ main: 'default' });
  });

  it('should register a text field', async () => {
    const onSubmitFn = jest.fn();

    const { getByRole, getByLabelText } = render(
      <PreparePullRequestForm<{ main: string }>
        defaultValues={{ main: 'default' }}
        render={({ register }) => (
          <>
            <TextField
              {...asInputRef(register('main'))}
              id="main"
              label="Main Field"
            />
            <button type="submit">Submit</button>
          </>
        )}
        onSubmit={onSubmitFn}
      />,
    );

    await act(async () => {
      await userEvent.clear(getByLabelText('Main Field'));
      await userEvent.type(getByLabelText('Main Field'), 'My Text');
      await userEvent.click(getByRole('button', { name: /submit/i }));
    });

    expect(onSubmitFn).toHaveBeenCalledTimes(1);
    expect(onSubmitFn.mock.calls[0][0]).toMatchObject({ main: 'My Text' });
  });

  it('registers required attribute', async () => {
    const onSubmitFn = jest.fn();

    const { queryByText, getByRole } = render(
      <PreparePullRequestForm<{ main: string }>
        defaultValues={{}}
        render={({ formState, register }) => (
          <>
            <TextField
              {...asInputRef(register('main', { required: true }))}
              name="main"
              required
            />
            {formState.errors.main && (
              <FormHelperText error>
                Error in required main field
              </FormHelperText>
            )}
            <button type="submit">Submit</button>{' '}
          </>
        )}
        onSubmit={onSubmitFn}
      />,
    );

    expect(queryByText('Error in required main field')).not.toBeInTheDocument();

    await act(async () => {
      await userEvent.click(getByRole('button', { name: /submit/i }));
    });

    expect(onSubmitFn).not.toHaveBeenCalled();
    expect(queryByText('Error in required main field')).toBeInTheDocument();
  });
});
