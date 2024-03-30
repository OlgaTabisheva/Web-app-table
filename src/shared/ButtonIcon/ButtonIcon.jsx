import style from './ButtonIcon.module.scss'
import {ReactComponent as Right} from '../../assets/iconRight.svg';
import {ReactComponent as Left} from '../../assets/iconLeft.svg';

function ButtonIcon({value, onClick, disabled}) {
  return (
    <button className={style.buttonIcon} onClick={onClick} disabled={disabled}>
      {value === 'right' && <Right className={style.buttonIcon__right}/>}
      {value === 'left' && <Left className={style.buttonIcon__left}/>}

    </button>
  )
}

export default ButtonIcon
