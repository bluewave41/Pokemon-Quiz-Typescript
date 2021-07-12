import { useState } from 'react';
import styles from './Quiz.module.css';
import axios from 'axios';

const QuizPanel = () => {
    const [isStarted, setIsStarted] = useState(false);
    const [question, setQuestion] = useState('');

    const startQuiz = async () => {
        await getQuestion();
        setIsStarted(true);
    }

    const getQuestion = async () => {
        try {
            const response = await axios.post('api/quiz/getQuestion');
            setQuestion(response.data.question);
        }
        catch(e) {

        }
    }

    return (
        <div>
            <h1>Quiz</h1>
            {!isStarted && 
                <div>
                    <h3>Click to start the quiz.</h3>
                    <button onClick={startQuiz}>Start</button>
                </div>
            }
            {isStarted && 
                <div>
                    <div>{question}</div>
                    <label>Answer:</label><input type="text" />
                </div>
            }
        </div>
    )
}

export default QuizPanel;