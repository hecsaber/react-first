import { useState, useEffect } from "react";
import "./Datum.css";

const DatumElem = (props) => {
  const [isActive, setActive] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const [isClicked, setClicked] = useState(false);
  const [isMiddle, setMiddle] = useState(false);

  const handleClick = () => {
    props.clicked(old => {
      if (old.length === 0) {
        return [props.day];
      } else if (old.some(val => val.getDate() === props.day.getDate()) || old.length >= 2) {
        return [];
      } else if (isActive) {
        return [...old, props.day]
      } else {
        return [...old];
      }
    })
    isActive && setClicked(!isClicked);
  };

  const handleToggle = () => {
    if (!isActive) {
      props.hoverDay(props.day);
    } else {
      props.hoverDay(null);
    }
    if (!(props.chosen.length === 1
        && props.occDates.some(date => (date.getDate() > props.day.getDate() && date.getDate() < props.chosen[0].getDate())
        || (date.getDate() < props.day.getDate() && date.getDate() > props.chosen[0].getDate())
        ))) {
          setActive(!isActive);
        }
  };

  const hoverHandler = () => {
    let something;
    if (props.hovered.valueOf() > props.chosen[0].valueOf()) {
      something = [props.chosen[0], props.hovered];
    } else {
      something = [props.hovered, props.chosen[0]];
    }
    return something;
  }

  useEffect(() => {
    const handleRange = () => {
      if (props.chosen.length === 1 && props.hovered) {
        const something = hoverHandler();
        if (props.day.getDate() > something[0].getDate() &&
            props.day.getDate() < something[1].getDate() &&
            !props.occDates.some(date => (date.getDate() > something[0].getDate() && date.getDate() < something[1].getDate()))) {
          setMiddle(true);
        }
      } else if (props.chosen.length !== 2) {
        setMiddle(false);
      }
    }
    handleRange();
  }, [props.hovered, isClicked])

   useEffect(() => {
    const handleDisable = () => {
      if (props.occupied) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    }

    handleDisable();
  }, [props.day, props.occupied])

  useEffect(() => {
    if (props.chosen.length === 0) {
      setClicked(false);
    }
  }, [props.chosen])

  return (
    <button
      onMouseOver={handleToggle}
      onMouseLeave={handleToggle}
      className={(isActive && !isDisabled) || isClicked || isMiddle ? 'active-button' : null}
      disabled={isDisabled}
      onClick={handleClick}
    >
      {`${props.day.getMonth() + 1} - ${props.day.getDate()}`}
    </button>
  )

}

export default DatumElem;