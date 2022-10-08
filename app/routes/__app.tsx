import { json, LoaderFunction } from '@remix-run/node'
import { NavLink, Outlet, useLoaderData } from '@remix-run/react'
import { getList, getResources } from '~/sw.server'
import { Container, Grid, Dimmer, Loader } from 'semantic-ui-react'
import { Film } from '~/types'
import Star from '~/assets/star.svg'
import Wars from '~/assets/wars.svg'

type LoaderData = { films: Film }

export const loader: LoaderFunction = async () => {
  const resources = await getResources()
  const films = await getList('films')
  return json({ films })
}

export default function AppRoute() {
  const { films } = useLoaderData<LoaderData>()

  return (
    <div className="container mx-auto h-screen flex flex-col justify-around items-center">
      <div className="flex">
        <div className="mx-auto">
          <img src={Star} className="animate-opening-star" alt="logo" />
          <br />
          <img src={Wars} className="animate-opening-wars" alt="logo" />
        </div>
      </div>
      <div className="flex flex-row flex-wrap py-4 w-full">
        <div className="flex-none text-center basis-1/2">
          <ul>
            <li className="text-3xl pb-10">Choose a Film</li>
            {films.map((episode, index) => (
              <li key={index} className="text-lg">
                <NavLink
                  to={`film/${index + 1}`}
                  className={({ isActive }) =>
                    isActive ? 'text-yellow-300' : undefined
                  }
                >
                  {episode.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="basis-1/2 flex flex-col justify-center items-center">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
