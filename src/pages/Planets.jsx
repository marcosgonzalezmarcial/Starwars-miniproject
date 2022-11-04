import { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useNavigate } from 'react-router-dom'
import planetsMappedData from '../utils/mocked-data/planetsMappedData.js'
import './grid-styles.css'
import { getTransformedPlanetsArray } from '../services/getTransformedPlanetsArray'

const Planets = () => {
  const [page, setPage] = useState(1)
  const [planets, setPlanets] = useState([])

  let navigate = useNavigate()

  useEffect(() => {
    getTransformedPlanetsArray(page).then((data) => {
      setPlanets((prev) => [...prev, ...data])
    })
  }, [page])

  const handleClick = (e) => {
    const planetSelected = e.target.textContent
    const [planet] = planetsMappedData.filter(
      (item) => item.name === planetSelected
    )
    navigate(`${planet.name.replaceAll(' ', '~')}`)
  }

  return (
    <InfiniteScroll
      dataLength={planets.length}
      next={() => setPage((prev) => planets.length < 59 && prev + 1)}
      hasMore={planets.length < 59 && true}
      loader={<div className="text-white display-4">Loading...</div>}
      className="my-3 my-md-4 grid-container"
    >
      {planets.map((planet) => (
        <div key={planet.name} className="grid-element-card">
          <div className="grid-card-hero">
            <img
              className="grid-card-hero-img"
              src={planet.imgUrl}
              alt={planet.name}
            />
          </div>
          <div className="text-secondary bg-dark p-3 grid-card-info">
            <h4 onClick={handleClick}>{planet.name}</h4>
            <p>{planet.climate}</p>
          </div>
        </div>
      ))}
    </InfiniteScroll>
  )
}

export default Planets
