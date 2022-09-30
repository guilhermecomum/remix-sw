import { json, LoaderFunction } from '@remix-run/node'
import { NavLink, Outlet, useLoaderData } from '@remix-run/react'
import { getResources } from '~/sw.server'
import { ResourceSchema } from '~/types/ResourceSchema'
import Star from '~/images/star.svg'
import Wars from '~/images/wars.svg'

type LoaderData = { resources: ResourceSchema }

export const loader: LoaderFunction = async () => {
  const resources = await getResources()
  return json({ resources })
}

export default function AppRoute() {
  const { resources } = useLoaderData<LoaderData>()

  return (
    <div className="container mx-auto">
      <div className="flex">
        <div className="flex flex-shrink-0 items-center px-4">
          <NavLink to="/">
            <img src={Star} className="star" alt="logo" />
            <br />
            <img src={Wars} className="wars" alt="logo" />
          </NavLink>
        </div>

        <div>
          <nav className="-mb-px flex" aria-label="Tabs">
            {Object.keys(resources).map((resource, index) => {
              return (
                <NavLink
                  key={index}
                  to={`${resource}`}
                  className={({ isActive }) =>
                    isActive
                      ? 'border-yellow-300 text-yellow-300 w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm'
                      : 'border-transparent text-white hover:text-yellow-300 hover:border-yellow-300 w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm'
                  }
                >
                  {resource}
                </NavLink>
              )
            })}
          </nav>
        </div>
      </div>
      <div className="flex flex-1 flex-col md:pl-64">
        <Outlet />
      </div>
    </div>
  )
}
