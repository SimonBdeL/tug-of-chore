// import { useState, useEffect } from 'react';

const Chore = ( { chore, completeChore, deleteChore, setPoints, points } ) => {
  // console.log(chore._id)
  return (
          <div
            className={"chore " + (chore.complete ? "is-complete" : "")}
            key={ chore._id }
            onClick={() => {
                completeChore(chore._id);
                console.log("id from Chores.js: ", chore._id);
                setPoints(points+5);
              }
            }>
            <div className="checkbox"></div>

            <div className="text">{ chore.text}</div>

            <div className="delete-chore" onClick={() => {
                deleteChore(chore._id);
                console.log("id from Chore.js: deleteChore: ", chore._id);
              }}>x</div>
        </div>
  );
}

export default Chore;
