class MovieService {
  constructor() {
    this.getMovies = async (url) => {
      const res = await fetch(url)
      if (!res.ok) {
        throw new Error(`Could not fetch ${url}, received ${res.status}`)
      }
      const json = await res.json()
      return json
    }
    this.rateMovie = async (url, option) => {
      const response = await fetch(url, option)
      const result = await response.json()
      return result
    }
    this.urlApi = 'https://api.themoviedb.org/3/'
    this.urlSearch = 'search/movie?'
    this.urlKey = 'api_key=26d8f194568f965201933df62099f0a0'
    this.urlBody = '&language=en-US&page=1&include_adult=false&query='
    this.urlGuest = 'authentication/guest_session/new?'
    this.url1 = '&language=en-US'
  }

  async getRequestToken() {
    const resp = await this.getMovies(`https://api.themoviedb.org/3/authentication/token/new?${this.urlKey}`)
    return resp
  }

  async getGuestSession() {
    const res = await this.getMovies(`https://api.themoviedb.org/3/authentication/guest_session/new?${this.urlKey}`)
    return res
  }

  getSearchMovie(searchResult, page) {
    return this.getMovies(`${this.urlApi}${this.urlSearch}${this.urlKey}${this.urlBody}${searchResult}&page=${page}`)
  }

  async onRateMovie(id, key, rated) {
    const l = await this.rateMovie(`${this.urlApi}movie/${id}/rating?${this.urlKey}&guest_session_id=${key}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        value: rated,
      }),
    })
    return l
  }

  async getGuestRated(key) {
    const rated = await this.getMovies(`${this.urlApi}guest_session/${key}/rated/movies?${this.urlKey}${this.url1}`)
    return rated
  }

  async getAllGenres() {
    const res = await this.getMovies(`${this.urlApi}genre/movie/list?${this.urlKey}&language=en-US`)
    return res.genres
  }
}
export default MovieService
