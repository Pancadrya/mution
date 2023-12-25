import musicianLogo from "./assets/musician.svg";
import musicianPhoto from "./assets/musicianPhoto.svg";
import Card from "react-bootstrap/Card";
import axios from "axios";
import NavigationBar from "./NavigationBar";
import { useState, useEffect } from "react";

export default function Home() {
  const [musicians, setMusicians] = useState([]);

  useEffect(() => {
    axios.get("/datas").then((res) => {
      setMusicians(res.data);
    });
  }, []);

  return (
    <>
      <NavigationBar />
      <div className="container hero">
        <div className="row d-flex align-items-center justify-content-evenly">
          <div className="col-5 fw-bold text-capitalize">
            Write your favorite musicion data
            <a className="badge rounded-pill btn-red fw-bold py-2 px-3 ms-3" href="/add">
              here...
            </a>
          </div>
          <div className="col-5">
            <img src={musicianLogo} alt="" />
          </div>
        </div>
      </div>
      <div className="container my-4">
        <div className="row">
          {musicians.map((musician) => (
            <div key={musician._id} className="col-3 mb-3">
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={musicianPhoto} alt={musician.stageName} />
                <Card.Body>
                  <Card.Title>{musician.stageName}</Card.Title>
                  <Card.Text>{musician.description}</Card.Text>
                  <a href={`/detail/${musician._id}`} className="py-2 px-3 rounded btn-red">
                    Detail
                  </a>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
