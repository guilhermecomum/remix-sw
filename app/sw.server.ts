import { json } from '@remix-run/node'

export async function getResources() {
  const res = await fetch(`https://swapi.dev/api/`)
  const json = await res.json()

  return json
}

export async function getList(resource: string) {
  const res = await fetch(`https://swapi.dev/api/${resource}`)
  const json = await res.json()

  return json.results
}

export async function getDetails(resource: string, id: string) {
  const res = await fetch(`https://swapi.dev/api/${resource}/${id}`)
  const json = await res.json()

  return json
}
