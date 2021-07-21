import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import styled from "styled-components";
import {signIn, signUp} from "../../redux/reducers/auth-reducer";

type FormikErrorType = {
    email?: string
    password?: string
    password_confirmation?: string
}

export function SignUpForm() {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            password_confirmation: '',
            role: 'player'
        },
        validate: values => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length < 8) {
                errors.password = 'Must be 8 characters or more'
            }
            if (!values.password_confirmation) {
                errors.password_confirmation = 'Required'
            } else if (values.password !== values.password_confirmation) {
                errors.password_confirmation = 'Passwords are not equal'
            }
            return errors
        },
        onSubmit: async (values, formikHelpers) => {
            await dispatch(signUp(values))
            /*if (signIn.rejected.match(action)) {
                if (action.payload?.fieldsErrors && action.payload?.fieldsErrors.length) {
                    const error = action.payload?.fieldsErrors[0]
                    formikHelpers.setFieldError(error.field, error.error)
                }
            }*/
            formik.resetForm();
        },
    })

    return <form onSubmit={formik.handleSubmit}>
        <Field>
            <FieldMiddle>
                <TextField
                    placeholder={'Email'}
                    type={'email'}
                    {...formik.getFieldProps('email')}
                    onBlur={formik.handleBlur}
                />
            </FieldMiddle>
            {(formik.touched.email && formik.errors.email) &&
            <div style={{color: 'red'}}>{formik.errors.email}</div>}
        </Field>
        <Field>
            <FieldMiddle>
                <TextField
                    placeholder={'Password'}
                    type="password"
                    {...formik.getFieldProps('password')}
                    onBlur={formik.handleBlur}
                />
            </FieldMiddle>
            {(formik.touched.password && formik.errors.password) &&
            <div style={{color: 'red'}}>{formik.errors.password}</div>}
        </Field>
        <Field>
            <FieldMiddle>
                <TextField
                    placeholder={'Confirm Password'}
                    type="password"
                    {...formik.getFieldProps('password_confirmation')}
                    onBlur={formik.handleBlur}
                />
            </FieldMiddle>
            {(formik.touched.password && formik.errors.password) &&
            <div style={{color: 'red'}}>{formik.errors.password}</div>}
        </Field>
        <Button type={'submit'}>Sign In</Button>
    </form>
}

const Field = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 15px;
  flex-direction: column;
`
const FieldMiddle = styled.div`
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  -webkit-flex: 0 0 100%;
  -ms-flex: 0 0 100%;
  flex: 0 0 100%;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
`
const TextField = styled.input`
  display: block;
  height: 50px;
  border-radius: 4px;
  background-color: #eff1f3;
  padding: 6px 12px 10px 37px;
  font-size: 16px;
  line-height: 1.13;
  font-weight: 400;
  color: #667784;
  border: 1px solid transparent;
`
const Button = styled.button`
  display: block;
  padding: 7px 19px 10px 18px;
  border-radius: 4px;
  font-size: 16px;
  line-height: 19px;
  font-weight: 400;
  color: #ffffff;
  border: solid 1px transparent;
  box-shadow: 0 0 4px 0 rgb(72 187 255 / 0%);
  background-color: #48bbff;
  padding-top: 15px;
  padding-bottom: 17px;
  width: 100%;
  -webkit-flex: 1 1 auto;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  margin-bottom: 15px;
`
