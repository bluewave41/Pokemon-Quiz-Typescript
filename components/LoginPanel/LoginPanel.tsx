import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from './LoginPanel.module.css';

const LoginPanel = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const onChange = ({ target } : { target: HTMLInputElement }) => {
        if(target.name == 'username') {
            setUsername(target.value);
        }
        else {
            setPassword(target.value);
        }
    }

    const onSubmit = async () => {
        try {
            await axios.post('api/auth/login', { username: username, password: password });
            router.push('/');
        }
        catch(e) {
            setError(e.response.data.error);
        }
    }

    return (
        <div className={styles.loginPanel}>
            <h1>Login</h1>
            <div>{error}</div>
            <input type="text" placeholder="Username" name="username" onChange={onChange}></input>
            <input type="password" placeholder="Password" name="password" onChange={onChange}></input>
            <button onClick={onSubmit}>Submit</button>
        </div>
    )
}

export default LoginPanel;