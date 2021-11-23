import * as React from 'react';
import {useEffect} from 'react';
import PropTypes from 'prop-types';
import {Avatar, CircularProgress, ListItem, ListItemAvatar, ListItemText, Switch,} from "@material-ui/core";
import axios from "axios";
import {useSession} from "next-auth/client";
import List from "@material-ui/core/List";

function ListItemButton(props) {
    return null;
}

ListItemButton.propTypes = {children: PropTypes.node};
export default function Users() {
    const [session, loading] = useSession()
    const [checked, setChecked] = React.useState([1]);
    const [users, setUsers] = React.useState([]);

    useEffect(async () => {
        await axios.get('/api/users')
            .then((response) => setUsers(response.data.users))
    }, [])

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    if (loading) {
        return <CircularProgress/>
    }

    return (
        <List dense sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
            {[0, 1, 2, 3].map((value) => {
                const labelId = `checkbox-list-secondary-label-${value}`;
                return (
                    <ListItem
                        key={value}
                        secondaryAction={
                            <Switch
                                edge="end"
                                onChange={handleToggle('bluetooth')}
                                checked={checked.indexOf('bluetooth') !== -1}
                                inputProps={{
                                    'aria-labelledby': 'switch-list-label-bluetooth',
                                }}
                            />
                        }
                        disablePadding
                    >
                        <ListItemButton>
                            <ListItemAvatar>
                                <Avatar src={`${session?.user?.image}`}/>
                            </ListItemAvatar>
                            <ListItemText id={labelId} primary={`Line item ${value + 1}`}/>
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
    );
}
