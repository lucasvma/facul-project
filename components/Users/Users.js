import * as React from 'react';
import { useState } from 'react';
import {Avatar, CircularProgress, ListItem, ListItemAvatar, ListItemText, Switch,} from "@material-ui/core";
import {useSession} from "next-auth/client";
import List from "@material-ui/core/List";
import {makeStyles} from "@material-ui/core/styles";
import styles from "../../styles/jss/nextjs-material-kit/pages/componentsSections/basicsStyle";

const useStyles = makeStyles(styles);

export default function Users({ users }) {
    const classes = useStyles();
    const [session, loading] = useSession()
    const [checked, setChecked] = useState(true);

    const handleToggle = (userId) => () => {
        console.log('blockUser', userId)
        setChecked(!checked);
    };

    if (loading) {
        return <CircularProgress/>
    }

    return (
        <List dense sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
            {users.map((user) => {
                let userId = user?._id
                return (
                    <>
                        <ListItem
                            key={userId}
                            disablePadding
                        >
                            <ListItemAvatar>
                                <Avatar src={user?.image} />
                            </ListItemAvatar>
                            <ListItemText id={userId} primary={user?.name} />
                            Bloqueado
                            <Switch
                                onChange={handleToggle(userId)}
                                checked={checked}
                                inputProps='checked'
                                classes={{
                                    switchBase: classes.switchBase,
                                    checked: classes.switchChecked,
                                    thumb: classes.switchIcon,
                                    track: classes.switchBar,
                                    label: classes.label,
                                }}
                            />
                            Ativo
                        </ListItem>
                    </>
                );
            })}
        </List>
    );
}
