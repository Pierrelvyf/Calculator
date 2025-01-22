import React, { useReducer, useEffect } from "react";
import "./App.css";

const initialState = {
  num1: "",
  num2: "",
  result: null,
  error: "",
  operationCount: 0
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_NUM1":
      return { ...state, num1: action.payload };
    case "SET_NUM2":
      return { ...state, num2: action.payload };
    case "SET_RESULT":
      return { ...state, result: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "INCREMENT_OPERATION_COUNT":
      return { ...state, operationCount: state.operationCount + 1 };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

const Calculator = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    if (state.operationCount === 10) {
      alert("Vous avez effectué 10 opérations !");
    }
  }, [state.operationCount]);

  const handleAddition = () => {
    if (validateInput()) {
      dispatch({
        type: "SET_RESULT",
        payload: parseFloat(state.num1) + parseFloat(state.num2)
      });
      dispatch({ type: "INCREMENT_OPERATION_COUNT" });
      dispatch({ type: "SET_ERROR", payload: "" });
    }
  };

  const handleMultiplication = () => {
    if (validateInput()) {
      dispatch({
        type: "SET_RESULT",
        payload: parseFloat(state.num1) * parseFloat(state.num2)
      });
      dispatch({ type: "INCREMENT_OPERATION_COUNT" });
      dispatch({ type: "SET_ERROR", payload: "" });
    }
  };

  const handleReset = () => {
    dispatch({ type: "RESET" });
  };

  const validateInput = () => {
    if (state.num1 === "" || state.num2 === "" || isNaN(state.num1) || isNaN(state.num2)) {
      dispatch({ type: "SET_ERROR", payload: "Veuillez saisir des nombres valides." });
      return false;
    }
    return true;
  };

  return (
    <div className="calculator">
      <h1>Calculatrice</h1>
      <div className="inputs">
        <label>
          Num1:
          <input
            type="text"
            value={state.num1}
            onChange={(e) => dispatch({ type: "SET_NUM1", payload: e.target.value })}
          />
        </label>
        <label>
          Num2:
          <input
            type="text"
            value={state.num2}
            onChange={(e) => dispatch({ type: "SET_NUM2", payload: e.target.value })}
          />
        </label>
      </div>
      <div className="buttons">
        <button onClick={handleAddition}>+</button>
        <button onClick={handleMultiplication}>*</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      {state.error && <p className="error">{state.error}</p>}
      {state.result !== null && <p className="result">Résultat : {state.result}</p>}
      <p className="counter">Nombre d'opérations : {state.operationCount}</p>
    </div>
  );
};

export default Calculator;
