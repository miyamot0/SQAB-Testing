import React from 'react';
//import { Link } from 'react-router-dom';
//import NavbarLinks from './NavbarLinks';

const linkStyle = {
    color: '#FFF'
};

const Footer = () => {
    return (
        <>
            <div id="privacyModal" className="modal fade" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Privacy</h4>
                        </div>
                        <div className="modal-body">
                            <p>This site uses no cookies and performs no tracking. Various calculators are provided to perform certain analyses, though none of this information is ever saved. Nearly all of the calculations are performed without ever leaving your machine. There is some logging (i.e., diagnostic) performed by the server host, though this information is necessary for regular functioning and is regularly disposed over within the shortest intervals permitted.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            <div id="listservModal" className="modal fade" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Listserv</h4>
                        </div>
                        <div className="modal-body">
                            <p>SQAB maintains an active listserv with over 700 members. Prospective members may access this resource by consulting the following webpage: </p>
                            <a href=" http://groups.yahoo.com/group/Sqab/">http://groups.yahoo.com/group/Sqab/</a>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="page-footer center-on-small-only">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h5 className="title">About the SQAB website</h5>
                            <p>This site is built using Bootstrap Material Design and is hosted on Github Pages. This site, along with all of the assets/code, is available for public inspection at the GitHub account linked below in the repository "SQAB-ABAI.github.io" under a GPL-V3 license.</p>
                        </div>

                        <div className="col-md-6">
                            <h5 className="title">Links</h5>
                            <ul>
                                <li><a style={linkStyle} href="https://v4-alpha.getbootstrap.com/">Twitter bootstrap</a></li>
                                <li><a style={linkStyle} href="http://fezvrasta.github.io/bootstrap-material-design/">Bootstrap Material Design</a></li>
                                <li><a style={linkStyle} href="https://www.github.com/miyamot0">Github Repositories</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="container-fluid social-buttons">
                                <ul >
                                    <li><a target="_blank" href="https://www.facebook.com/Society-for-the-Quantitative-Analyses-of-Behavior-127961307223883/" rel="noopener noreferrer"
                                        className="btn btn-facebook" style={linkStyle}> Facebook</a></li>

                                    <li><a target="_blank" href="https://github.com/SQAB-ABAI" rel="noopener noreferrer"
                                        className="btn btn-github" style={linkStyle}> GitHub</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-trailing">
                    <div className="container-fluid text-center">
                        © Designed by Shawn P. Gilroy, <a href="http://www.smallnstats.com">www.smallnstats.com </a>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;