import '../static/css/App.css';
import { render } from "react-dom";
import React, {useState, useEffect} from 'react'
import Search from './Search';
import Nominations from './Nominations';
import HelperButton from './HelperButton';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';

export default function App() {
  const [title, setTitle] = useState('');
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);

  // Snackbar for full nomination list
  const snackbarOpen = () => {
    setOpen(true);
  };

  const snackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  // Search field handling
  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  // Helper methods to search the nomination list
  const findInList = (value) => {
    for(var i = 0; i < list.length; i += 1) {
        if(list[i]["id"] === value) {
            return true;
        }
    }
    return false;
  }

  const findIndex = (value) => {
    for(var i = 0; i < list.length; i += 1) {
        if(list[i]["id"] === value) {
            return i;
        }
    }
    return -1;
  } 

  // Helper method to convert list to string for the cookie
  const listToString = (list) => {
    let listString = ''
    list.forEach(item => listString += (JSON.stringify(item).substring(1, JSON.stringify(item).length-1) + "|"))
    return listString.substring(0,listString.length-1);
  }

  // Methods to nominate and remove nominations
  const nominate = (id, title, year) => {
    let newList = [];
    if (!findInList(id) && list.length < 5) {
        
        list.forEach(item => newList.push(item));

        newList.push({id, title, year});
        setList(newList);
        setCookie(listToString(newList));

        let box = document.getElementsByClassName("nomList")[0];
        box.classList.remove('collapseList');
        if (newList.length === 1) box.classList.add('extendList1');
        else if (newList.length === 2) box.classList.add('extendList2');
        else if (newList.length === 3) box.classList.add('extendList3');
        else if (newList.length === 4) box.classList.add('extendList4');
    } 
    if (newList.length === 5 || list.length === 5) {
      snackbarOpen();
    }
  };

  const removeNomination = (id, title, year) => {
    if (findInList(id)) {
      let newList = [];
      list.forEach(item => newList.push(item));
      
      const index = findIndex(id);
      if (index > -1) {
        newList.splice(index, 1);
      }
      setList(newList);
      setCookie(listToString(newList));
      let box = document.getElementsByClassName("nomList")[0];
      box.classList.remove('extendList1');
      box.classList.remove('extendList2');
      box.classList.remove('extendList3');
      box.classList.remove('extendList4');
      if (newList.length === 4) box.classList.add('collapseList4');
      else if (newList.length === 3) box.classList.add('collapseList3');
      else if (newList.length === 2) box.classList.add('collapseList2');
      else if (newList.length === 1) box.classList.add('collapseList1');
    }
  }

  // Cookie methods
  function setCookie(newList) {
    var d = new Date();
    d.setTime(d.getTime() + (1*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = "list=" + newList + ";" + expires;
  }
  
  function getCookie() {
    var decodedCookie = decodeURIComponent(document.cookie);
    var objects = decodedCookie.substring(5,);
    return objects;
  }
  
  function checkCookie() {
    var listCookie=getCookie();
    if (listCookie !== "") {
      // Splitting the cookie saved data to properly convert the string back to list
      let newList = listCookie.split("|");
      let filteredList = newList.filter(item => {return item !=='';});
      let listToSet = []
      filteredList.forEach(item => {
        let properties = (item.split(","))
        let filteredProps = []
        properties.forEach(item => filteredProps.push((item.substring(1, item.length-1)).split(":\"")))
        let obj = {};

        filteredProps.forEach(item => {
          let key = item[0].substring(0,item[0].length-1);
          let value = item[1].substring(0, item[1].length);
          obj[key] = value;
        })
        listToSet.push(obj)
      })
      setList(listToSet)
    } else {
      setCookie(list);
    }
  }

  useEffect(() => {
    checkCookie();
  },[])

  const data = {list, title, nominate, findInList, removeNomination};

  return (
    <div className="App" style={{paddingTop: 50}}>
      <Grid container spacing={2} justify="center" alignItems="flex-start">
        <Grid item sm={1}></Grid>
        <Grid item xs={10} sm={10} style={{paddingBottom: 15}} >
          <div>
            <h1>The Shoppies: Movie Awards for Entrepreneurs</h1>
            
            <Grid container spacing={1} alignItems="flex-end" style={{padding: 15, backgroundColor: "#f4f3ee",  borderRadius: 15, maxWidth: 550, boxShadow: '10px 10px rgba(239, 99, 81, .1)'}}>
              <Grid item>
                <SearchIcon/>
              </Grid>
              <Grid item>
                <TextField 
                  label="Search" 
                  name="title" 
                  value={title} 
                  style={{width: 300}}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item style={{paddingLeft: 25}}>
                <HelperButton/>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item sm={1}></Grid>

        <Grid item sm={1}></Grid>
        <Grid item xs={10} sm={5} style={{padding: 15, backgroundColor: "#f4f3ee", minHeight: 675, borderRadius: 15,  boxShadow: '10px 10px rgba(239, 99, 81, .1)'}}>
          <Search {...data}/>
        </Grid>
        <Grid className="nomList" item xs={10} sm={5} style={{padding: 15, backgroundColor: "#f4f3ee", minHeight: 100, borderRadius: 15, borderLeft: "#fbd589 5px solid", boxShadow: '10px 10px rgba(239, 99, 81, .1)'}}>
          <Nominations {...data}/>
        </Grid>
        <Grid item sm={1}></Grid>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            open={open}
            autoHideDuration={3000}
            onClose={snackbarClose}
            message="Thank you for nominating 5 great movies!"
            style={{alignItems: "center"}}
          />
      </Grid>
    </div>
  );
}

render(<App/>, document.getElementById("root"));