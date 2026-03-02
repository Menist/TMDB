import {useNavigate} from "react-router-dom";
import {Button} from "@/shared/ui/Button";
import s from './PageNotFound.module.css'

export const PageNotFound = () => {
  const navigate = useNavigate()

  const handleBtn = () => {
    navigate('/')
  }

  return (
    <div className={s.notFoundPage}>
      <h1 className={s.title}>404</h1>
      <p className={s.message}>Страница не найдена</p>
      <Button onClick={handleBtn}>На главную</Button>
    </div>
  )
}
