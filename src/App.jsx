import styles from './App.module.scss'
import ComponentTable from "./pages/ComponentTable/ComponentTable.jsx";
import {useEffect, useState} from "react";
import {fetchCharacter, fetchLocation} from "./utils/Api.jsx";
import Spinner from "./shared/Spinner/Spinner.jsx";

function App() {


  const [changeApi, setChangeApi] = useState([])
  const [optionsActive, setOptionsActive] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const options = [
    "Location",
    "Character"
  ];
  const onOptionChangeHandler = (event) => {
    setOptionsActive(event.target.value);
  };

  useEffect(() => {
    if (optionsActive === "Character") {
      setIsLoaded(true)
      fetchCharacter().then(res => {

        setChangeApi(res?.results)
      }).catch((e) => {
          console.log(e)
        }
      ).finally(() => {
        setIsLoaded(false)

      });
    }
    if (optionsActive === "Location") {
      setIsLoaded(true)
      fetchLocation().then(res => {
        setChangeApi(res?.results)
      }).catch((e) => console.log(e)).finally(() =>
        setIsLoaded(false))

    }
  }, [optionsActive]);

  return (
    <div className={styles.app}>
      <select onChange={onOptionChangeHandler} className={styles.app__option}>
        <option>Please choose one option Api</option>
        {options.map((option, index) => {
          return (
            <option key={index}>
              {option}
            </option>
          );
        })}
      </select>
      <ComponentTable tableMap={changeApi}/>
      {isLoaded && <Spinner/>}
    </div>
  )
}

export default App
