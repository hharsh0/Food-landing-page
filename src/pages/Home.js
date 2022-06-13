import React, { useState, useEffect } from 'react'
import Card from '../components/Card'
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";

function Home({ inputValue, setInputValue, apiKey, numberOfImages }) {
  const [data, setData] = useState();

  useEffect(() => {
    fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=${numberOfImages}&tags=vegetarian`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.recipes);
        setData(data.recipes);
      })
      .catch(() => {
        console.log("error");
      });
  }, []);

  return (
    <>
      {/* <div className="flex justify-center mt-10 mb-10 items-center">
         <TextField
           sx={{ width: 600 }}
           id="standard-helperText"
           label="Search Recipes"
           helperText="Some important text"
           variant="outlined"
         />
         <div className="ml-2 mb-6">
           <Button variant="contained" size="large">
             Search
           </Button>
         </div>
       </div> */}
      <div className="App flex flex-wrap m-4">
        {data &&
          data.map((e, id) => (
            <Card
              key={id}
              title={e.title}
              readyIn={e.readyInMinutes}
              price={e.pricePerServing}
              image={e.image}
              instruction={e.instructions}
              id={e.id}
            />
          ))}
      </div>
    </>
  );
}

export default Home