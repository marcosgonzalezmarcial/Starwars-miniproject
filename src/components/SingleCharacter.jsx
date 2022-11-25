import { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import ListOfFilms from './ListOfFilms'
import ListOfShips from './ListOfShips'
import { urlStringify } from '../utils/urlStringify'
import { Spinner } from './Spinner/Spinner'
import { transformDataArray } from '../utils/transformDataArray'
import { peopleMockedData } from '../utils/mocked-data'
import { fetchItem } from '../services/fetchItem'
import { TYPE_OF_DATA } from '../constants'

const SingleCharacter = () => {
	const [character, setCharacter] = useState({})
	const [isLoading, setIsLoading] = useState(false)

	let { characterName } = useParams()

	useEffect(() => {
		setIsLoading(true)
		const newPerson = urlStringify(characterName)
		const { id } = peopleMockedData.find(person => person.name === newPerson)

		fetchItem({ id, typeOfData: TYPE_OF_DATA.PEOPLE })
			.then(item => {
				const [transformedCharacterData] = transformDataArray({
					// fetched data must be an array for implementation requirements
					fetchedData: [item],
					typeOfData: TYPE_OF_DATA.PEOPLE,
				})
				setCharacter(transformedCharacterData)
			})
			.catch(console.log)
			.finally(() => setIsLoading(false))
	}, [characterName])

	return (
		<>
			{isLoading ? (
				<Spinner />
			) : (
				<div className="main text-secondary my-3">
					<div className="page-img-container">
						<img src={character.image} alt={character.name} />
					</div>
					<div className="page-description-container bg-dark p-2">
						<h2 className="mb-2 pt-1 px-2">{character.name}</h2>
						<div className="px-2">
							<Row className="py-1">
								<Col>
									<h3>Height:</h3>
									<span>{character.height}</span>
								</Col>
								<Col>
									<h3>Birth Year</h3>
									<span>{character.birth_year}</span>
								</Col>
							</Row>
							<Row className="py-1">
								{/* <Col>
                  <h3>Gender:</h3>
                  <span>{character.gender}</span>
                </Col> */}
								{/* <Col>
                  <h3>Mass</h3>
                  <span>{character.mass}</span>
                </Col> */}
							</Row>
							<Row className="py-1">
								<Col>
									<h3>Skin Color</h3>
									<span>{character.skin_color}</span>
								</Col>
								<Col>
									<h3>Eye Color</h3>
									<span>{character.eye_color}</span>
								</Col>
							</Row>
							<Row className="py-1">
								<Col className="pt-1">
									<h3 className="m-0 py-1">Appearances</h3>
									<ListOfFilms filmsUrls={character.films} />
								</Col>
								<Col className="pt-1">
									<h3 className="m-0 py-1">Ships</h3>
									{character.starships?.length > 0 ? (
										<ListOfShips shipsUrls={character.starships} />
									) : (
										<span>There aren't ships for this character</span>
									)}
								</Col>
							</Row>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default SingleCharacter
