"use client";

import { useEffect, useRef, useState } from "react";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { CustomEase } from 'gsap/CustomEase';

import "./styles.css";

interface MenuLink {
    path: string;
    label: string;
}

const menuLinks: MenuLink[] = [
  { path: "/", label: "Home" },
  { path: "/work", label: "Work" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
  { path: "/studio", label: "Studio" },
];

import Logo from '../../../assets/logotype.svg';

gsap.registerPlugin(CustomEase);
CustomEase.create("ease-secondary", "0.16, 1, 0.35, 1");


export default function Menu() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const tl = useRef<GSAPTimeline | null>(null);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    useGSAP(() => {
        gsap.set(".menu-link-item-holder", { y: 75 });
        tl.current = gsap
        .timeline({ paused: true })
        .to(".menu-container", {
            zIndex: 2000,
        })
        .to(".menu-overlay", {
            duration: 1.25,
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            ease: "power4.inOut",
        })
        .to(".menu-link-item-holder", {
            y: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power4.out",
            delay: -0.75,
        })

    }, { scope: containerRef });

    useGSAP(() => {

         const timelineMenu = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                scrub: false,
            }      
        });

        timelineMenu.from(".box-button", {
            y: 100,
            duration: 1,
            stagger: 0.1,
            ease: "ease-secondary",              
            delay: 0.5,
        })
        
        return () => {
            tl.current?.kill();
        }
    }, { scope: containerRef });

    useEffect(() => {
        if (isMenuOpen) {
        tl.current?.play();
        } else {
        tl.current?.reverse();
        }
    }, [isMenuOpen]);

    return (
        
        <div className="menu-container" ref={containerRef}>
            {/* menu-bar */}
            <div className="fixed top-0 left-0 w-full z-10">
                <div className="grid grid-cols-12 gap-4 items-center navbar-container ">
                    <div className="col-span-9 navbar-logo overflow-hidden"></div>
                    <div className="col-span-3 content-menu gap-4">
                        <div className="box-button">
                            <div className="button-menu get-contact whitespace-nowrap text-center">
                                <p>CONTACT US</p>
                            </div>
                        </div>
                        <div className="box-button">
                            <div className="button-menu get-menu" onClick={toggleMenu} >
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.33337 6.66675H16.6667M3.33337 13.3334H16.6667" stroke="black" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <p>MENU</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* menu-overlay */}
            <div className={`menu-overlay  ${isMenuOpen ? "open" : ""}`}>
                {/* menu-overlay-bar */}
                {/* <div className="menu-overlay-bar">
                <div className="menu-logo">
                    <a href="/">Codegrid</a>
                </div>
                <div className="menu-close">
                    <p onClick={toggleMenu}>Close</p>
                </div>
                </div> */}

                {/* menu overlay items */}
                {/* <div className="menu-close-icon" onClick={toggleMenu}>
                <p>&#x2715;</p>
                </div> */}
                <div className="menu-copy">
                    <div className="menu-hero">
                        <img src={Logo} alt="" />
                        <div className="menu-close" onClick={toggleMenu}>
                            <p>CLOSE</p>
                        </div>
                    </div>
                    <div className="menu-links">
                        {menuLinks.map((link, index) => (
                        <div key={index} className="menu-link-item">
                            <div className="menu-link-item-holder" onClick={toggleMenu}>
                            <a className="menu-link" href={link.path}>
                                {link.label}
                            </a>
                            </div>
                        </div>
                        ))}
                    </div>
                    <div className="menu-info">
                        {/* <div className="menu-info-col">
                        <a href="#">X &#8599;</a>
                        <a href="#">Instagram &#8599;</a>
                        <a href="#">LinkedIn &#8599;</a>
                        <a href="#">Behance &#8599;</a>
                        <a href="#">Dribbble &#8599;</a>
                        </div> */}
                        <div className="menu-info-col">
                        <p>info@vertex.com</p>
                        <p>+245 9412 382</p>
                        </div>
                    </div>
                </div>
                {/* <div className="menu-preview">
                <p>View ShowReel</p>
                </div> */}
            </div>
            </div>
    );
}