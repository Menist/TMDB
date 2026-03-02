import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import styles from './NavigationLoader.module.css';

const HIDE_DELAY = 300;

export const NavigationLoader = () => {
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    const timeout = setTimeout(() => {
      setVisible(false);
    }, HIDE_DELAY);

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  if (!visible) {
    return null;
  }

  return (
    <div
      className={styles.loader}
      role="progressbar"
      aria-label="Загрузка страницы"
    />
  );
};