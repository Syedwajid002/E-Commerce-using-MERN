import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <div>
            <footer className="text-center text-lg-start bg-body-tertiary text-muted">
                <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">

                    <div className="me-5 d-none d-lg-block">
                        <span>About us:</span>
                    </div>
                    <div>
                        <a href="" className="me-4 text-reset">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="" className="me-4 text-reset">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="" className="me-4 text-reset">
                            <i className="fab fa-google"></i>
                        </a>
                        <a href="" className="me-4 text-reset">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="" className="me-4 text-reset">
                            <i className="fab fa-linkedin"></i>
                        </a>
                        <a href="" className="me-4 text-reset">
                            <i className="fab fa-github"></i>
                        </a>
                    </div>
                </section>

                <section className="">
                    <div className="container text-center text-md-start mt-5">
                        <div className="row mt-3">
                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">
                                    <i className="fas fa-gem me-3"></i>
                                    <b>E-STORE</b>
                                </h6>
                                <p>
                                    We are a trusted and verified sellers
                                </p>
                                <p>With 100% Guarenteed Products</p>
                            </div>

                            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">
                                    Online Shopping
                                </h6>
                                <p>
                                    <Link to='/men' style={{ textDecoration: 'none', padding: '10px', color: 'black' }}>Men</Link>
                                </p>
                                <p>
                                    <Link to='/women' style={{ textDecoration: 'none', padding: '10px', color: 'black' }}>Women</Link>
                                </p>
                                <p>
                                    <Link to='/accesories' style={{ textDecoration: 'none', padding: '10px', color: 'black' }}>Accesories</Link>
                                </p>
                                <p>
                                    <Link to='/beauty' style={{ textDecoration: 'none', padding: '10px', color: 'black' }}>Beauty</Link>
                                </p>
                                <p>
                                    <Link to='/electronics' style={{ textDecoration: 'none', padding: '10px', color: 'black' }}>Electonics</Link>
                                </p>
                            </div>

                            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">
                                    Registered Office Address :
                                </h6>
                                <p>
                                    Buildings Alyssa,
                                    Begonia and Clover situated in Embassy Tech Village,
                                    Outer Ring Road,
                                    Devarabeesanahalli Village,
                                    Varthur Hobli,
                                    Bengaluru – 560103, India

                                </p>
                            </div>
                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                                <p><i className="fas fa-home me-3"></i> India,Hyderabad</p>
                                <p>
                                    <i className="fas fa-envelope me-3"></i>
                                    E-Store@gmail.com
                                </p>
                                <p><i className="fas fa-phone me-3"></i> + 91 84673482643</p>
                                <p><i className="fas fa-print me-3"></i> + 91 78745347593</p>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="text-center p-4" style={{ backgroundColor: 'grey' }}>
                    © 2021 Copyright: <b> E-store.com</b>
                </div>
            </footer>
        </div>
    )
}

export default Footer