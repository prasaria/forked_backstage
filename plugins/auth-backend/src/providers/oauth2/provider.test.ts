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

import { OAuth2AuthProvider } from './provider';
import * as helpers from '../../lib/passport/PassportStrategyHelper';
import { OAuthResult } from '../../lib/oauth';
import { AuthResolverContext } from '../types';

jest.mock('../../lib/passport/PassportStrategyHelper', () => {
  return {
    executeFrameHandlerStrategy: jest.fn(),
    executeRefreshTokenStrategy: jest.fn(),
    executeFetchUserProfileStrategy: jest.fn(),
  };
});

const mockFrameHandler = jest.spyOn(
  helpers,
  'executeFrameHandlerStrategy',
) as unknown as jest.MockedFunction<
  () => Promise<{ result: OAuthResult; privateInfo: any }>
>;

describe('createOAuth2Provider', () => {
  it('should auth', async () => {
    const provider = new OAuth2AuthProvider({
      resolverContext: {} as AuthResolverContext,
      authHandler: async ({ fullProfile }) => ({
        profile: {
          email: fullProfile.emails![0]!.value,
          displayName: fullProfile.displayName,
          picture: 'http://backstage.io/lols',
        },
      }),
      clientId: 'mock',
      clientSecret: 'mock',
      callbackUrl: 'mock',
      authorizationUrl: 'mock',
      tokenUrl: 'mock',
    });

    mockFrameHandler.mockResolvedValueOnce({
      result: {
        fullProfile: {
          emails: [{ value: 'conrad@example.com' }],
          displayName: 'Conrad',
          id: 'conrad',
          provider: 'oAuth2',
        },
        params: {
          id_token: 'idToken',
          scope: 'scope',
          expires_in: 123,
        },
        accessToken: 'accessToken',
      },
      privateInfo: {
        refreshToken: 'wacka',
      },
    });
    const { response } = await provider.handler({} as any);
    expect(response).toEqual({
      providerInfo: {
        accessToken: 'accessToken',
        expiresInSeconds: 123,
        idToken: 'idToken',
        scope: 'scope',
      },
      profile: {
        email: 'conrad@example.com',
        displayName: 'Conrad',
        picture: 'http://backstage.io/lols',
      },
    });
  });
});
