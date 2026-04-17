"use client";

import { useRef } from 'react';
import './styles.css';
import projectImage01 from '../../../assets/projects/01-image-project.png';
import projectImage02 from '../../../assets/projects/02-image-project.png';
import projectImage03 from '../../../assets/projects/03-image-project.png';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import TextEffect from '../../../utils/TextEffect';
gsap.registerPlugin(ScrollTrigger, SplitText);

interface Slide { 
    title: string;
    local?: string;
    image: string;
}

const slides: Slide[] = [
  {
    title:
      "RESIDENTIAL <br />GLASS",
    local: "COSTEIRA DO SOL, 2045 / LISBOA, PORTUGAL",
    image: projectImage01,
  },
  {
    title:
      "CRYSTAL <br />FOUNTAIN",
    local: "PLAZA DOS ARTS, 12 / BARCELONA, SPAIN",
    image: projectImage02,
  },
  {
    title:
      "URBAN <br />MIRAGE",
    local: "AVENIDA ARCO-ÍRIS, 450 / SÃO PAULO, BRAZIL",
    image: projectImage03,
  },
];

function Projects() {
    const containerRef = useRef(null);
    const sliderRef = useRef<HTMLDivElement | null>(null);
    const sliderImagesRef = useRef<HTMLDivElement | null>(null);
    const sliderTitleRef = useRef<HTMLDivElement | null>(null);
    
    useGSAP(() => { 
        let activeSlide = -1;
        let currentSplit: SplitText | null = null;
        const pinDistance = window.innerHeight * slides.length * 2;

        function hideTitle() {
            if (currentSplit && currentSplit?.lines.length > 0) {
                gsap.to(currentSplit.lines, {
                    yPercent: 100,
                    duration: 0.5,
                    ease: "power2.in",
                    overwrite: true,
                });
            }
        }

        function animateNewSlide(index: number) {
            // console.log("Animating slide:", index);
            if (!sliderImagesRef.current || !sliderTitleRef.current) return;

            const allImages = sliderImagesRef.current.querySelectorAll("img");
            const currentImg = allImages[allImages.length - 1];

            // 2. Se a imagem atual já tem o mesmo SRC da que queremos mostrar, 
            // apenas animamos o título e saímos da função.
            if (currentImg && currentImg.getAttribute('src') === slides[index].image) {
                animateNewTitle(index);
                return;
            }


            const newSliderImage = document.createElement("img");
            newSliderImage.src = slides[index].image;
            newSliderImage.alt = `Slide ${index + 1}`;

            gsap.set(newSliderImage, {
                opacity: 0,
                scale: 1.1,
                filter: "blur(5px)",
            });

            sliderImagesRef.current?.appendChild(newSliderImage);

            gsap.to(newSliderImage, {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            filter: "blur(0px)",
            });

            gsap.to(newSliderImage, {
            scale: 1,
            duration: 2,
            filter: "blur(0px)",
            ease: "power2.out",
            });
            
            if (allImages && allImages.length > 3) {
                const removeCount = allImages.length - 3;
                for (let i = 0; i < removeCount; i++) {
                    sliderImagesRef.current?.removeChild(allImages[i]);
                }
            }

            animateNewTitle(index);
        }
        
        function animateNewTitle(index: number) {
            if (!sliderTitleRef.current) return;

            if (currentSplit) {
                currentSplit.revert();
            }
            
            sliderTitleRef.current.innerHTML = `
                <span>${slides[index].local}</span>
                <h3>${slides[index].title}</h3>
                <a href="#" style="display: flex;">SEE PROJECT <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.375 3.5L12.875 8L8.375 12.5M12.25 8L3.125 8" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="square"/>
</svg>
</a>
            `;
            // sliderTitleRef.current.innerHTML = ``;
            
            currentSplit = new SplitText([
                sliderTitleRef.current.querySelectorAll('span')[0], 
                sliderTitleRef.current.querySelectorAll('h3')[0],
                sliderTitleRef.current.querySelectorAll('a')[0],
            ], {
                type: "lines",
                linesClass: "line",
                mask: "lines",
            });

            gsap.set(currentSplit.lines, {
            yPercent: 100,
            // opacity: 0,
            });

            gsap.to(currentSplit.lines, {
                yPercent: 0,
                // opacity: 1,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
           });

        }

        const gsapTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: `+=${pinDistance}`,
                scrub: 1,
                pin: true,
                
                // markers: true,
                 onUpdate: () => {
                            // Pegamos o tempo atual da timeline em relação ao fim das animações iniciais
                    const startTime = gsapTimeline.labels["slidesStart"];
                    const totalDuration = gsapTimeline.duration();
                    
                    // Se ainda não chegamos no label, mantemos no slide 0
                    if (gsapTimeline.time() < startTime) {
                        if (activeSlide !== -1) {
                            hideTitle();
                            activeSlide = -1;
                            // animateNewSlide(0);
                        }                                        
                        return;
                    }

                    // Calculamos o progresso apenas da parte que sobra da timeline
                    const slideProgress = (gsapTimeline.time() - startTime) / (totalDuration - startTime);
                    const currentSlide = Math.floor(slideProgress * slides.length);

                    if (activeSlide !== currentSlide && currentSlide < slides.length) {
                        activeSlide = currentSlide;
                        animateNewSlide(activeSlide);
                    }
                },
            }
        });

        gsapTimeline.to('.project-box', {
            width: "100vw",
            height: "100vh"
        }).to('.image-mask', {
            "--mask-background": "rgba(0, 0, 0, 0.4)",
        }, "<")
        .to('.span-box', {
            height: "100vh",
        }, "<")
        .to('.span-box', {
            marginLeft: "0",
            padding: "2.125rem 1.125rem",
        }, "<")
        .to('.span-box.last-span-box', {
            marginRight: "0",
        }, "<")
        .to('.span-box span', {
            color: "#fff",
        }, "<")
        .to('.lines-container .line', {
            background: "rgba(255, 255, 255, 0.2)",
        }, "<")
        .to('.span-box-content', {
            opacity: 0,
        }, "<")
        .addLabel("slidesStart")
        .to(".lines-container .line", {
            background: "rgba(0, 0, 0, 0.1)",
        }, ">+=2");
        
        return () => {
            currentSplit?.revert();
            ScrollTrigger.getAll().forEach((st) => st.kill());
        };
        
    }, [sliderRef]);

    return (
    <>
        <div className="relative projects-wrapper">
            <div className="absolute left-0 -top-0 w-full h-px bg-black opacity-10"></div>
            <div className="projects-container">
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-6">
                        <TextEffect as="span" duration="1" className="shuffle-text">
                            [ SELECTED WORKS ] 
                        </TextEffect>
                    </div>
                    <div className="col-span-3">
                        <TextEffect as="span" duration="1.5" className="shuffle-text opacity-30">
                            SCROLL TO VIEW
                        </TextEffect>
                    </div>
                    <div className="col-span-3 flex justify-end">
                        <TextEffect as="span" duration="2" className="shuffle-text">
                            (03)
                        </TextEffect>
                    </div>
                </div>
            </div>
        </div>
        <div className="projects-list" ref={containerRef}>
            <div className="project-box" ref={sliderRef}>
                
                <div className="image-mask relative slider-images" ref={sliderImagesRef}>
                    <img src={slides[0].image} alt="Slide 1" />
                    
                </div>
                <div className="slider-title z-100">
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-6">                            
                        </div>
                        <div className="col-span-5" ref={sliderTitleRef}>
                        </div>
                    </div>
                </div>
                <div className="span-box">
                    <span>[</span>
                    <span className="span-box-content">PROJECTS</span>
                    <span>]</span>
                </div>
                <div className="span-box last-span-box">
                    <span>[</span>
                    <span className="span-box-content">PROJECTS</span>
                    <span>]</span>
                </div>
            </div>
        </div>
    </>
  )
}

export default Projects;

