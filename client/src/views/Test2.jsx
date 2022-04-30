import React, { useState } from "react";
import axios from "axios";

// JEST only works on component level  - unit testing
// End to end testing involves multiple components like Cypress
// Enzyme and React test library to properly test components
// Shallow render a mock of a component

export default function Test() {
  let [audioRecording, setAudioRecording] = useState("");
  let [speechToTextResult, setSpeechToTextResult] = useState("");
  let [mediaRecorder, setMediaRecorder] = useState({});

  console.log("MEDIARECORDER STATE ==>", mediaRecorder);
  console.log("AUDIO STATE", audioRecording);

  //   const captureFile = (e) => {
  //     console.log("AUDIO");
  //     const file = e.target.files[0];
  //     const url = URL.createObjectURL(file);
  //     setAudioRecording(url);
  //   };

  //   const handleFormSubmit = async (e) => {
  //     e.preventDefault();
  //     console.log("E TARGET ===>", e.target);
  //     console.log("HANDLING FORM SUBMIT");
  //     const result = await axios.post("http://localhost:5005/api/test", { data: audioRecording });
  //     console.log(result.data);
  //     setSpeechToTextResult(result.data);
  //   };

  const sendAudioFile = (file) => {
    console.log(file);
    const formData = new FormData();
    formData.append("audio-file", file);
    console.log(...formData);
    axios
      .post("http://localhost:5005/api/test", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((result) => console.log("RESULT FROM BACKEND"))
      .catch((err) => console.log(err));
  };

  const handleSuccess = (stream) => {
    const stopButton = document.getElementById("stop");

    console.log("SUCCESSFULLY GOT MIC ACCESS");
    console.log("STREAM ==>", stream);

    const options = { mimeType: "audio/webm" };
    const recordedChunks = [];
    const mediaRecorder = new MediaRecorder(stream, options);

    mediaRecorder.addEventListener("dataavailable", function (e) {
      if (e.data.size > 0) recordedChunks.push(e.data);
    });

    mediaRecorder.addEventListener("stop", function () {
      console.log("MEDIA RECORDER STOPPED");
      stream.getTracks().forEach(function (track) {
        track.stop();
      });
      const recording = URL.createObjectURL(new Blob(recordedChunks, { type: "audio/wav" }));
      setAudioRecording(recording);
      //   axios
      //     .post("http://localhost:5005/api/test", {
      //       body: recording,
      //     })
      //     .then((result) => console.log("RESULT FROM BACKEND"))
      //     .catch((err) => console.log(err));
      sendAudioFile(recording);
      //   setAudioRecording(URL.createObjectURL(new Blob(recordedChunks)));
    });

    stopButton.addEventListener("click", function () {
      console.log("STOP BUTTON IN FUNCTION");
      mediaRecorder.stop();
    });

    mediaRecorder.start();

    setMediaRecorder(mediaRecorder);
  };

  const handleMicFormSubmit = (e) => {
    e.preventDefault();
    navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(handleSuccess);
  };

  return (
    <div>
      {/* <form onSubmit={(e) => handleFormSubmit(e)}>
        <h1> FILE CAPTURE VERSION </h1>
        <input type="file" onChange={(e) => captureFile(e)} accept="audio/*" capture id="recorder" />
        <button type="submit">SEND TO BACKEND</button>
      </form> */}
      <br />
      <br />
      <form onSubmit={(e) => handleMicFormSubmit(e)}>
        <h1> MICROPHONE VERSION </h1>
        <button type="submit">GET MIC ACCESS</button>
      </form>
      <button id="stop">Stop</button>
      <br />
      <br />
      <h1>PLAYER (STATE)</h1>
      <audio id="player" src={audioRecording} controls></audio>
      <h1>RESULT</h1>
      {speechToTextResult ? <p>{speechToTextResult}</p> : <p> NO SPEECH RESULT YET </p>}
    </div>
  );
}
