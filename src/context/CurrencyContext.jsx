import { createContext, useState } from "react";

export const CurrencyContext = createContext();

const CurrencyProvider = ({ children }) => {
  const [fromCurrency, setFromCurrency] = useState({
    label: "USD - United States",
    flagUrl: "https://flagcdn.com/us.png" // Fikcyjny URL, użyj rzeczywistego adresu
  });
  const [toCurrency, setToCurrency] = useState({
    label: "AUD - Australia",
    flagUrl: "https://flagcdn.com/au.png" // Fikcyjny URL, użyj rzeczywistego adresu
  });
  const [firstAmount, setFirstAmount] = useState("");

  const value = {
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    firstAmount,
    setFirstAmount
  };
  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyProvider;