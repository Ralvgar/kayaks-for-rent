import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Index.module.scss";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { useState } from "react";
import * as Yup from "yup";
import Link from "next/link";
import { Formik, Form, FormikProps, Field } from "formik";
import classnames from "classnames";
import { useAuth } from "../../components/UserProvider/UserProvider";

interface FormValues {
  email: string;
  password: string;
}

const formikInitialValues = {
  email: "",
  password: "",
};

const formikValidationSchema = Yup.object({
  email: Yup.string()
    .email("Se requiere un email valido")
    .required("Se requiere un email"),
  password: Yup.string().required("Se requiere una contraseña"),
});

export default function LoginScreen() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(null);
  const { login } = useAuth();

  const onClickOnLogIn = (emailProvided: string, passwordProvided: string) => {
    setErrorMessage(false);
    login(emailProvided, passwordProvided).then(
      (res) => {
        router.push("/");
      },
      (err) => {
        setErrorMessage(err);
      }
    );
  };

  return (
    <div className="container-fluid px-3">
      <div className="row min-vh-100">
        <div className="col-md-8 col-lg-6 col-xl-5 d-flex align-items-center">
          <div className="w-100 py-5 px-md-5 px-xl-6 position-relative">
            <div className="mb-5">
              <img
                className={`${styles.imgFix} img-fluid mb-3`}
                src="https://d19m59y37dris4.cloudfront.net/directory/1-6/img/logo-square.svg"
                alt="Beach Sport Rent Logo"
              />
              <h2>¡Bienvenido de nuevo!</h2>
            </div>
            <div>
              {errorMessage && (
                <div className="alert alert-danger" role="alert">
                  {errorMessage}
                </div>
              )}
            </div>
            <Formik
              initialValues={formikInitialValues}
              validationSchema={formikValidationSchema}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                onClickOnLogIn(values.email, values.password);
                resetForm();
                setSubmitting(false);
              }}
            >
              {({ touched, errors }: FormikProps<FormValues>) => (
                <Form className="form-validate">
                  <div className="form-group">
                    <label className="form-label" htmlFor="loginUsername">
                      Dirección email
                    </label>
                    <Field
                      className={classnames(`form-control`, {
                        "is-invalid": touched.email && errors.email,
                      })}
                      name="email"
                      id="loginUsername"
                      type="text"
                      placeholder="nombre@direccion.com"
                    />
                    {touched.email && errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                  <div className="form-group mb-4">
                    <div className="row">
                      <div className="col">
                        <label className="form-label" htmlFor="loginPassword">
                          Conraseña
                        </label>
                      </div>
                      <div className="col-auto">
                        <a className="form-text small" href="#">
                          ¿No recuerda la contraseña?
                        </a>
                      </div>
                    </div>
                    <Field
                      className={classnames(`form-control`, {
                        "is-invalid": touched.password && errors.password,
                      })}
                      name="password"
                      id="loginPassword"
                      placeholder="Contraseña"
                      type="password"
                    />
                    {touched.password && errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>
                  <div className="form-group mb-4">
                    <div className="custom-control custom-checkbox">
                      <input
                        className="custom-control-input"
                        id="loginRemember"
                        type="checkbox"
                      />
                      <label
                        className="custom-control-label text-muted"
                        htmlFor="loginRemember"
                      >
                        <span className="text-sm">Recuerdeme por 30 días</span>
                      </label>
                    </div>
                  </div>
                  <button className="btn btn-lg btn-block btn-primary">
                    Entrar
                  </button>
                  <hr
                    className="my-3 hr-text letter-spacing-2"
                    data-content="También puede"
                  />
                  <button
                    className="btn btn btn-outline-primary btn-block btn-social mb-3"
                    type="button"
                  >
                    <i className="fa-2x fa-facebook-f fab btn-social-icon"> </i>
                    Conectar con Facebook
                  </button>
                  <button
                    className="btn btn btn-outline-muted btn-block btn-social mb-3"
                    type="button"
                  >
                    <i className="fa-2x fa-google fab btn-social-icon"> </i>
                    Conectar con Google
                  </button>
                  <hr className="my-4" />
                  <p className="text-center">
                    <small className="text-muted text-center">
                      ¿No tiene cuenta aún?
                      <Link href="/signup">
                        <a> Registro </a>
                      </Link>
                    </small>
                  </p>
                </Form>
              )}
            </Formik>
            <div>
              <a
                onClick={() => router.back()}
                className="close-absolute mr-md-5 mr-xl-6 border-2 pt-5"
              >
                <FontAwesomeIcon
                  icon={faTimes}
                  size="2x"
                  className={`${styles.closeIcon}`}
                />
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-lg-6 col-xl-7 d-none d-md-block">
          <div className={`${styles.bgFix} bg-cover h-100 mr-n3`}></div>
        </div>
      </div>
    </div>
  );
}
