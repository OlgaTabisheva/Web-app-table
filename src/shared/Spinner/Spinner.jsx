import style from './Spinner.module.scss'


function Spinner() {
  return (
    <div className={style.loader__box}>
    <div className={style.loader}/>
    </div>
  )
}

export default Spinner
