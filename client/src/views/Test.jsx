import React, { useState } from "react";
import axios from "axios";

export default function Test() {
  let [audioRecording, setAudioRecording] = useState("");
  let [speechToTextResult, setSpeechToTextResult] = useState("");
  let [mediaRecorder, setMediaRecorder] = useState({});

  const handleMicFormSubmit = (e) => {
    e.preventDefault();
    navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(handleSuccess);
  };

  const handleSuccess = (stream) => {
    const stopButton = document.getElementById("stop");
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
      const recording = new Blob(recordedChunks, { type: "audio/webm" })
    //   const recording = URL.createObjectURL(new Blob(recordedChunks, { type: "audio/webm" }));
      console.log(recording.size)
    //   setAudioRecording(recording);
      sendAudioFile(recording);
    });

    stopButton.addEventListener("click", function () {
      console.log("STOP BUTTON IN FUNCTION");
      mediaRecorder.stop();
    });

    mediaRecorder.start();

    setMediaRecorder(mediaRecorder);
  };

  const sendAudioFile = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post("http://localhost:5005/api/test", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((result) => setSpeechToTextResult(result.data))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form onSubmit={(e) => handleMicFormSubmit(e)}>
        <h1> MICROPHONE VERSION </h1>
        <button type="submit">GET MIC ACCESS</button>
      </form>
      <button id="stop">Stop</button>
      <br />
      <br />
      <h1>PLAYER (STATE)</h1>
      {/* <audio id="player" src={audioRecording} controls></audio> */}
      <h1>RESULT</h1>
      {speechToTextResult ? <p>{speechToTextResult}</p> : <p> NO SPEECH RESULT YET </p>}
    </div>
  );
}
