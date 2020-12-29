import React from 'react'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

export default function Nominations({list, removeNomination}) {
    return (
        <div style={{paddingRight: 16}}>
            <h3 style={{paddingLeft: 16}}>Nominations (Limit: 5)</h3>
            <ul>
                {list.map(item => (
                    <li key={item.id}>
                        <Grid container>
                            <Grid item xs={10}>
                                {item.title} ({item.year})
                            </Grid>
                            <Grid item xs={2}>
                                <Button 
                                    className="btn2"
                                    style={{margin: 5}} 
                                    variant="outlined" 
                                    color="secondary"
                                    onClick={() => removeNomination(item.id, item.title, item.year)}
                                    style={{
                                            background: 'linear-gradient(45deg, #f38375 35%, #ef6351 90%)',
                                            color: 'white',
                                            // height: 45,
                                            margin: 5,
                                            width: 120,
                                            boxShadow: '5px 5px rgba(239, 99, 81, .15)',
                                        }}>
                                    Remove
                                </Button>
                            </Grid>
                        </Grid>
                    </li>
                ))}
            </ul>
        </div>
    )
}