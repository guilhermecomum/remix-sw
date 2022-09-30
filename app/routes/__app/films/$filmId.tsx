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
      <div>
        <h3 className="text-lg font-medium leading-6 text-white">
          {film.title}
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-white">
          Episode {film.episode_id}
        </p>
      </div>
      <div className="mt-5 border-t border-gray-200">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt className="text-sm font-medium text-white">Director</dt>
            <dd className="mt-1 text-sm text-white sm:col-span-2 sm:mt-0">
              {film.director}
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt className="text-sm font-medium text-white">Producer</dt>
            <dd className="mt-1 text-sm text-white sm:col-span-2 sm:mt-0">
              {film.producer}
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt className="text-sm font-medium text-white">Release date</dt>
            <dd className="mt-1 text-sm text-white sm:col-span-2 sm:mt-0">
              {film.release_date}
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt className="text-sm font-medium text-white">Opening</dt>
            <dd className="mt-1 text-sm text-white sm:col-span-2 sm:mt-0">
              {film.opening_crawl}
            </dd>
          </div>
        </dl>
      </div>

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
