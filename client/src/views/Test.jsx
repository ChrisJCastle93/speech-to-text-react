import React, { useState } from "react";
import { speechToTextService } from "../services/speechToText";

export default function Test() {
  let [speechToTextResult, setSpeechToTextResult] = useState("");

  const recordMicrophone = async (e) => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    recordUserAudio(stream)
  };

  const recordUserAudio = (stream) => {
    const stopButton = document.getElementById("stop");
    const options = { mimeType: "audio/webm" };
    const recordedChunks = [];
    const mediaRecorder = new MediaRecorder(stream, options);

    mediaRecorder.addEventListener("dataavailable", (e) => {
      if (e.data.size > 0) recordedChunks.push(e.data);
    });

    mediaRecorder.addEventListener("stop", () => {
      stream.getTracks().forEach(function (track) {
        track.stop();
      });
      const recording = new Blob(recordedChunks, { type: "audio/webm" })
      sendAudioFileToBackend(recording);
    });

    stopButton.addEventListener("click", () => {
      mediaRecorder.stop();
    });

    mediaRecorder.start();
  };

  const sendAudioFileToBackend = async (file) => {

    const formData = new FormData();
    formData.append("file", file);

    const result = await speechToTextService.createNewSearch(formData)

    setSpeechToTextResult(result.data)

  };

  return (
    <div>
      <button onClick={(e) => recordMicrophone(e)}>GET MIC ACCESS</button>
      <button id="stop">Stop</button>
      {speechToTextResult ? <p>{speechToTextResult}</p> : <p> NO SPEECH RESULT YET </p>}
    </div>
  );
}
