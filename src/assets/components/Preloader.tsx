import styled from "styled-components";
import spinner from "./../images/Spinner.png"

export function Preloader() {
    return (
        <Container>
            <img src={spinner} alt={'Loading...'} />
        </Container>
    )
}

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
