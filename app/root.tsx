import type { MetaFunction } from '@remix-run/node'
import styles from './styles/app.css'
import {
  Links,
  LiveReload,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useMatches,
} from '@remix-run/react'

import Star from './images/star.svg'
import Wars from './images/wars.svg'

export function links() {
  return [{ rel: 'stylesheet', href: styles }]
}

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1',
})

export default function App() {
  const matches = useMatches()
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-black text-white">
        <div className="container mx-auto">
          <NavLink to="/">
            <div>
              <img src={Star} className="star" alt="logo" />
              <br />
              <img src={Wars} className="wars" alt="logo" />
            </div>
          </NavLink>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </div>
      </body>
    </html>
  )
}
