import React, { useState, useEffect } from "react";
import "./getInputs_styles.css";
import TaskPublish from "../taskPublish/taskPublish";
import extractClickUpData from "../../helpers/getTasks";
import Loader from "../loaderAnimation/loader";
import TaskReport from "../tastReport/taskReport";
import formatDate from "../../helpers/formatDate";

export const GetInputs = () => {
  const [apiKey, setApiKey] = useState(localStorage.getItem("apiKey") || "");
  const [projectId, setProjectId] = useState(
    localStorage.getItem("projectId") || ""
  );
  const [username, setUsername] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [task, setTask] = useState<any[]>([]);
  const [showComponent, setShowComponent] = useState(false);
  const [showComponent1, setShowComponent1] = useState(false);
  const [date, setDate] = useState("");
  const [firstButtonPressed, setFirstButtonPressed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("apiKey", apiKey);
  }, [apiKey]);
  useEffect(() => {
    localStorage.setItem("projectId", projectId);
  }, [projectId]);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    setFirstButtonPressed(true);
    setIsLoading(true);
    event.preventDefault();
    setDate(formatDate(+month, +day, +year));

    let expectedTasks: any[];
    let expectedUser: any;
    try {
      const [username, result] = await extractClickUpData(
        projectId,
        apiKey,
        +month,
        +day,
        +year
      );
      expectedUser = username;
      expectedTasks = result.flat();
      setTask(expectedTasks);
      setUsername(expectedUser);
      setIsLoading(false);
      setFirstButtonPressed(false);
      setShowComponent(true);
      setShowComponent1(true);

      if (expectedTasks.length === 0) {
        setTask(expectedTasks);
      }
    } catch (error) {
      console.warn(error);
    }
  };
  return (
    <form className="form" onSubmit={handleSubmit}>
      <br />
      <div className="loader"></div>
      <p id="heading">End of the Day</p>

      <div className="field">
        <input
          type="password"
          className="input-field"
          placeholder="Api Key"
          value={apiKey}
          onChange={(event) => setApiKey(event.target.value)}
          required
        />
      </div>
      <div className="field">
        <input
          type="text"
          className="input-field"
          placeholder="Sprint ID"
          value={projectId}
          onChange={(event) => setProjectId(event.target.value)}
          required
        />
      </div>
      <div className="field">
        <input
          type="text"
          className="input-field"
          placeholder="Day"
          value={day}
          onChange={(event) => setDay(event.target.value)}
          required
        />
        <input
          type="text"
          className="input-field"
          placeholder="Month"
          value={month}
          onChange={(event) => setMonth(event.target.value)}
          required
        />
        <input
          type="text"
          className="input-field"
          placeholder="Year"
          value={year}
          onChange={(event) => setYear(event.target.value)}
          required
        />
      </div>
      <div className="btn">
        <button className="button1" type="submit">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Submit&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </button>
      </div>
      <div className="hamster-center-div">
        <br />
        <div
          className={`hamster-center-component ${
            firstButtonPressed && isLoading ? "show" : "hide"
          }`}
        >
          <h3 className="hamster-center-div">
            Extracting your information&nbsp;
          </h3>
          <Loader />
        </div>
      </div>
      <div className="div-cards">
        {/*
        <button
          className="button2"
          type="button"
          onClick={() => setShowComponent(!showComponent)}
        >
          EoD Check
          </button> */}
        <br />
        {showComponent && (
          <div>
            <TaskPublish tasks={task} user={username} />
          </div>
        )}
        <br />
        {/*
        <button
          className="button3"
          type="button"
          onClick={() => setShowComponent1(!showComponent1)}
        >
          EoD Report
        </button>*/}
        <br />
        {showComponent1 && (
          <div className="center-div-report">
            <TaskReport tasks={task} date={date} user={username} />
          </div>
        )}
        <br />
      </div>
    </form>
  );
};

export default GetInputs;
