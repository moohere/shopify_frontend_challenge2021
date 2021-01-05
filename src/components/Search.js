import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';


export default function Search({ title, list, nominate, findInList }) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch("https://www.omdbapi.com/?apikey=6cabd6be&s=" + title)
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                setItems([result]);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    }, [title])

    

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return (
        <div>
            Loading...<CircularProgress /> 
        </div>
        )
    } else if (title.length > 0 && items[0].Response === "True") {
        return (
            <div style={{paddingRight: 16}}>
                <h3 style={{paddingLeft: 16}}>Results for "{title}"</h3>
                <ul>
                    {items[0].Search.map(item => (
                    <li key={item.imdbID}>
                        <Grid container>
                            <Grid item xs={7} sm={8} md={7} lg={8} xl={9}>
                                {item.Title} ({item.Year}) 
                            </Grid>
                            <Grid item xs={2}>
                                <Button 
                                    style={{margin: 5}} 
                                    className="btn"
                                    disabled = {findInList(item.imdbID) ? true : false}
                                    variant="outlined" 
                                    color="primary"
                                    onClick={() => nominate(item.imdbID, item.Title, item.Year)}
                                    style={!findInList(item.imdbID) ? 
                                        {
                                            background: 'linear-gradient(45deg, #E2BD64 25%, #fdc500 90%)',
                                            // borderRadius: 3,
                                            color: 'black',
                                            // height: 45,
                                            width: 120,
                                            margin: 5,
                                            boxShadow: '5px 5px rgba(226, 189, 100, .25)',
                                        } : {
                                            background: 'grey',
                                            // borderRadius: 3,
                                            color: 'black',
                                            // height: 45,
                                            margin: 5,
                                            width: 120,
                                            boxShadow: '5px 5px rgba(76, 76, 71, .15)',
                                        }}>
                                    <span>{findInList(item.imdbID) ? "Nominated": "Nominate"}</span>
                                </Button>
                            </Grid>
                        </Grid>
                    </li>
                    ))}
                </ul>
            </div>
        );
    } else {
        return (
        <div>
            <h3 style={{paddingLeft :16}}>
                Search movie titles to get results...<br/>
            </h3>
        </div>);
    }
}

Search.propTypes = {
    title: PropTypes.string.isRequired,
};