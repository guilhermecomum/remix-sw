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
    <div className="flex">
      <nav className="space-y-1" aria-label="Sidebar">
        {films?.map((film) => {
          const re = /\d/
          const id = film?.url?.match(re)[0]

          return (
            <NavLink
              key={film.episode_id}
              to={`${id}`}
              className={({ isActive }) =>
                isActive
                  ? 'bg-yellow-300 text-black group flex items-center px-3 py-2 text-sm font-medium rounded-md'
                  : 'text-white hover:bg-yellow-300 hover:text-black group flex items-center px-3 py-2 text-sm font-medium rounded-md'
              }
            >
              <span className="truncate">{film.title}</span>
            </NavLink>
          )
        })}
      </nav>

      <div>
        <Outlet />
      </div>
    </div>
  )
}
