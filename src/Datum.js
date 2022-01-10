import { useState, useEffect } from "react";
import "./Datum.css";
import DatumElem from "./DatumElem";

const Datum = () => {
  const [month, setMonth] = useState();
  const [days, setDays] = useState([]);
  const [currDay, setCurrDay] = useState(new Date(2022,0,1));
  const [chosenDays, setChosenDays] = useState([]);
  const [hoverDay, setHoverDay] = useState();

  const [occDates, setOccDates] = useState([new Date(2022,0,2), new Date(2022,0,3), new Date(2022,0,5)])

  useEffect(() => {
    const currMonth = () => {
      setDays([]);
      for (let i = 1; i < 32; i++) {
        if (new Date(currDay.getFullYear(), currDay.getMonth(), i).getMonth() === month) {
          setDays(old => [...old, new Date(currDay.getFullYear(), currDay.getMonth(), i)]);
        }
      }
    }
    setMonth(currDay.getMonth());
    currMonth();
  }, [currDay, month])

  useEffect(() => {
    console.log(chosenDays);
  }, [chosenDays])

  const onChange = (e) => {
    setCurrDay(new Date(2022, e.target.value, 1));
    setMonth(Number(e.target.value));
  }

  const handleHoverDay = (e) => {
    setHoverDay(e);
  }

  return (
    <>
      <input
        name="currMonth"
        type="number"
        min={0}
        max={11}
        onChange={onChange}
      />
      <div className="button-holder">
        {days.map((day, index) => (
          <DatumElem
            day={day}
            key={index}
            occupied={occDates.some(occ => day.valueOf() === occ.valueOf())}
            clicked={setChosenDays}
            chosen={chosenDays}
            hoverDay={handleHoverDay}
            hovered={hoverDay}
            occDates={occDates}
          />
        ))}
      </div>
    </>
  )
}

export default Datum;