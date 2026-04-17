import './styles.css';
import LogoIcon from '../../../assets/logo-icon.svg';

import methodAnalysisImage from '../../../assets/method/analysis.png';

function Footer() {

  return (
    <>
        <div
         className="relative footer-background h-182 md:h-156"
         style={{ clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0 100%)"}}
        >
            <div className="fixed w-full bottom-0 h-182 md:h-156">
                <div className="footer-container">
                    <div className="grid grid-cols-12 gap-4 footer-top">
                        <div className="col-span-12 md:col-span-6">
                            <img src={LogoIcon} alt="logo" className="logo-footer-icon" />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <div className="grid grid-cols-12 md:grid-cols-6 gap-12">
                                <div className="col-span-12 md:col-span-3 footer-links">
                                    <ul>
                                        <li><a href="" className="hover:opacity-100 opacity-30 transition">Works</a></li>
                                        <li><a href="" className="hover:opacity-100 opacity-30 transition">Studio</a></li>
                                        <li><a href="" className="hover:opacity-100 opacity-30 transition">About</a></li>
                                        <li><a href="" className="hover:opacity-100 opacity-30 transition">Team</a></li>
                                    </ul>
                                </div>
                                <div className="col-span-12 md:col-span-3 grid gap-y-4">
                                    <div className="contact-box">
                                        <span className="block opacity-40">Address</span>
                                        <p>25 Broadway, 10th Floor <br />New York, NY 10004</p>
                                    </div>

                                    <div className="contact-box">
                                        <span className="block opacity-40">Contact</span>
                                        <a href="mailto:contact@vertex.com">contact@vertex.com</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-4 footer-middle">
                        <div className="col-span-12 md:col-span-6 social-links">
                            <ul className="flex gap-x-6">
                                <li><a href="" className="hover:opacity-100 opacity-30 transition">Instagram</a></li>
                                <li><a href="" className="hover:opacity-100 opacity-30 transition">LinkedIn</a></li>
                                <li><a href="" className="hover:opacity-100 opacity-30 transition">Youtube</a></li>
                                <li><a href="" className="hover:opacity-100 opacity-30 transition">Twitter</a></li>
                            </ul>
                        </div>
                        <div className="col-span-6">
                            <span className="block opacity-40">@ 2026 VERTEX Studio. inc.</span>
                        </div>
                    </div>  
                    <div className="grid grid-cols-12 footer-bottom">
                        <div className="col-span-9 overflow-hidden">
                            <svg viewBox="0 0 600 113" width="100%">
                                <text x="50%" y="64%" style={{ transform: "translateX(-4px)" }} textAnchor="middle" dominantBaseline="middle" 
                                        fontFamily="'Haas Grot', sans-serif" fontWeight="900" letterSpacing="-0.02em" fontSize="157">
                                    VERTEX
                                </text>
                            </svg>
                        </div>
                        <div className="col-span-3">
                            <img src={methodAnalysisImage} alt="Method Analysis" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Footer;
