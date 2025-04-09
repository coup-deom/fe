/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SigninImport } from './routes/signin'
import { Route as OtpImport } from './routes/otp'
import { Route as IndexImport } from './routes/index'
import { Route as SigninCallbackImport } from './routes/signin/callback'

// Create/Update Routes

const SigninRoute = SigninImport.update({
  id: '/signin',
  path: '/signin',
  getParentRoute: () => rootRoute,
} as any)

const OtpRoute = OtpImport.update({
  id: '/otp',
  path: '/otp',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const SigninCallbackRoute = SigninCallbackImport.update({
  id: '/callback',
  path: '/callback',
  getParentRoute: () => SigninRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/otp': {
      id: '/otp'
      path: '/otp'
      fullPath: '/otp'
      preLoaderRoute: typeof OtpImport
      parentRoute: typeof rootRoute
    }
    '/signin': {
      id: '/signin'
      path: '/signin'
      fullPath: '/signin'
      preLoaderRoute: typeof SigninImport
      parentRoute: typeof rootRoute
    }
    '/signin/callback': {
      id: '/signin/callback'
      path: '/callback'
      fullPath: '/signin/callback'
      preLoaderRoute: typeof SigninCallbackImport
      parentRoute: typeof SigninImport
    }
  }
}

// Create and export the route tree

interface SigninRouteChildren {
  SigninCallbackRoute: typeof SigninCallbackRoute
}

const SigninRouteChildren: SigninRouteChildren = {
  SigninCallbackRoute: SigninCallbackRoute,
}

const SigninRouteWithChildren =
  SigninRoute._addFileChildren(SigninRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/otp': typeof OtpRoute
  '/signin': typeof SigninRouteWithChildren
  '/signin/callback': typeof SigninCallbackRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/otp': typeof OtpRoute
  '/signin': typeof SigninRouteWithChildren
  '/signin/callback': typeof SigninCallbackRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/otp': typeof OtpRoute
  '/signin': typeof SigninRouteWithChildren
  '/signin/callback': typeof SigninCallbackRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/otp' | '/signin' | '/signin/callback'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/otp' | '/signin' | '/signin/callback'
  id: '__root__' | '/' | '/otp' | '/signin' | '/signin/callback'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  OtpRoute: typeof OtpRoute
  SigninRoute: typeof SigninRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  OtpRoute: OtpRoute,
  SigninRoute: SigninRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/otp",
        "/signin"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/otp": {
      "filePath": "otp.tsx"
    },
    "/signin": {
      "filePath": "signin.tsx",
      "children": [
        "/signin/callback"
      ]
    },
    "/signin/callback": {
      "filePath": "signin/callback.tsx",
      "parent": "/signin"
    }
  }
}
ROUTE_MANIFEST_END */
