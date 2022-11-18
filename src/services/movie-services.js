// export default class MovieService {
//   constructor() {
//     this.res
//   }
//   async getResource(url) {
//     const res = await fetch(url)

//     if (!res.ok) {
//       throw new Error(`Could not fetch ${url}, received ${res.status}`)
//     }

//     return await res.json()
//   }
// }
async function MovieService(url) {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, received ${res.status}`)
  }
  const json = await res.json()

  return json
}
export default MovieService
