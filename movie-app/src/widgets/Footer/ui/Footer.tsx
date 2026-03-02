import s from './Footer.module.css'
export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={s.wrapFooter}>
      <p>© {currentYear} TMDB Clone. All rights reserved.</p>
    </footer>
  );
};