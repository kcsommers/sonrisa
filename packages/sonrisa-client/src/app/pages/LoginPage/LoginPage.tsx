import { useState } from 'react';
import { useHistory } from 'react-router';
import { Button } from '../../components';
import { useAuth } from '../../context';
import styles from './LoginPage.module.scss';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  const { logUserIn } = useAuth();
  const history = useHistory();

  const login = async () => {
    setLoggingIn(true);
    const loginSuccess = await logUserIn({ email, password });
    setLoggingIn(false);
    if (!loginSuccess) {
      setLoginError('Unexpected error logging in. Please try again');
      return;
    }
    setLoginError('');
    history.push('/admin');
  };

  return (
    <div className={styles.loginWrap}>
      <div className={styles.loginWrapInner}>
        <div className={styles.inputWrap}>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.inputWrap}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button
          text="Login"
          isDisabled={!email || !password}
          showSpinner={loggingIn}
          onClick={login}
        />
        {loginError && <div className={styles.errorWrap}>{loginError}</div>}
      </div>
    </div>
  );
};
