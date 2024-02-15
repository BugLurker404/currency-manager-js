import { Box, Container, Grid, Link, Typography } from '@mui/material'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import InputAmout from './components/InputAmount'
import SelectCountry from './components/SelectCountry'
import SwitchCurrency from './components/SwitchCurrency'
import { CurrencyContext } from './context/CurrencyContext'


function App() {
    const {
      fromCurrency,
      setFromCurrency,
      toCurrency,
      setToCurrency,
      firstAmount,
    } = useContext(CurrencyContext);
    const [resultCurrency, setResultCurrency] = useState(0);
    const codeFromCurrency = fromCurrency.label.split(" ")[0]; 
    const codeToCurrency = toCurrency.label.split(" ")[0];
  
    useEffect(() => {
      if(firstAmount) {
        axios("https://api.freecurrencyapi.com/v1/latest", {
          params: {
            apikey: "fca_live_SDFBZiSKIgdwL3qiF6rwXV4anbBgKO4WmtXxB4pX",
            base_currency: codeFromCurrency,
            currencies: codeToCurrency
          }
        })
          .then(response => setResultCurrency(response.data.data[codeToCurrency]))
          .catch(error => console.log(error))
      }
    }, [firstAmount, fromCurrency, toCurrency])
  
    const boxStyles = {
      background: "#fdfdfd",
      marginTop: "10%",
      textAlign: "center",
      color: "#222",
      minHeight: "20rem",
      borderRadius: 2,
      padding: "4rem 2rem",
      boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
      position: "relative"
    }
  
    return (
      <Container maxWidth="md" sx={boxStyles}>
        <Typography variant='h5' sx={{ marginBottom: "2rem"}}>Currency Manager</Typography>
        <Grid container spacing={2}>
          <InputAmout />
          <SelectCountry value={fromCurrency} setValue={setFromCurrency} label="From" />
          <SwitchCurrency />
          <SelectCountry value={toCurrency} setValue={setToCurrency} label="To" />
        </Grid>
  
        {firstAmount ? (
  <Box sx={{ textAlign: "left", marginTop: "1rem"}}>
    <Typography>{firstAmount} {fromCurrency.label} =</Typography>
    <Typography variant='h5' sx={{ marginTop: "5px", fontWeight: "bold"}}>
      {resultCurrency * firstAmount} {toCurrency.label}
    </Typography>
  </Box>
) : ""}
        <Typography fontSize="10px" sx={{ position: "absolute", bottom: "1rem", right: "1rem" }}>
        </Typography>
      </Container>
    )
  }
  
  export default App