import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [people, setPeople] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  useEffect(() => {
    axios.get("http://localhost:8080/fetch").then((response) => {
      console.info(response);
      setPeople(response.data.people);
    });
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    console.info(name);
    console.info(age);

    const response = await axios.post("http://localhost:8080/add", {
      name: name,
      age: age
    });
    console.info(response);
  }

  return (
    <div className="App">
      {people.map((e) => (
        <h1 key={people.indexOf(e)}>
          {e.name} <br />
        </h1>
      ))}
      <form>
        <input
          type="text"
          name="name"
          id="name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          name="age"
          id="age"
          onChange={(e) => setAge(e.target.value)}
        />
        <button type="submit" onClick={handleSubmit}>
          Add Data
        </button>
      </form>
    </div>
  );
}

export default App;
