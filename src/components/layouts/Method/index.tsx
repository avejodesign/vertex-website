import { useRef } from 'react';
import './styles.css';
import methodAnalysisImage from '../../../assets/method/analysis.png';
import methodReductionImage from '../../../assets/method/reduction.png';
import methodMaterialImage from '../../../assets/method/material.png';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

function Method() {

    const containerRef = useRef(null);
    gsap.registerPlugin(ScrollTrigger);

    useGSAP(() => {
        const items = gsap.utils.toArray('.method-item') as HTMLElement[];

        items.forEach((item) => {
            const img = item.querySelector('img');
            const methodContent = item.querySelector('.method-content');
            gsap.to(img,
                {
                    width: "100%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 50%", 
                        end: "bottom 60%", 
                        scrub: 1.5,
                        invalidateOnRefresh: true,
                    }
                }
            )
            
            gsap.to(methodContent, {
                width: "100%",
                ease: "none",
                scrollTrigger: {
                    trigger: item,
                    start: "top 50%", 
                    end: "bottom 60%", 
                    scrub: 1.5,
                }
            });
            
        })
    }, [ containerRef]);

  return (
    <>
        <div className="method-container" ref={containerRef}>
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-6">
                    <h2>STRICT METHOD</h2>
                </div>
                <div className="col-span-12 md:col-span-6">
                    <div className="flex justify-between subtitle">
                        <p className="opacity-30">OUS PROCESS</p>
                        <span>(03)</span>
                    </div>
                    <div className="method-list">
                        <div className="method-item">
                            <img src={methodAnalysisImage} alt="" />
                                <div className="grid grid-cols-6 method-content">
                                    <div className="col-span-3">
                                        <h3>(ANALYSIS)</h3>
                                    </div>
                                    <div className="col-span-3">
                                        <p>We dismantle the brief to its bare bones. <br /> Every constraint is an opportunity for <br /> structural honesty.</p>
                                    </div>
                                </div> 
                        </div>
                        <div className="method-item">
                            <img src={methodReductionImage} alt="" />
                                <div className="grid grid-cols-6 method-content">
                                    <div className="col-span-3">
                                        <h3>(REDUCTION)</h3>
                                    </div>
                                    <div className="col-span-3">
                                        <p>Design is subtraction. We remove every<br /> element that doesn't serve the stability <br /> or the light of the space.</p>
                                    </div>
                                </div> 
                        </div>
                        <div className="method-item">
                            <img src={methodMaterialImage} alt="" />
                                <div className="grid grid-cols-6 method-content">
                                    <div className="col-span-3">
                                        <h3>(MATERIAL)</h3>
                                    </div>
                                    <div className="col-span-3">
                                        <p>The final act. Converting abstract<br /> geometry into heavy, permanent matter. <br />Built to endure generations.</p>
                                    </div>
                                </div> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Method;
