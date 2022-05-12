import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Alert,
  Navbar,
  Nav,
} from "react-bootstrap";
import axios from "axios";
import "../css/styleHome.css";
const Home = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [generos, setGeneros] = useState([]);
const [elenco, setElenco] = useState([])

  const API_KEY = "314dd2fd158d1a156815bfda6f2037c3";
  const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
  const GENRE = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US&with_genres=28,80`;
  const CREDITS = `https://api.themoviedb.org/3/movie/550?api_key=${API_KEY}&append_to_response=credits`;


  const fetchPeliculas = async () => {
    await axios
      .get(API_URL)
      .then((res) => {
        console.log(res.data);
        setPeliculas(res.data.results);
      })
      .catch((err) => {
        console.error(err, "Hay un error aqui ");
      });
  };

  useEffect(() => {
    fetchPeliculas();
    genero();
    creditos()
  }, []);

  const creditos = async (id) => {
    await axios
      .get(CREDITS)
      .then((res) => {
        console.log(res.data.cast, "creditossss");
        setElenco(res.data.cast)
      }
      )
      .catch((err) => {
        console.error(err, "Hay un error aqui ");
      }
      );
  }
  const genero = async () => {
    //para obtener los generos  de las peliculas  que se van a mostrar    en la pagina
    await axios
      .get(GENRE)
      .then((res) => {
        console.log(res.data, "genero nuevo");
        setGeneros(
          res.data.genres.reduce((genres, gen) => {
            genres[gen.id] = gen.name;
            return genres;
          }, [])
        );
      })
      .catch((err) => {
        console.error(err, "Hay un error aqui ");
      });
  };

  const buscarPelicula = async (e) => {
    e.preventDefault();
    try {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=bcc4ff10c2939665232d75d8bf0ec093&query=${busqueda}`;
      const res = await fetch(url);
      const data = await res.json();
      console.log(data.results, "data");
      setPeliculas(data.results);
    } catch (e) {
      console.log(e);
    }
  };

  const changeHandler = (e) => {
    setBusqueda(e.target.value);
    console.log(e.target.value, "busqueda");
  };

  return (
    <Container className="container">
      <Navbar bg="black" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <form
                className="d-flex mt-5"
                onSubmit={buscarPelicula}
                autoComplete="off"
              >
                <input
                  type="search"
                  placeholder="Buscar Pelicula"
                  className="me-2"
                  aria-label="search"
                  name="busqueda"
                  value={busqueda}
                  onChange={changeHandler}
                />
                <Button
                  variant="outline-danger"
                  data-testid="submit-button"
                  type="submit"
                  className="search-btn"
                >
                  Buscar Pelicula
                </Button>
              </form>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div>
        {peliculas.length === 0 ? (
          <Alert key="danger" variant="danger">
            No hay pelicula
          </Alert>
        ) : (
          <div>
            {generos
              .filter((gen) => gen !== undefined)
              .map((gen) => (
                <>
                  <Col key={gen.id}>
                    <h2> Genero: {gen}</h2>
                  </Col>
                  <Row>
                    {peliculas.map((pelicula) => (
                      <>
                        <Col xs={6} md={4} key={pelicula.id}>
                          <div>
                            <Card
                              style={{ width: "18rem"}}
                            >
                              <Card.Img
                                variant="top"
                                src={`https://image.tmdb.org/t/p/w500/${pelicula.poster_path}`}
                              />
                              <Card.Body>
                                <Card.Title>{pelicula.title}</Card.Title>
                                <Card.Text>{pelicula.release_date}</Card.Text>
                                <Card.Text>
                                  <strong>
                                    Generos:
                                    {pelicula.genre_ids.map((id) => {
                                      return ` ${generos[id]} - `;
                                    })}{" "}
                                  </strong>
                                </Card.Text>
                                <Card.Text>{pelicula.overview}</Card.Text>
                               
                              </Card.Body>
                            </Card>
                          </div>
                        </Col>
                      </>
                    ))}
                  </Row>
                </>
              ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default Home;
