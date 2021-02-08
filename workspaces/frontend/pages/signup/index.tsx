import styles from './Index.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';
import { Formik, Field, Form, FormikProps } from 'formik';
import * as Yup from 'yup';
import classnames from 'classnames';
import { useAuth } from '../../components/UserProvider/UserProvider';

interface FormValues {
  email: string;
  phoneNumber: string;
  password: string;
  passwordConfirm: string;
}

const formikInitialValues = {
  email: '',
  password: '',
  phoneNumber: '',
  passwordConfirm: '',
};

const formikValidationSchema = Yup.object({
  email: Yup.string()
    .email('Se requiere un email valido')
    .required('Se requiere un email'),
  phoneNumber: Yup.number().required('Debes introducir un numero de telefono'),
  password: Yup.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('Se requiere una contraseña'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden')
    .required('Se requiere confirmar la contraseña'),
});

export default function SignUpScreen() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const { signup } = useAuth();

  const onClickOnSignUp = (
    providedEmail: string,
    providedPhoneNumber: string,
    providedPassword: string
  ) => {
    signup(providedEmail, providedPhoneNumber, providedPassword).then(
      (res) => {
        router.push('/');
      },
      (err) => {
        setErrorMessage(err);
      }
    );
  };

  return (
    <div className='container-fluid px-3'>
      <div className='row min-vh-100'>
        <div className='col-md-8 col-lg-6 col-xl-5 d-flex align-items-center'>
          <div className='w-100 py-5 px-md-5 px-xl-6 position-relative'>
            <div className='mb-5'>
              <img
                className={`${styles.imgFix} img-fluid mb-3`}
                src='https://d19m59y37dris4.cloudfront.net/directory/1-6/img/logo-square.svg'
                alt='Beach Sports Rent Logo'
              />
              <h2>Registro</h2>
              <p className='text-muted'>
                Hay lugares donde uno se queda y lugares que quedan en uno.
              </p>
            </div>
            {errorMessage && (
              <div className='alert alert-danger' role='alert'>
                {errorMessage}
              </div>
            )}
            <Formik
              initialValues={formikInitialValues}
              validationSchema={formikValidationSchema}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                onClickOnSignUp(
                  values.email,
                  values.phoneNumber,
                  values.password
                );
                resetForm();
                setSubmitting(false);
              }}>
              {({ touched, errors }: FormikProps<FormValues>) => (
                <Form className='form-validate'>
                  <div className='form-group'>
                    <label className='form-label' htmlFor='loginUsername'>
                      Dirección email
                    </label>
                    <Field
                      className={classnames(`form-control`, {
                        'is-invalid': touched.email && errors.email,
                      })}
                      name='email'
                      id='loginUsername'
                      type='text'
                      placeholder='nombre@direccion.com'
                    />
                    {touched.email && errors.email && (
                      <div className='invalid-feedback'>{errors.email}</div>
                    )}
                  </div>
                  <div className='form-group'>
                    <label className='form-label' htmlFor='phoneNumber'>
                      Numero de telefono
                    </label>
                    <Field
                      className={classnames(`form-control`, {
                        'is-invalid': touched.phoneNumber && errors.phoneNumber,
                      })}
                      name='phoneNumber'
                      id='phoneNumber'
                      type='tel'
                      placeholder=' '
                    />
                    {touched.phoneNumber && errors.phoneNumber && (
                      <div className='invalid-feedback'>
                        {errors.phoneNumber}
                      </div>
                    )}
                  </div>
                  <div className='form-group'>
                    <label className='form-label' htmlFor='loginPassword'>
                      Contraseña
                    </label>
                    <Field
                      className={classnames(`form-control`, {
                        'is-invalid': touched.password && errors.password,
                      })}
                      name='password'
                      id='loginPassword'
                      placeholder='Contraseña'
                      type='password'
                    />
                    {touched.password && errors.password && (
                      <div className='invalid-feedback'>{errors.password}</div>
                    )}
                  </div>
                  <div className='form-group mb-4'>
                    <label
                      className='form-label'
                      htmlFor='loginPasswordConfirm'>
                      Confirme su contraseña
                    </label>
                    <Field
                      className={classnames(`form-control`, {
                        'is-invalid':
                          touched.passwordConfirm && errors.passwordConfirm,
                      })}
                      name='passwordConfirm'
                      id='loginPasswordConfirm'
                      placeholder='Repita su contraseña'
                      type='password'
                    />
                    {touched.passwordConfirm && errors.passwordConfirm && (
                      <div className='invalid-feedback'>
                        {errors.passwordConfirm}
                      </div>
                    )}
                  </div>
                  <button className='btn btn-lg btn-block btn-primary'>
                    Registrarse
                  </button>
                  <hr
                    className='my-3 hr-text letter-spacing-2'
                    data-content='También puede'
                  />
                  <button
                    className='btn btn btn-outline-primary btn-block btn-social mb-3'
                    type='button'>
                    <i className='fa-2x fa-facebook-f fab btn-social-icon'> </i>{' '}
                    Conectar con Facebook
                  </button>
                  <button
                    className='btn btn btn-outline-muted btn-block btn-social mb-3'
                    type='button'>
                    <i className='fa-2x fa-google fab btn-social-icon'> </i>{' '}
                    Conectar con Google
                  </button>
                  <hr className='my-4' />
                  <p className='text-sm text-muted'>
                    Al registrarse usted acepta los
                    <Link href='/'>
                      <a href='#'> Términos y condiciones </a>
                    </Link>{' '}
                    y la
                    <Link href='/'>
                      <a href='#'> Politica de privacidad</a>
                    </Link>
                    .
                  </p>
                </Form>
              )}
            </Formik>

            <div>
              <a
                className='close-absolute mr-md-5 mr-xl-6 border-2 pt-5'
                onClick={() => router.back()}>
                <FontAwesomeIcon
                  icon={faTimes}
                  size='2x'
                  className={`${styles.closeIcon}`}
                />
              </a>
            </div>
          </div>
        </div>

        <div className='col-md-4 col-lg-6 col-xl-7 d-none d-md-block'>
          <div className={`${styles.bgFix} bg-cover h-100 mr-n3`}> </div>
        </div>
      </div>
    </div>
  );
}
