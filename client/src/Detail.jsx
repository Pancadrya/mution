import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import musicianLogo from "./assets/musician.svg";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import NavigationBar from "./NavigationBar";
import MusicianPhoto from "./assets/musicianPhoto.svg";

export default function Detail() {
  const { id } = useParams();
  const [musician, setMusician] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/datas/${id}`)
      .then((response) => {
        setMusician(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleEdit = () => {
    navigate(`/edit/${id}`); // Pass musician data as state
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this musician data?");

    if (confirmDelete) {
      try {
        await axios.delete(`/datas/${id}`);
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <NavigationBar />
      <div className="ctr">
        <div id="result">
          <div className="container">
            <h2>Detail Musician</h2>
            <div className="row my-4">
              <div className="col-6">
                <img src={MusicianPhoto} className="poster" />
              </div>
              <div className="col-6">
                <a className="d-flex text-dark text-decoration-none">
                  <i className="bi bi-instagram fs-5 me-2"></i>
                  {musician.usernameInstagram}
                </a>
                <a className="d-flex text-dark text-decoration-none">
                  <i className="bi bi-stars fs-5 me-2"></i>
                  {musician.position}
                </a>
                <a className="d-flex text-dark text-decoration-none">
                  <i className="bi bi-people fs-5 me-2"></i>
                  {musician.group}
                </a>
                <a className="d-flex text-dark text-decoration-none">
                  <i className="bi bi-music-note-beamed fs-5 me-2"></i>
                  {musician.bestSong}
                </a>
                <a className="d-flex text-dark text-decoration-none">
                  <i className="bi bi-map fs-5 me-2"></i>
                  {musician.birthplace}
                </a>
                <a className="d-flex text-dark text-decoration-none">
                  <i className="bi bi-calendar fs-5 me-2"></i>
                  {musician.birthDate}
                </a>
              </div>
            </div>
            <div className="row">
              <div className="row">
                <div className="col-6">
                  <h5>Stage Name</h5>
                  <p>{musician.stageName}</p>
                </div>
                <div className="col-6">
                  <h5>Real Name</h5>
                  <p>{musician.realName}</p>
                </div>
              </div>
              <h5>Description</h5>
              <p>{musician.description}</p>
            </div>
            <a href="/" type="button" class="py-2 px-3 rounded btn-red me-2">
              Kembali
            </a>
            <a onClick={handleEdit} type="button" class="py-2 px-3 rounded btn-red me-2">
              Edit
            </a>
            <a onClick={handleDelete} type="button" class="py-2 px-3 rounded btn-danger">
              Delete
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
