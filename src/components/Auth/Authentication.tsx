import styled from "styled-components";
import {useState} from "react";
import {SignUp} from "./SignUp";
import {SignIn} from "./SignIn";

type ModeType = 'signIn' | 'signUp'

export function Authentication() {
    const [mode, setMode] = useState<ModeType>('signIn')
    return (
        <Container>
            {
                mode === 'signIn'
                    ? <SignIn changeMode={() => setMode('signUp')} />
                    : <SignUp changeMode={() => setMode('signIn')} />
            }
        </Container>
    )
}

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 52px);
  background-image: url(https://baseballcloud-front.herokuapp.com/e2b853b6994b3e23d56d2dc1139f8d75.png);
  background-position: top center;
  background-size: cover;
  background-color: antiquewhite;
  grid-area: content;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
`
