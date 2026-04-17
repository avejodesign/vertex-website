import './styles.css';
import AboutImage from '../../../assets/about-image.png';
import TextEffect from '../../../utils/TextEffect';

function About() {

  return (
    <>
        
        <div className="about-container">
            <div className="flex md:grid grid-cols-12 gap-4 flex-col-reverse md:flex-col">
                <div className="col-span-12 md:col-span-8">
                    <TextEffect as="h2" yPercent={400} duration="1" stagger={0.2} className="shuffle-text" typeText="lines">
                        ESTABLISHED<br /> 2018. 
                    </TextEffect>
                    <div className="grid grid-cols-12 md:grid-cols-6 gap-4">
                        <div className=" md:col-span-2 hidden md:block"></div>
                        <div className="col-span-12 md:col-span-2">
                            <TextEffect as="p" duration="1" className="shuffle-text">
                                    We believe that architecture is the art of subtraction. By stripping away the superficial, we expose the structural truth of every building, allowing raw materials like concrete and steel to speak for themselves. 
                                <br />
                                <br />
                                Every project is a study of permanence and weight. We don't just build spaces; we create monoliths that stand as a direct response to the landscape, defined by rigid geometry and an uncompromising commitment to function.
                            </TextEffect>
                            <p>
                                
                            </p>
                            <a href="">LEARN MORE</a>
                        </div>
                    </div>
                </div>
                <div className="col-span-4">
                    <img src={AboutImage} alt="" />
                </div>
            </div>
            <div className="grid grid-cols-12 gap-4 based-brazil ">
                <div className="col-span-12">
                    <TextEffect as="h2" yPercent={400} duration="1" stagger={0.2} className="shuffle-text" typeText="lines">
                        BASED IN BRAZIL.
                    </TextEffect>
                </div>
            </div>
        </div>
    </>
  )
}

export default About;
