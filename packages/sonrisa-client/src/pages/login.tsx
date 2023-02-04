import { useRouter } from 'next/router';
import { useState } from 'react';
import { Button } from '../components/Button/Button';
import { useAuth } from '../context/auth';
import styles from './styles/LoginPage.module.scss';

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  const { logUserIn } = useAuth();
  const router = useRouter();

  const login = async () => {
    setLoggingIn(true);
    const loginSuccess = await logUserIn({ email, password });
    setLoggingIn(false);
    if (!loginSuccess) {
      setLoginError('Unexpected error logging in. Please try again');
      return;
    }
    setLoginError('');
    router.push('/admin');
  };

  const keypressListener = (e: React.KeyboardEvent<HTMLDivElement>) => {
    setTimeout(() => {
      if (e.code !== 'Enter' || !email || !password) {
        return;
      }
      login();
    });
  };

  return (
    <div onKeyUp={keypressListener} className={styles.loginWrap}>
      <div className={styles.loginWrapInner}>
        <div className={styles.inputWrap}>
          <label htmlFor='email'>Email Address</label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.inputWrap}>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button
          text='Login'
          isDisabled={!email || !password}
          showSpinner={loggingIn}
          onClick={login}
        />
        {loginError && <div className={styles.errorWrap}>{loginError}</div>}
      </div>
    </div>
  );
};
