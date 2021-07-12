import { useState } from 'react';
import axios from 'axios';
import styles from 'components/RegisterPanel/RegisterPanel.module.css';

const RegisterPanel = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState<string[]>([]);

    const onChange = ({ target } : { target: HTMLInputElement }) => {
        if(target.name == 'username') {
            setUsername(target.value);
        }
        else if(target.name == 'password') {
            setPassword(target.value);
        }
        else {
            setConfirmPassword(target.value);
        }
    }

    const onSubmit = async () => {
        let errors: string[] = [];
        if(!username) {
            errors.push("You didn't enter a username.");
        }
        if(!password) {
            errors.push("You didn't enter a password.");
        }
        if(!confirmPassword) {
            errors.push("You only entered your password once.");
        }
        if(username.length > 20) {
            errors.push("Usernames can be a maximum of 20 characters.");
        }
        if(password != confirmPassword) {
            errors.push("Your passwords don't match.");
        }
        if(errors.length) {
            setErrors(errors);
            return;
        }
        const response = await axios.post('api/auth/register', { username: username, password: password });
        if(response.status == 200) {
            console.log('good');
        }
        else {
            console.log('bad');
        }
    }

    return (
        <div className={styles.registerPanel}>
            <h1>Register</h1>
            {errors.map(el => (
                <div key={el}>{el}</div>
            ))}
            <input type="text" placeholder="Username" name="username" onChange={onChange}></input>
            <input type="password" placeholder="Password" name="password" onChange={onChange}></input>
            <input type="password" placeholder="Confirm Password" name="confirmPassword" onChange={onChange}></input>
            <button onClick={onSubmit}>Submit</button>
        </div>
    )
}

export default RegisterPanel;