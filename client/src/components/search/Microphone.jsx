import React, { useState } from "react";
import { speechToTextService } from "../../services/speechToText";
import { MicrophoneIcon, StopIcon } from "@heroicons/react/solid";
import { IconButton, Spinner, Box } from "@chakra-ui/react";

export default function Microphone(props) {
  let [micButtonDisplay, setMicButtonDisplay] = useState(true);
  let [stopButtonDisplay, setStopButtonDisplay] = useState(false);
  let [spinnerDisplay, setSpinnerDisplay] = useState(false);

  const recordMicrophone = async (e) => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
    recordUserAudio(stream);
    setMicButtonDisplay("none");
    setStopButtonDisplay("block");
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
      const recording = new Blob(recordedChunks, { type: "audio/webm" });
      sendAudioFileToBackend(recording);
    });

    stopButton.addEventListener("click", () => {
      mediaRecorder.stop();
      setStopButtonDisplay("none");
      setSpinnerDisplay("block");
    });

    mediaRecorder.start();
  };

  const sendAudioFileToBackend = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const result = await speechToTextService.createNewSearch(formData);
    setSpinnerDisplay("none");
    setMicButtonDisplay("block");

    const sanitizedResult = result.data.replaceAll('"', "");
    props.searchHandler(sanitizedResult);
    props.updateSpeechDone();
  };

  return (
    <Box>
      <form onSubmit={props.handleSubmit}>
        {stopButtonDisplay && (
          <IconButton
            p={2}
            icon={<StopIcon />}
            type="submit"
            id="stop"
          ></IconButton>
        )}
        {spinnerDisplay && <Spinner display={spinnerDisplay} />}
        {micButtonDisplay && (
          <IconButton
            p={2}
            icon={<MicrophoneIcon />}
            display={micButtonDisplay}
            onClick={(e) => recordMicrophone(e)}
          ></IconButton>
        )}
      </form>
    </Box>
  );
}
