import { json, LoaderFunction } from '@remix-run/node'
import { NavLink, Outlet, useLoaderData } from '@remix-run/react'
import Star from '../images/star.svg'
import Wars from '../images/wars.svg'
import { Film, Planet } from '~/types'
import { getDetails, getList } from '~/sw.server'

type LoaderData = { film: Film; planets: Planet[] }

export const loader: LoaderFunction = async ({ params }) => {
  const { filmId } = params
  const film = await getDetails('films', filmId)
  const planets = await getList('planets')
  return json<LoaderData>({ film, planets })
}

export default function Film() {
  const { film, planets } = useLoaderData<LoaderData>()

  return (
    <div>
      <h1>{film.title}</h1>
      <dl>
        <dt>Director:</dt>
        <dd>{film.director}</dd>
        <dt>Producer</dt>
        <dd>{film.producer}</dd>
      </dl>

      <h2>Planets</h2>
      <ul>
        {film.planets.map((planet) => {
          const re = /\d/
          const planetId = planet.match(re)[0]

          return (
            <li key={planetId}>
              <NavLink
                to={`planet/${planetId}`}
                className={({ isActive }) =>
                  isActive ? 'text-yellow-300' : undefined
                }
              >
                {planet}
              </NavLink>
            </li>
          )
        })}
      </ul>

      <Outlet />
    </div>
  )
}
