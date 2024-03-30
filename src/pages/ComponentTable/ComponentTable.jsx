import styles from "../ComponentTable/ComponentTable.module.scss";
import {ReactComponent as ArrowUp} from '../../assets/arrowUp.svg';
import {ReactComponent as ArrowDown} from '../../assets/arrowDown.svg';
import {useEffect, useState} from "react";
import ButtonIcon from "../../shared/ButtonIcon/ButtonIcon.jsx";


function ComponentTable({tableMap}) {

  const [tableColumnNames, setTableColumnNames] = useState([])
  const [viewArray, setViewArray] = useState([])
  const [viewOptions, setViewOptions] = useState({page: 1, field: 'name', sort: 'asc'})
  const [isFetched,setIsFetched] = useState(false)

  let lastPage = Math.ceil(tableMap?.length / 15)

  function sortByField(fieldName) {
    return (a, b) => a[fieldName] > b[fieldName] ? 1 : -1;
  }

  function sortByFieldDec(fieldName) {
    return (a, b) => b[fieldName] > a[fieldName] ? 1 : -1;
  }

  function sliceView(sorted) {
    if (viewOptions?.page >= 2) {
      let number = viewOptions?.page;
      setViewArray(sorted.slice((number - 1) * 15, ((number - 1) * 15) + 15))
    } else
      setViewArray(sorted.slice(0, 15))
  }

  useEffect(()=>{
    setIsFetched(true)
    setTableColumnNames([])
    console.log(isFetched,'isFetched')
  },[tableMap])

  useEffect(() => {
    if (isFetched === false) {
      return
    }
    if (tableMap?.length > 0 && isFetched === true) {
      for (const key of Object.keys(tableMap[0])) {
        let tmp = tableColumnNames;
        console.log(tmp)
        tmp.push(key)
        console.log(tmp)
        setTableColumnNames(tmp)
      }
    }
    setIsFetched(false)
  }, [tableMap,viewArray])

  useEffect(() => {
    let tmp = tableMap
    if (viewOptions?.sort === 'asc') {
      const sorted = tmp?.sort(sortByField(viewOptions?.field));
      sliceView(sorted)
    }
    if (viewOptions?.sort === 'dec') {
      const sorted = tmp?.sort(sortByFieldDec(viewOptions?.field));
      sliceView(sorted)
    }
  }, [viewOptions, tableMap])

  return (
    <div className={styles.box}>
    <table className={styles.componentTable}>
      <thead className={styles.componentTable__head}>
      <tr className={styles.componentTable__trTitle}>
        {tableColumnNames.map((obj, index) =>
          <th key={index*999} className={styles.componentTable__th}>{obj}
            <div className={styles.componentTable__boxArrow}>
              <button className={styles.componentTable__arrowButton} onClick={() => setViewOptions({
                page: viewOptions?.page,
                field: obj,
                sort: 'dec'
              })}><ArrowUp className={styles.componentTable__arrowUp}/></button>
              <button className={styles.componentTable__arrowButton} onClick={() => setViewOptions({
                page: viewOptions?.page,
                field: obj,
                sort: 'asc'
              })}><ArrowDown className={styles.componentTable__arrowDown}/></button>
            </div>
          </th>)
        }
      </tr>
      </thead>
      <tbody className={styles.componentTable__tbody}>
      {viewArray?.map((obj,j) =>
        <tr key={obj?.id} className={styles.componentTable__tr}>
          {tableColumnNames?.map((columnName, i) =>
            <td  key={i*1000+j} className={styles.componentTable__td}>{JSON.stringify(obj[columnName])}</td>
          )}
        </tr>)
      }
      </tbody>
      <tfoot >
      <tr className={styles.componentTable__tfoot}>
        <td>Rows per page 15</td>
        <td className={styles.componentTable__pagination}>
          <ButtonIcon value={'left'} onClick={() => setViewOptions({
            page: viewOptions?.page - 1,
            field: viewOptions?.field,
            sort: viewOptions?.sort
          })} disabled={viewOptions?.page < lastPage}/>
          <p
            className={styles.componentTable__paginationText}>{viewOptions?.page}/{lastPage}</p>
          <ButtonIcon value={'right'} onClick={() => setViewOptions({
            page: viewOptions?.page + 1,
            field: viewOptions?.field,
            sort: viewOptions?.sort
          })} disabled={viewOptions?.page >= lastPage}/>
        </td>
      </tr>
      </tfoot>
    </table>
    </div>
  )
}

export default ComponentTable