"use client";

import './styles.css';
import Logo from '../../../assets/logotype.svg';
import LogoIcon from '../../../assets/logo-icon.svg';
import HeroImage from '../../../assets/hero-image-quartenary.png';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import TextEffect from '../../../utils/TextEffect';
gsap.registerPlugin(ScrollTrigger, CustomEase, SplitText);
CustomEase.create("ease-secondary", "0.16, 1, 0.35, 1");

function Hero() {
  
  const containerNavbarRef = useRef<HTMLDivElement>(null!);
  const containerRef = useRef<HTMLDivElement>(null!);
  const boxHeroImageRef = useRef<HTMLDivElement>(null!);
  

  useGSAP(() => {
    const splitText = new SplitText(".subtitle-material", { type: "chars", linesClass: "split-line", charsClass: "split-char", });

    const lineElements = splitText.chars as Element[];
    lineElements.forEach((el) => {
        const inner = document.createElement("div");
        inner.classList.add("split-inner-subtitle");

        while (el.firstChild) {
        inner.appendChild(el.firstChild);
        }

        el.appendChild(inner);
    });

    const media = gsap.matchMedia();

    media.add("(min-width: 768px)", () => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1000",
          pin: true,
          scrub: 2,
          anticipatePin: 1,
        }
      });



      timeline.from(boxHeroImageRef.current, {
        position: "absolute",
        left: "50%",
        width: "25%",
        height: "32rem",
        top: "4rem",
        duration: 1,
        // ease: "power4.inOut", 
      })
      
      .from(".box-hero-image",{
        margin: "0 0.75rem",
      }, "<").from('.box-hero-image img', {
        // position: "absolute",
        filter: "brightness(1)",
        
        padding: "2rem 0",
        marginRight: "0",
        color: "black",
      }, "<").from('.box-hero-image span:first-child', {
        padding: 0,
        // paddingBottom: "-4.125rem",
        color: "black",
      }, "<").from('.box-hero-image span:last-child', {
        padding: 0,
        // paddingBottom: "2.125rem",
        color: "black",
      }, "<").from(".split-inner-subtitle", {
        y: 400,             // O valor de yPercent que você usou
        duration: 1,        // No scrub, isso define a velocidade relativa ao scroll
        stagger: 0.02,       // Delay entre cada caractere/linha
        skewY: 8,          // Adiciona um efeito de skew para um visual mais dinâmico
        force3D: true,
        ease: "ease-secondary"  // Um ease mais limpo para scroll
      }, ">");
    })

    return () => {
      splitText.revert();
      media.kill();
    }
    
  }, { scope: containerRef });
      
  useGSAP(() => {

    const timelineNavbar = gsap.timeline({
      scrollTrigger: {
        trigger: containerNavbarRef.current,
        start: "top bottom",
        scrub: false,
      }      
    });

    timelineNavbar.from(boxHeroImageRef.current, {
      duration: 0.7,
      y: 2000,
      ease: "ease-secondary",
    })
    .from(".navbar-logo img", {
      duration: 0.7,
      y: 200,
      ease: "ease-secondary",
    },"<+=0.1")
    .from(".box-logo-content img", {
      duration: 0.7,
      y: 200,
      ease: "ease-secondary",
    },"<+=0.1")
    .from(".content-span p", {
      duration: 0.7,
      y: 200,
      ease: "ease-secondary",
    },"<+=0.1")
    .from(".box-button", {
      duration: 0.7,
      y: 100,
      ease: "ease-secondary",
      stagger: 0.1,
    },"<+=0.2");

  }, { scope: containerNavbarRef });

  return (
    <>
        <div className="grid grid-cols-12 gap-4 items-center navbar-container" ref={containerNavbarRef}>
          <div className="col-span-3 md:col-span-2 navbar-logo  overflow-hidden">
            <img src={Logo} />
          </div>
          <div className="col-span-8 content-span overflow-hidden">
            <p className="font-normal uppercase">[ Founded IN 2026 Brazil/SP ]</p>
          </div>

          <div className="col-span-2 hidden md:block overflow-hidden">

          </div>
        </div>
        <div className="hero-container">
            <TextEffect as="h1" duration="1" yPercent={400} className="shuffle-text whitespace-nowrap overflow-hidden" typeText="chars">
                    PURE MATTER
            </TextEffect>
        </div>
        
        <div className="grid grid-cols-12 relative md:h-screen bottom-hero-content" ref={containerRef}>
          <div className="col-span-12 md:col-span-6 flex items-start gap-4 text-content">
            <div className="box-logo-content overflow-hidden">
              <img src={LogoIcon} alt="" />
            </div>
            <TextEffect as="p" duration="1" className="shuffle-text" typeText="lines">
                  We reduce architecture to its primary <br/> force. Concrete, steel, and light. We design <br/> structures that refuse ornament in favor of <br/> pure spatial utility
            </TextEffect>
          </div>

          <div className="col-span-12 container-hero-image">
            <div className="box-hero-image" ref={boxHeroImageRef}>
              <span className=" font-normal uppercase flex justify-between">
                  <div>[</div>
                  <div>Structural architecture. SP/BR</div>
                  <div>]</div>
              </span>
              <div className="box-content-material">
                <div className="content-material">
                  <h2 className="subtitle-material">THE TRUTH</h2>
                  <div className="description-material opacity-0">
                    <svg width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 0L-1.55641e-06 35.6066L14.8655 35.6066L-7.78206e-07 17.8033L14.8655 6.49791e-07L0 0Z" fill="white"/>
                      <path d="M36.39 35.6064L36.39 -0.000125885L21.5245 -0.000126535L36.39 17.8032L21.5245 35.6064L36.39 35.6064Z" fill="white"/>
                    </svg>
                    
                    <p>A HUGE PHOTO OF <br /> A CONCRETE</p>
                  </div>
                </div>
                <div className="content-material">
                  <p className="opacity-0">MANIFESTO</p>
                  <h2 className="subtitle-material">OF MATERIALS</h2>
                </div>
              </div>
              <img src={HeroImage} className="box-img" alt="" />
              <span className=" font-normal uppercase flex justify-between">
                  <div>[</div>
                  <div>Structural architecture. SP/BR</div>
                  <div>]</div>
              </span>
            </div>
          </div>
        </div>
    </>
  )
}

export default Hero;

