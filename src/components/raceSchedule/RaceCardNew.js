import React from "react";
import { useState } from "react";
import dayjs from "dayjs";
import Modal from "../Modal/Modal";
import Loader from "../ui/Loader";

const RaceCardNew = ({ race, raceResults, isLoading }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewResultsClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const handleCardClick = () => {
    if (!hasRacePassed) {
      flipCard();
    }
  };

  const formatDate = (dateString) => {
    const date = dayjs(dateString);
    //const date = dayjs.utc(dateString).tz('Atlantic/Cape_Verde')
    return date.format("DD MMM");
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    const time = dayjs().set("hour", hours).set("minute", minutes);
    const cv = time.subtract(1, "hour");
    return cv.format("HH:mm");
  };

  const raceWeekend = (startDateString, endDateString) => {
    const start = dayjs(startDateString);
    const end = dayjs(endDateString);
    const startDay = start.format("DD");
    const endDay = end.format("DD MMM");

    if (start.isSame(end, "month")) {
      return `${startDay} - ${endDay}`;
    } else {
      return `${startDay} ${start.format("MMM")} - ${endDay}`;
    }
  };

  const hasRacePassed = new Date(race.date) < new Date(); // Check if the race date has passed

  //------------------------------------------------------//
  const sessions = [];

  if (race.FirstPractice) {
    sessions.push({
      name: "First Practice",
      date: race.FirstPractice.date,
      time: race.FirstPractice.time,
    });
  }
  if (race.SecondPractice) {
    sessions.push({
      name: "Second Practice",
      date: race.SecondPractice.date,
      time: race.SecondPractice.time,
    });
  }
  if (race.ThirdPractice) {
    sessions.push({
      name: "Third Practice",
      date: race.ThirdPractice.date,
      time: race.ThirdPractice.time,
    });
  }
  if (race.Qualifying) {
    sessions.push({
      name: "Qualifying",
      date: race.Qualifying.date,
      time: race.Qualifying.time,
    });
  }
  if (race.Sprint) {
    sessions.push({
      name: "Sprint",
      date: race.Sprint.date,
      time: race.Sprint.time,
    });
  }
  if (race) {
    sessions.push({
      name: "Race",
      date: race.date,
      time: race.time,
    });
  }

  sessions.sort((a, b) => {
    const first = a.date + a.time;
    const second = b.date + b.time;

    return first.localeCompare(second);
  });
  //------------------------------------------------------//

  return isLoading ? (
    <Loader />
  ) : (
    <div>
      <div
        className="race-card-new"
        style={
          hasRacePassed ? { border: "1px solid #ccc", borderRadius: "8px" } : {}
        }
      >
        <div className="race-card-front">
          <span className="race-round">Round {race.round}</span>
          <h5>{race.raceName}</h5>
          <h6 className="circuit-name">{race.Circuit.circuitName}</h6>
          <p className="race-weekend">
            {raceWeekend(race.FirstPractice.date, race.date)}
          </p>

          {hasRacePassed && (
            <button
              className="race-results-btn"
              onClick={handleViewResultsClick}
            >
              View Results
            </button>
          )}
        </div>
        <div className="race-card-back">
          {sessions.map((session) => (
            <p key={session.name}>
              {session.name} ({formatDate(session.date)}) :{" "}
              {formatTime(session.time)}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
export default RaceCardNew;
