import react, { useState, useEffect } from "react";
import Chore from "./Chore.js";
import LoginPage from "./LoginPage";
const API_BASE = "http://localhost:3001";
const TokenContext = react.createContext(null);

const App = () => {
  const [chores, setChores] = useState([]);
  const [newChore, setNewChore] = useState("");
  const [points, setPoints] = useState(0);
  const [enter, setEnter] = useState(false);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3Mzg5NjUyMn0.VuIMkSXxbkr5kBw9Zzs1yC0wAGEjjPs1KhruEgKAJ4U";
  const GetChores = () => {
    fetch(API_BASE + "/tugofchore/chores", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setChores(data))
      .catch((err) => console.error("Error: ", err));
  };

  useEffect(() => {
    GetChores();
    // console.log(chores)
  }, []);

  const completeChore = async (chore) => {
    // console.log("id from completeChore: ", id);
    const data = await fetch(API_BASE + "/tugofchore/chores/" + chore._id, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: chore.text,
        complete: !chore.complete,
      }),
    }).then((res) => res.json());

    setChores((chores) =>
      chores.map((chore) => {
        if (chore._id === data._id) {
          chore.complete = data.complete;
        }
        return chore;
      })
    );
  };

  const deleteChore = async (chore) => {
    console.log("id from deleteChore: ", chore._id);
    const data = await fetch(API_BASE + "/tugofchore/chores/" + chore._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    // console.log("data: ", data);
    // const updatedChores = [...chores];
    // console.log("updated chores: ", updatedChores);
    // const filteredUpdatedChores = updatedChores.filter(
    //   (item) => item._id !== chore._id
    // );
    // console.log("filteredUpdatedChores: ", filteredUpdatedChores);
    setChores((chores) => chores.filter((item) => item._id !== chore._id));
  };

  const addChore = async () => {
    const data = await fetch(API_BASE + "/tugofchore/chores", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: newChore,
      }),
    }).then((res) => res.json());

    setChores([...chores, data]);
    setNewChore("");
  };

  if (enter) {
    return (
      <div className="App">
        <h1>Welcome to Tug Of Chore!</h1>
        <h4>Finish a chore to win points!</h4>
        <div className="chores">
          {chores.map((chore) => (
            <Chore
              chore={chore}
              completeChore={completeChore}
              deleteChore={deleteChore}
              setPoints={setPoints}
              points={points}
              key={chore._id}
            />
          ))}
          {/* <div className="chore">
            <div className="checkbox"></div>

            <div className="text">Kiss Zhronka</div>

            <div className="delete-chore">x</div>
        </div> */}
        </div>
        <div className="points">
          <h4>Your points: {points}</h4>
        </div>
        <div className="addAChore">
          <h4>Add a chore:</h4>
          <input
            type="text"
            className="add-chore-input"
            onChange={(e) => setNewChore(e.target.value)}
            value={newChore}
          />
          <div
            className="button"
            onClick={() => {
              addChore();
              setNewChore("");
            }}
          >
            Add
          </div>
        </div>
        <div className="board">
          <h4>Hall of fame:</h4>
          <div>{`Simon ${points} points`}</div>
          <div>{`Hanna 5 points`}</div>
        </div>
      </div>
    );
  } else {
    return <LoginPage setEnter={setEnter} enter={enter} />;
  }
};

export default App;
