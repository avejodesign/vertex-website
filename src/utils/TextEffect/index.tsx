"use client"

import {  useRef} from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);

CustomEase.create("ease-secondary", "0.16, 1, 0.35, 1");

type Props = {
    as?: React.ElementType,
    className?: string,
    stagger?: number,
    duration?: string,
    delay?: string,
    yPercent?: number,
    children?: React.ReactNode,
    typeText?: string,
    scrub?: boolean,
    pin?: boolean,
}

export default function ShuffleText({ 
    className = "",
    as: Container = "div",
    stagger = 0.0425,
    duration = "1",
    delay = "",
    yPercent = 100,
    children,
    typeText = "lines",
    scrub = false,
    pin = false,
    ...props
}: Props) {

    const containerRef = useRef<HTMLDivElement>(null);
    
    useGSAP(() => {
        if(!containerRef.current) return;

    
        const split = new SplitText(containerRef.current, {
            type: typeText, // "lines" | "words" | "chars"
            linesClass: "split-line",
            wordsClass: "split-word",
            charsClass: "split-char",
        });
        const splitTextType = split[typeText as "lines" | "words" | "chars"] as Element[];

        if (typeText === "lines" || typeText === "chars" ) {
            splitTextType.forEach((el) => {
                const inner = document.createElement("div");
                inner.classList.add("split-inner");

                while (el.firstChild) {
                inner.appendChild(el.firstChild);
                }

                el.appendChild(inner);
            });
            gsap.from('.split-inner' , { 
                delay: delay, 
                y: yPercent, 
                ease: "ease-secondary",
                duration: duration,
                stagger: stagger,
                scrollTrigger: { 
                    trigger: splitTextType[0],
                    start: "top bottom",
                    scrub: scrub, 
                    pin: pin,
                } 
            });
        } else {

            gsap.from(splitTextType , { 
                delay: delay, 
                y: yPercent, 
                ease: "ease-secondary",
                duration: duration,
                stagger: stagger,
                scrollTrigger: { 
                    trigger: splitTextType[0],
                    start: "top bottom",
                    scrub: false, 
                } 
            });
        }
        
        // return split.revert();
        
        return () => {
            split.revert();
        };

    }, { scope: containerRef });

    return (
        <Container 
            ref={containerRef}
            className={className}
            {...props}
        >
            {children}
        </Container>
    )
}