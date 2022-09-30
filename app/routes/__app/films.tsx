import { json, LoaderFunction } from '@remix-run/node'
import { NavLink, Outlet, useLoaderData } from '@remix-run/react'
import { getList } from '~/sw.server'
import { Film } from '~/types'

type LoaderData = { films: Film[] }

export const loader: LoaderFunction = async () => {
  const films = await getList('films')
  return json({ films })
}

export default function FilmsIndex() {
  const { films } = useLoaderData<LoaderData>()
  return (
    <div>
      <nav>
        <ul>
          {films?.map((film) => {
            const re = /\d/
            const id = film?.url?.match(re)[0]

            return (
              <li key={film.episode_id}>
                <NavLink
                  to={`${id}`}
                  className={({ isActive }) =>
                    isActive ? 'text-yellow-300' : undefined
                  }
                >
                  {film.title}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>

      <div>
        <Outlet />
      </div>
    </div>
  )
}
