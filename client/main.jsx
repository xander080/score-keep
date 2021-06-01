import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import { Tracker, tracker } from "meteor/tracker";

import { Players } from "./../imports/api/player";
import TitleBar from "./../imports/ui/TitleBar";
import AddPlayer from "./../imports/ui/AddPlayer";

const renderPlayers = (playersList) => {
  return playersList.map(({ _id, name, score }) => {
    return (
      <p key={_id}>
        {name} has {score} point(s).
        <button
          onClick={() => {
            Players.update({ _id: _id }, { $inc: { score: 1 } });
          }}
        >
          +
        </button>
        <button
          onClick={() => {
            Players.update({ _id: _id }, { $inc: { score: -1 } });
          }}
        >
          -
        </button>
        <button
          onClick={() => {
            Players.remove({ _id });
          }}
        >
          X
        </button>
      </p>
    );
  });
};

const handleSubmit = (e) => {
  let playerName = e.target.playerName.value;
  e.preventDefault();

  if (playerName) {
    e.target.playerName.value = "";
    // insert
    Players.insert({
      name: playerName,
      score: 0,
    });
  }
};

Meteor.startup(() => {
  // Add Tracker
  Tracker.autorun(() => {
    let players = Players.find().fetch();

    let title = "Score Keep";

    let jsx = (
      <div>
        <TitleBar title={title} />
        {renderPlayers(players)}
        <AddPlayer handleSubmit={handleSubmit} />;
      </div>
    );
    render(jsx, document.getElementById("app"));
  });
});
