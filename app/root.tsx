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
import { Progress } from './ui/progress'

export function links() {
  return [{ rel: 'stylesheet', href: styles }]
}

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Remix Star Wars',
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
        <Progress />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
