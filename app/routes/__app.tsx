import { json, LoaderFunction } from '@remix-run/node'
import { NavLink, Outlet, useLoaderData } from '@remix-run/react'
import { getResources } from '~/sw.server'
import { ResourceSchema } from '~/types/ResourceSchema'

type LoaderData = { resources: ResourceSchema }

export const loader: LoaderFunction = async () => {
  const resources = await getResources()
  return json({ resources })
}

export default function AppRoute() {
  const { resources } = useLoaderData<LoaderData>()

  return (
    <div id="resources">
      <div>
        <nav>
          <ul>
            {Object.keys(resources).map((resource, index) => {
              return (
                <li key={index}>
                  <NavLink
                    to={`${resource}`}
                    className={({ isActive }) =>
                      isActive ? 'text-yellow-300' : undefined
                    }
                  >
                    {resource}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}
