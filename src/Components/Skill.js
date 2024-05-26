// import React, { useState, useEffect, useRef } from 'react';
// import WaveForm from './WaveForm'; // Import the WaveForm component
// import './styles.css'; // Import the styles for the WaveForm component


// const Skill = () => {
//     const [transcript, setTranscript] = useState('');
//     const recognitionRef = useRef(null);
//     const isRecognitionActiveRef = useRef(false);
//     const lastPhraseRef = useRef('');
//     const [analyzerData, setAnalyzerData] = useState(null); // State for analyzer data

//     useEffect(() => {
//         if (!('webkitSpeechRecognition' in window)) {
//             alert('Web Speech API is not supported in this browser. Try using Chrome.');
//         } else {
//             recognitionRef.current = new window.webkitSpeechRecognition();
//             recognitionRef.current.lang = 'en-US';
//             recognitionRef.current.continuous = true;
//             recognitionRef.current.interimResults = true;

//             recognitionRef.current.onstart = function() {
//                 isRecognitionActiveRef.current = true;
//                 audioAnalyzer(); // Start audio analysis when recognition starts
//             };

//             recognitionRef.current.onresult = function(event) {
//                 // Speech recognition logic...
//             };

//             recognitionRef.current.onend = function() {
//                 isRecognitionActiveRef.current = false;
//             };
//         }

//         return () => {
//             if (recognitionRef.current) {
//                 recognitionRef.current.stop();
//             }
//         };
//     }, []);

//     const audioAnalyzer = () => {
//         const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
//         const analyzer = audioCtx.createAnalyser();
//         analyzer.fftSize = 2048;

//         const bufferLength = analyzer.frequencyBinCount;
//         const dataArray = new Uint8Array(bufferLength);
//         const source = audioCtx.createMediaStreamSource(recognitionRef.current.stream);
//         source.connect(analyzer);

//         setAnalyzerData({ analyzer, bufferLength, dataArray });
//     };

//     const startRecognition = () => {
//         if (!isRecognitionActiveRef.current && recognitionRef.current) {
//             recognitionRef.current.start();
//         }
//     };

//     const stopRecognition = () => {
//         if (recognitionRef.current) {
//             recognitionRef.current.stop();
//         }
//     };

//     const handleStopRecognition = () => {
//         stopRecognition();
//     };

//     return (
//         <div>
//             <h1>Skill Management System</h1>
//             {analyzerData && <WaveForm analyzerData={analyzerData} />} {/* Render the WaveForm component */}
//             <button onClick={startRecognition}>Start Recognition</button>
//             <button onClick={handleStopRecognition}>Stop Recognition</button>
//             <p id="result">{transcript}</p>
//         </div>
//     );
// };

// export default Skill;
