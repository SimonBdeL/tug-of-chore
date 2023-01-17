// import { useState, useEffect } from 'react';

const Chore = ({ chore, completeChore, deleteChore, setPoints, points }) => {
  // console.log(chore._id)
  return (
    <div className={"chore " + (chore.complete ? "is-complete" : "")}>
      <div
        className="checkbox"
        onClick={() => {
          completeChore(chore);
          console.log("id from Chores.js: ", chore._id);
          if (chore.complete === false) {
            setPoints(points + 5);
          } else {
            setPoints(points - 5);
          }
        }}
      ></div>

      <div className="text">{chore.text}</div>
      <div style={{ paddingLeft: "20px" }}>(5 points)</div>
      <div
        className="delete-chore"
        onClick={() => {
          deleteChore(chore);
          console.log("id from Chore.js: deleteChore: ", chore._id);
        }}
      >
        x
      </div>
    </div>
  );
};

export default Chore;
