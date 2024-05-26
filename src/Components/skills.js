// Skills.js

import React, { useState, useEffect, useRef } from 'react';
import * as speechSdk from 'microsoft-cognitiveservices-speech-sdk';
import '../Styles/skills.css';

const Skills = () => {
  const [transcript, setTranscript] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [time, setTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const recognizerRef = useRef(null);

  const subscriptionKey = 'c2b4fdb104924fa7a8249f39486ae997'; // Replace with your actual subscription key
  const serviceRegion = 'eastus'; // Replace with your actual service region

  useEffect(() => {
    const speechConfig = speechSdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
    const audioConfig = speechSdk.AudioConfig.fromDefaultMicrophoneInput();
    recognizerRef.current = new speechSdk.SpeechRecognizer(speechConfig, audioConfig);

    recognizerRef.current.recognizing = (s, e) => {
      console.log(`RECOGNIZING: Text=${e.result.text}`);
    };

    recognizerRef.current.recognized = (s, e) => {
      if (e.result.reason === speechSdk.ResultReason.RecognizedSpeech) {
        console.log(`RECOGNIZED: Text=${e.result.text}`);
        setTranscript(prev => prev + e.result.text + ' ');
      } else if (e.result.reason === speechSdk.ResultReason.NoMatch) {
        console.log('NOMATCH: Speech could not be recognized.');
      }
    };

    recognizerRef.current.canceled = (s, e) => {
      console.log(`CANCELED: Reason=${e.reason}`);
      recognizerRef.current.stopContinuousRecognitionAsync();
    };

    recognizerRef.current.sessionStopped = (s, e) => {
      console.log('Session stopped.');
      recognizerRef.current.stopContinuousRecognitionAsync();
    };

    return () => {
      if (recognizerRef.current) {
        recognizerRef.current.close();
      }
    };
  }, [subscriptionKey, serviceRegion]);

  const startRecognition = () => {
    if (recognizerRef.current && !isRecording) {
      setTranscript(''); // Clear transcript on start
      setIsRecording(true);
      setTime(0); // Reset time to 0
      const id = setInterval(() => setTime(prevTime => prevTime + 1), 1000);
      setIntervalId(id);
      recognizerRef.current.startContinuousRecognitionAsync(() => {
        console.log('Recognition started.');
      }, (err) => {
        console.error('Error starting recognition:', err);
      });
    }
  };

  const stopRecognition = () => {
    if (recognizerRef.current && isRecording) {
      setIsRecording(false);
      clearInterval(intervalId);
      recognizerRef.current.stopContinuousRecognitionAsync(() => {
        console.log('Recognition stopped.');
      }, (err) => {
        console.error('Error stopping recognition:', err);
      });
    }
  };

  useEffect(() => {
    return () => clearInterval(intervalId);
  }, [intervalId]);

  return (
    <div className={`app ${isRecording ? 'recording' : ''}`}>
      <div className="timer">
        <span role="img" aria-label="clock">⏱️</span> {`Time: ${time}s`}
      </div>
      
      <div className="buttons">
        <button onClick={isRecording ? stopRecognition : startRecognition} className="talk-button">
          <span role="img" aria-label="microphone">{isRecording ? '🛑' : '🎙️'}</span> {isRecording ? 'Stop' : 'Talk'}
        </button>
      </div>
      
      <div className="input-container">
        <textarea className="input-box" readOnly placeholder="Recognized words will appear here..." value={transcript} />
      </div>
    
    </div>
  );
};

export default Skills;
