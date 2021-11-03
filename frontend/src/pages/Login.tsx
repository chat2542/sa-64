import React, {SyntheticEvent, useState} from 'react'
import { Redirect } from 'react-router';
import Button from "@material-ui/core/Button";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }),
)

const Login = (props: {setRedirect: (redirect: boolean) => void}) => {
    props.setRedirect(false)

    const [code, setStudentCode] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault()

        const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({
            "Student_code": code,
            "Password": password
        })
    });

    const content = await response.json();
        console.log(content);
        setRedirect(true);
        window.location.reload();
    }

    if (redirect) {
        return <Redirect to="/" />;
    }

    return (
        <Container maxWidth="sm">
            <Box textAlign='center'>
                <form onSubmit={submit}>
                    <Typography variant="h4" align="center" style={{margin: '1rem'}}>
                        Please sign in
                    </Typography>
                    <div>
                    <TextField type="text" className="form-control" placeholder="BXXXXXXX" variant="outlined" label="StudentID"
                        style={{marginBottom: '.5rem'}}
                        onChange={e => setStudentCode(e.target.value)}
                    />
                    </div>
                    <div>
                    <TextField type="password" className="form-control" placeholder="Password" variant="outlined" label="PASSWORD"
                        style={{marginBottom: '.5rem'}}
                        onChange={e => setPassword(e.target.value)}
                    />
                    </div>
                    <Button variant="contained" color="primary" style={{marginBottom: '.3rem', justifyContent: 'center'}} type="submit">Sign in</Button>
                </form>
            </Box>
        </Container>
    );
};
export default Login;