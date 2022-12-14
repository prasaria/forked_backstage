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

import React from 'react';
import { render } from '@testing-library/react';
import { CodeClimateTable } from './CodeClimateTable';
import { mockData } from '../../api/mock/mock-api';
import { ThemeProvider } from '@material-ui/core';
import { lightTheme } from '@backstage/theme';

describe('CodeClimateTable', () => {
  it('should render values in a table', async () => {
    const table = await render(
      <ThemeProvider theme={lightTheme}>
        <CodeClimateTable codeClimateData={mockData} />
      </ThemeProvider>,
    );
    expect(await table.findByText('3 months')).toBeInTheDocument();
    expect(await table.findByText('88%')).toBeInTheDocument();
    expect(await table.findByText('97')).toBeInTheDocument();
    expect(await table.findByText('49')).toBeInTheDocument();
    expect(await table.findByText('26')).toBeInTheDocument();
  });
});
