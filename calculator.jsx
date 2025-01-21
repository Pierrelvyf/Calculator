import React, { useState, useEffect } from "react";
import "./App.css";

const Calculator = () => {
  const [user, setUser] = useState({
    num1: "",
    num2: "",
    result: null,
    error: "",
    operationCount: 0
  });

  useEffect(() => {
    if (user.operationCount === 10) {
      alert("Vous avez effectué 10 opérations !");
    }
  }, [user.operationCount]);

  const handleAddition = () => {
    if (validateInput()) {
      setUser(prevUser => ({
        ...prevUser,
        result: parseFloat(user.num1) + parseFloat(user.num2),
        operationCount: prevUser.operationCount + 1,
        error: ""
      }));
    }
  };

  const handleMultiplication = () => {
    if (validateInput()) {
      setUser(prevUser => ({
        ...prevUser,
        result: parseFloat(user.num1) * parseFloat(user.num2),
        operationCount: prevUser.operationCount + 1,
        error: ""
      }));
    }
  };

  const handleReset = () => {
    setUser({
      num1: "",
      num2: "",
      result: null,
      error: "",
      operationCount: 0
    });
  };

  const validateInput = () => {
    if (user.num1 === "" || user.num2 === "" || isNaN(user.num1) || isNaN(user.num2)) {
      setUser(prevUser => ({
        ...prevUser,
        error: "Veuillez saisir des nombres valides."
      }));
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
            value={user.num1}
            onChange={(e) => setUser(prevUser => ({ ...prevUser, num1: e.target.value }))}
          />
        </label>
        <label>
          Num2:
          <input
            type="text"
            value={user.num2}
            onChange={(e) => setUser(prevUser => ({ ...prevUser, num2: e.target.value }))}
          />
        </label>
      </div>
      <div className="buttons">
        <button onClick={handleAddition}>+</button>
        <button onClick={handleMultiplication}>*</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      {user.error && <p className="error">{user.error}</p>}
      {user.result !== null && <p className="result">Résultat : {user.result}</p>}
      <p className="counter">Nombre d'opérations : {user.operationCount}</p>
    </div>
  );
};

export default Calculator;
