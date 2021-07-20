import styled from "styled-components";
import {SignInForm} from "./SignInForm";

export function SignIn({changeMode}: { changeMode: () => void }) {
    return (
        <LoginView>
            <FormContainer>
                <FlexContainerColumn>
                    <Greeting>
                        <GreetingHead>
                            Welcome to BaseballCloud!
                        </GreetingHead>
                        <GreetingWelcome>
                            Sign into your account here:
                        </GreetingWelcome>
                    </Greeting>
                    <SignInForm />
                    <DivToSignUp>
                        <TextBox>
                            Don’t have an account?
                        </TextBox>
                        <Ref onClick={changeMode}>Sign Up</Ref>
                    </DivToSignUp>
                </FlexContainerColumn>
            </FormContainer>
        </LoginView>
    )
}

const LoginView = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
  padding: 16px;
  background-image: url(./../../assets/images/background_auth.png);
  background-position: top center;
  background-size: cover;
`
const FormContainer = styled.div`
  background: hsla(0, 0%, 100%, .8);
  padding: 16px;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  box-shadow: 0 0 20px rgb(0 0 0 / 40%);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(10px);
  width: 100%;
  max-width: 450px;
`
const FlexContainerColumn = styled.div`
  flex-flow: column;
`
const Greeting = styled.div`
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  margin-bottom: 48px;
`
const GreetingHead = styled.div`
  font-size: 24px;
  line-height: 1.25;
  font-weight: 400;
  text-align: center;
  color: #667784;
  margin-bottom: 8px;
`
const GreetingWelcome = styled.div`
    line-height: 1.25;
    font-weight: 400;
    text-align: center;
    color: #667784;
    font-size: 16px;
`
const DivToSignUp = styled.div`
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
`
const TextBox = styled.div`
  font-size: 16px;
  color: #667784;
`
const Ref = styled.a`
  font-size: 16px;
  line-height: 1.13;
  font-weight: 400;
  cursor: pointer;
  color: #48bbff;
  text-decoration: underline;
  padding-left: 3px;
`
