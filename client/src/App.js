import { useState, useEffect } from 'react';
import Chore from "./Chore.js";

const API_BASE = "http://localhost:3001";

const App = () => {
  const [chores, setChores] = useState([]);
  // const [popupActive, setPopupActive] = useState(false);
  const [newChore, setNewChore] = useState("");
  const [points, setPoints] = useState(0);


  const GetChores = () => {
    fetch(API_BASE + "/tug-of-chore")
      .then(res => res.json())
      .then(data => setChores(data))
      .catch(err => console.error("Error: ", err));

  };

  useEffect(() => {
    GetChores();
    // console.log(chores)
  }, []);

  const completeChore = async (id) => {
    const data = await fetch(API_BASE + "/tug-of-chore/complete/" + id)
      .then(res => res.json());
    setChores(chores => chores.map(chore => {
      if (chore._id === data._id) {
        chore.complete = data.complete;
      }
      return chore;
    }))
  };

  const deleteChore = async (id) => {
    const data = await fetch(API_BASE + "/tug-of-chore/delete/" + id, {
      method: "DELETE"
  }).then(res => res.json());

  setChores(chores => chores.filter(chore => chore._id !== data._id));
  }

  const addChore = async () => {
    const data = await fetch(API_BASE + "/tug-of-chore/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: newChore,
        assigned_to: "Hanna"
      })
    }).then(res => res.json());

    setChores([...chores, data]);
  }
  return (
    <div className="App">
      <h1>Welcome to Tug Of Chore!</h1>
      <h4>Finish a chore to win points!</h4>
      <div className="chores">
        {
          chores.map((chore) =>
            <Chore chore={ chore } completeChore= { completeChore } deleteChore={ deleteChore }setPoints={ setPoints } points={ points } key={ chore.id}/>
          )
        }
          {/* <div className="chore">
            <div className="checkbox"></div>

            <div className="text">Kiss Zhronka</div>

            <div className="delete-chore">x</div>
        </div> */}
      </div>
      <div className="points">
        <h4>Your points: { points }</h4>
      </div>
      <div className="addAChore">
        <h4>Add a chore:</h4>
        <input
          type="text"
          className="add-chore-input"
          onChange={e => setNewChore(e.target.value)} />
        <div className="button" onClick={addChore}>+</div>
      </div>
      <div className="board">
        <h4>Board of fame:</h4>
        <div>Hanna</div>
        <div>Simon</div>
      </div>
    </div>
  );
}

export default App;
