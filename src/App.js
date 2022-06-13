import Home from './pages/Home';
import Recipe from './pages/Recipe'
import { Route, Switch, Redirect } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "30ch",
      "&:focus": {
        width: "50ch",
      },
    },
  },
}));


const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));




function App() {

  const [inputValue, setInputValue] = React.useState();
  const [open, setOpen] = React.useState();
  const [results, setResults] = React.useState();
  const apiKey = "6469e117620e492d874782139686d40c";
  const numberOfImages = 9;
  const numberOfAutocompleteResults = 4;



   const handleClick = () => {
     setOpen(true);
   };
  
   const handleClose = (event, reason) => {
     if (reason === "clickaway") {
       return;
     }

     setOpen(false);
   };
  
  React.useEffect(() => {
    fetch(
      `https://api.spoonacular.com/food/products/suggest?apiKey=${apiKey}&query=${inputValue}&number=${numberOfAutocompleteResults}`
    ).then((response) => response.json())
      .then((data) => {
        setResults(data)
      console.log(data)
    })
  }, [inputValue])
  
  //  const handleSubmit = (event) => {
  //    event.preventDefault();


  //  };

  const handleChange = (e) => {
    setInputValue(e.target.value);

    //  fetch(
    //    `https://api.spoonacular.com/food/products/suggest?apiKey=${apiKey}&query=${inputValue}&number=${numberOfAutocompleteResults}`
    //  )
    //    .then((response) => response.json())
    //    .then((data) => {
    //      setResults(data);
    //      console.log(data);
    //    });
  }



  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity="info"
                sx={{ width: "100%" }}
              >
                {"Comming soon!"}
              </Alert>
            </Snackbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Bite my kitchen
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              
              <form>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    console.log(e.target.value);
                  }}
                />
              </form>
             
              {/* AUTO COMPLETE FEATURE */}


               {/* <Autocomplete
                sx={{ width: "300px" }}
                value={inputValue}
                onChange={handleChange}
                popupIcon={<SearchIcon />}
                freeSolo
                options={results && results.results.map((option) => option.title)}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Search..." />
                )}
              /> */}
              
            </Search>
          </Toolbar>
        </AppBar>
      </Box>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/Home"></Redirect>
        </Route>
        <Route path="/Home">
          <Home
            inputValue={inputValue}
            setInputValue={setInputValue}
            apiKey={apiKey}
            numberOfImages={numberOfImages}
          />
        </Route>
        <Route path="/recipe/:id">
          <Recipe
            inputValue={inputValue}
            setInputValue={setInputValue}
            apiKey={apiKey}
          />
        </Route>
      </Switch>
    </>
  );
}

export default App;
