import React, { useState, useRef } from 'react';
import { Transcriber } from './Transcriber';

const AudioRecorder: React.FC = () => {
    const [recording, setRecording] = useState<boolean>(false);
    const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
    const [transcription, setTranscription] = useState<string>('');

    const mediaRecorder = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    const transcriberRef = useRef(new Transcriber({ apiKey: '' }));

    const handleStartRecording = () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
                setMediaStream(stream);

                const newMediaRecorder = new MediaRecorder(stream);
                newMediaRecorder.ondataavailable = event => {
                    chunksRef.current.push(event.data);
                };

                newMediaRecorder.onstop = async () => {
                    // Combine chunks to make a Blob
                    const audioBlob = new Blob(chunksRef.current);

                    // Clear chunks for next recording session
                    chunksRef.current = [];

                    // Transcribe the audio
                    try {
                        // from local storage
                        const apiKey = localStorage.getItem('apiKey') || '';
                        console.log("API Key:", apiKey);
                        transcriberRef.current.setApiKey(apiKey);
                        const text = await transcriberRef.current.transcribeAudio(audioBlob);
                        setTranscription(text);
                    } catch (error) {
                        console.error("Error during transcription:", error);
                    }
                };

                mediaRecorder.current = newMediaRecorder;
                newMediaRecorder.start();
                setRecording(true);
            }).catch(error => {
                console.error("Error accessing microphone:", error);
            });
        }
    };

    const handleStopRecording = () => {
        if (mediaRecorder.current && mediaStream) {
            mediaRecorder.current.stop();
            mediaStream.getTracks().forEach(track => track.stop());
            setMediaStream(null);
            setRecording(false);  // To reset the recording state to false
        }
    };

    return (
        <div>
        <textarea value={transcription} readOnly style={{ width: '90%', height: '100px' }} />
        <br />
        <button onClick={recording ? handleStopRecording : handleStartRecording}>
          {recording ? 'Stop Recording' : 'Start Recording'}
        </button>
      </div>
    );
}

export default AudioRecorder;
