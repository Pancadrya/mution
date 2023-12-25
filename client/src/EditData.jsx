import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import NavigationBar from "./NavigationBar";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";

export default function EditData() {
  const { id } = useParams();
  const [validated, setValidated] = useState(false);
  const [stageName, setStageName] = useState("");
  const [realName, setRealName] = useState("");
  const [group, setGroup] = useState("");
  const [usernameInstagram, setUsernameInstagram] = useState("");
  const [birthplace, setBirthplace] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [position, setPosition] = useState("");
  const [bestSong, setBestSong] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/datas/${id}`)
      .then((response) => {
        const data = response.data;
        setStageName(data.stageName || ""); // Provide default empty string if the value is undefined
        setRealName(data.realName || "");
        setGroup(data.group || "");
        setUsernameInstagram(data.usernameInstagram || "");
        setBirthplace(data.birthplace || "");
        setBirthDate(data.birthDate || "");
        setPosition(data.position || "");
        setBestSong(data.bestSong || "");
        setDescription(data.description || "");
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);
    await axios.put(`/datas/${id}`, {
      stageName,
      realName,
      group,
      usernameInstagram,
      birthplace,
      birthDate,
      position,
      bestSong,
      description,
    });
    navigate(`/detail/${id}`);
  };

  return (
    <>
      <NavigationBar />
      <div className="container my-4">
        <h2 className="my-5">Edit Musician Data</h2>
        <div className="row">
          <div className="col">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} md="3" controlId="stageName">
                  <Form.Label>Stage Name</Form.Label>
                  <Form.Control required type="text" placeholder="Enter the stage name" value={stageName} onChange={(ev) => setStageName(ev.target.value)} />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="realName">
                  <Form.Label>Real Name</Form.Label>
                  <Form.Control required type="text" placeholder="Enter the real name" value={realName} onChange={(ev) => setRealName(ev.target.value)} />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="group">
                  <Form.Label>Group</Form.Label>
                  <Form.Control required type="text" placeholder="Enter the group" value={group} onChange={(ev) => setGroup(ev.target.value)} />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="usernameInstagram">
                  <Form.Label>Username</Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                    <Form.Control type="text" placeholder="Username" aria-describedby="inputGroupPrepend" value={usernameInstagram} onChange={(ev) => setUsernameInstagram(ev.target.value)} required />
                    <Form.Control.Feedback type="invalid">Please choose a username.</Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="3" controlId="birthPlace">
                  <Form.Label>Birthplace</Form.Label>
                  <Form.Control type="text" placeholder="Enter the birthplace" value={birthplace} onChange={(ev) => setBirthplace(ev.target.value)} required />
                  <Form.Control.Feedback type="invalid">Please provide a valid birthplace.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="birthDate">
                  <Form.Label>Birth Date</Form.Label>
                  <Form.Control type="date" placeholder="Enter the birth date" value={birthDate} onChange={(ev) => setBirthDate(ev.target.value)} required />
                  <Form.Control.Feedback type="invalid">Please provide a valid birth date.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="position">
                  <Form.Label>Position</Form.Label>
                  <Form.Select value={position} onChange={(ev) => setPosition(ev.target.value)} required>
                    <option disabled>Choose</option>
                    <option value="Vocalist">Vocalist</option>
                    <option value="Guitarist">Guitarist</option>
                    <option value="Basist">Basist</option>
                    <option value="Pianist">Pianist</option>
                    <option value="Violinist">Violinist</option>
                    <option value="Percussionist">Percussionist</option>
                    <option value="Drummer">Drummer</option>
                    <option value="Kendanger">Kendanger</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">Please provide a valid position.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="bestSong">
                  <Form.Label>Best Song</Form.Label>
                  <Form.Control type="text" placeholder="Enter the best song" value={bestSong} onChange={(ev) => setBestSong(ev.target.value)} required />
                  <Form.Control.Feedback type="invalid">Please provide a valid zip.</Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} md="5" className="mb-3" controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" value={description} onChange={(ev) => setDescription(ev.target.value)} required />
                </Form.Group>
              </Row>
              <Button type="submit" className="py-2 px-3 rounded btn-red">
                Submit
              </Button>
              <a href="/" type="button" class="py-2 px-3 rounded btn-red ms-2">
                Back
              </a>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
