## API Report File for "@backstage/plugin-explore"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts
/// <reference types="react" />

import { BackstagePlugin } from '@backstage/core-plugin-api';
import { default as default_2 } from 'react';
import { DomainEntity } from '@backstage/catalog-model';
import { ExternalRouteRef } from '@backstage/core-plugin-api';
import { RouteRef } from '@backstage/core-plugin-api';
import { TabProps } from '@material-ui/core';

// @public @deprecated (undocumented)
export const catalogEntityRouteRef: ExternalRouteRef<
  {
    name: string;
    kind: string;
    namespace: string;
  },
  true
>;

// @public (undocumented)
export const DomainCard: (props: { entity: DomainEntity }) => JSX.Element;

// @public (undocumented)
export const DomainExplorerContent: (props: {
  title?: string | undefined;
}) => JSX.Element;

// @public
export const ExploreLayout: {
  (props: ExploreLayoutProps): JSX.Element;
  Route: (props: SubRoute) => null;
};

// @public (undocumented)
export type ExploreLayoutProps = {
  title?: string;
  subtitle?: string;
  children?: default_2.ReactNode;
};

// @public (undocumented)
export const ExplorePage: () => JSX.Element;

// @public (undocumented)
const explorePlugin: BackstagePlugin<
  {
    explore: RouteRef<undefined>;
  },
  {
    catalogEntity: ExternalRouteRef<
      {
        name: string;
        kind: string;
        namespace: string;
      },
      true
    >;
  },
  {}
>;
export { explorePlugin };
export { explorePlugin as plugin };

// @public (undocumented)
export const exploreRouteRef: RouteRef<undefined>;

// @public (undocumented)
export const GroupsExplorerContent: (props: {
  title?: string | undefined;
}) => JSX.Element;

// @public (undocumented)
export type SubRoute = {
  path: string;
  title: string;
  children: JSX.Element;
  tabProps?: TabProps<
    default_2.ElementType,
    {
      component?: default_2.ElementType;
    }
  >;
};

// @public (undocumented)
export const ToolExplorerContent: (props: {
  title?: string | undefined;
}) => JSX.Element;
```
