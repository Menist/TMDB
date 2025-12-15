import s from './WelcomeBlock.module.css';
import buttonStyles from '../../shared/ui/Button/Button.module.css';
import inputStyles from '../../shared/ui/Input/Input.module.css';
import {useRandomPopularMovieBackdrop} from "../../common/hooks";
import {Input} from "../../shared/ui/Input";
import {Button} from "../../shared/ui/Button";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export const WelcomeBlock = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const getImageUrl = useRandomPopularMovieBackdrop();
  const backgroundStyle = getImageUrl ? {backgroundImage: `url(${getImageUrl})`} : undefined;

  const handleButton = () => {
    navigate(`/search?query=${inputValue}`);
  };
    return (
      <div className={s.welcomeBlock} style={backgroundStyle}>
        <h1>Welcome</h1>
        <p>Browse highlighted titles from TMDB</p>
        <form className={s.form} onSubmit={(e) => e.preventDefault()}>
          <Input
            type="search"
            className={inputStyles.input}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button
            className={buttonStyles.button}
            onClick={handleButton}
            type="submit"
            disabled={inputValue.trim().length === 0}
          >
            Search
          </Button>
        </form>
      </div>
    );
  };