import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BaseHeader } from "../../components/BaseHeader/BaseHeader";
import Link from 'next/link';
import { BasePageLayout } from "../../components/BasePageLayout/BasePageLayout";

const Admin = () => {
    return (
        <>
            <BasePageLayout>
                <div className="container">
                    <section className="pt-5">
                        <h1 className="hero-heading mb-0">Panel de control</h1>
                        <p className="text-muted mb-5">Gestiona tu alquiler</p>
                    </section>
                    <div className="row">
                        <div className="col-6 col-md-4 mb-30px">
                            <div className="card h-100 border-0 shadow hover-animate">
                                <div className="card-body">
                                    <div className="icon-rounded bg-secondary-light mb-3">
                                        <FontAwesomeIcon size={"2x"} color="#e83e8c" icon={faCalendarAlt} />
                                    </div>
                                    <h5 className="card-title mb-3"><Link href="/admin/reservations"><a className="text-decoration-none text-dark stretched-link">Reservas</a></Link></h5>
                                    <p className="text-muted card-text text-sm">Consulta tus reservas</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </BasePageLayout>

        </>
    )
}

export default Admin;