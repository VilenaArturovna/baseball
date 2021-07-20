import styled from "styled-components";

export function SignUp({changeMode}: { changeMode: () => void }) {
    return (
        <SignUpView>
            <FormContainer>
                <SignUpContent>
                    <FlexContainerColumn>
                        <RegistrationNote>
                            <Heading>
                                only Players
                            </Heading>
                            <TextBox>
                                <Text>
                                    Players have their own profile within the system and plan on having data collected.
                                </Text>
                            </TextBox>
                        </RegistrationNote>
                        <form>

                        </form>
                        <DivToSignIn>
                            <TextBoxx>
                                Already registered?
                            </TextBoxx>
                            <Ref onClick={changeMode}>
                                Sign In
                            </Ref>
                        </DivToSignIn>
                    </FlexContainerColumn>
                </SignUpContent>
            </FormContainer>
        </SignUpView>
    )
}

const SignUpView = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
  padding: 16px;
`
const FormContainer = styled.div`
  background: hsla(0, 0%, 100%, .8);
  padding: 16px;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  box-shadow: 0 0 20px rgb(0 0 0 / 40%);
  backdrop-filter: blur(5px);
  width: 100%;
  max-width: 450px;
`
const SignUpContent = styled.div`
  display: flex;
`
const FlexContainerColumn = styled.div`
  flex-flow: column;
  width: 100%;
`
const RegistrationNote = styled.div`
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  background: #48bbff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
`
const Heading = styled.div`
  text-align: center;
  font-size: 36px;
  font-weight: 700;
  line-height: 0.78;
  color: #ffffff;
  margin-bottom: 21px;
`
const TextBox = styled.div`
  font-size: 18px;
  line-height: 1.64;
  text-align: center;
  color: #ffffff;
`
const Text = styled.p`
  font-size: 14px;
  margin: 0;
  line-height: 1.44;
`
const DivToSignIn = styled.div`
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
`
const TextBoxx = styled.div`
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
