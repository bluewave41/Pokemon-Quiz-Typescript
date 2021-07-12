import { useState } from 'react';
import styles from './Quiz.module.css';
import axios from 'axios';

const QuizPanel = (props: any) => {
    const [showStart, setShowStart] = useState(true);
    const [showQuestion, setShowQuestion] = useState(false);
    const [question, setQuestion] = useState(props.question);
    const [answer, setAnswer] = useState('');
    const [response, setResponse] = useState('');

    const handleChange = (e: any) => {
        setAnswer(e.target.value);
    }

    const handleKeyDown = async (e: any) => {
        if(e.keyCode == 13) {
            try {
                const response = await axios.post('api/quiz/answer', { answer: answer });
                setShowQuestion(false);
                if(response.data.correct) {
                    setResponse(`You got it right! The correct answer was ${response.data.answer}.`);
                }
                else {
                    setResponse(`Oh no! The correct answer was ${response.data.answer}.`);
                }
            }
            catch(e) {}
        }
    }

    const startQuiz = async () => {
        await getQuestion();
        setShowStart(false); //hide start menu
        setShowQuestion(true);
    }

    const getQuestion = async () => {
        setAnswer('');
        try {
            const response = await axios.post('api/quiz/getQuestion');
            setQuestion(response.data.question);
            setShowQuestion(true);
        }
        catch(e) {}
    }

    if(showStart) {
        return (
            <div>
                <h1>Quiz</h1>
                <div>
                    <h3>Click to start the quiz.</h3>
                    <button onClick={startQuiz}>Start</button>
                </div>
            </div>
        )
    }
    else if(showQuestion) {
        return (
            <div>
                <h1>Quiz</h1>
                <div>{question}</div>
                <label>Answer:</label><input type="text" onKeyDown={handleKeyDown} onChange={handleChange} />
            </div>
        )
    }
    else {
        return (
            <div>
                <h1>Quiz</h1>
                <div>{response}</div>
                <button onClick={getQuestion}>Continue</button>
            </div>
        )
    }
}

export default QuizPanel;