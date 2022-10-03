import { json, LoaderFunction } from '@remix-run/node'
import { NavLink, Outlet, useLoaderData } from '@remix-run/react'
import { getDetails } from '~/sw.server'
import { Planet } from '~/types'

type LoaderData = { planet: Planet }

export const loader: LoaderFunction = async ({ params }) => {
  const { planetId } = params
  const planet = await getDetails('planets', planetId)

  return json<LoaderData>({ planet })
}

export default function FilmsIndex() {
  const { planet } = useLoaderData<LoaderData>()

  return (
    <div>
      <h1>{planet.name}</h1>
      <dl>
        <dt>Terrain:</dt>
        <dd>{planet.terrain}</dd>
        <dt>Producer</dt>
        <dd>{planet.climate}</dd>
      </dl>
    </div>
  )
}
