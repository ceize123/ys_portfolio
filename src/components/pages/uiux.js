import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import uiuxData from '../uiuxData';
import dot from '../../imgs/dot.png';
import { Contact, WorkTogether } from '../general.js';
import Footer from "../Footer.js";

function SVGStar() {
    return (
        <>
            <div className="star">
                <svg width="24" height="29" viewBox="0 0 24 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0.000782013C9.08258 0.00422383 6.28559 1.16471 4.22263 3.22767C2.15966 5.29063 0.999181 8.08762 0.995739 11.0051C0.992245 13.3892 1.77102 15.7087 3.21261 17.6077C3.21261 17.6077 3.51272 18.0028 3.56174 18.0598L12 28.0117L20.4423 18.0548C20.4864 18.0018 20.7875 17.6077 20.7875 17.6077L20.7885 17.6047C22.2293 15.7065 23.0078 13.3881 23.0043 11.0051C23.0009 8.08762 21.8404 5.29063 19.7775 3.22767C17.7145 1.16471 14.9175 0.00422383 12 0.000782013ZM15.6015 16.007L12 13.7151L8.39864 16.007L8.99887 11.9314L5.9977 9.17737L10.1993 8.67017L12 5.00274L13.9128 8.67117L18.0024 9.17737L15.0012 11.9314L15.6015 16.007Z" fill="#AD8255" />
                </svg>
                <span className="greyLine"></span>
                <span className="primaryLine"></span>
            </div>
        </>
    )
}

function Research(props) {
    const { content } = props;
    
    return (
        <>
        {/* forEach: This iterates over a list and applies some operation with side 
        effects to each list member (example: saving every list item to the database) 
        and does not return anything.

        map: This iterates over a list, transforms each member of that list, and returns 
        another list of the same size with the transformed members (example: transforming 
        list of strings to uppercase). It does not mutate the array on which it is called 
        (although if passed a callback function, it may do so). */}
        {content.map((item, key) => ( // can't use forEach, it can't display properly
            <div className={item.inline === true ? 'row researchSection': 'd-block researchSection'} key={key}>
                <div className={item.inline === true ? 'col-lg-5': 'textSection'}>
                    <h4>{item.title}</h4>
                    {item.paragraph.length === 1 ? 
                        <p>{item.paragraph}</p> :
                        <List content={item.paragraph}/>
                    }
                </div>
                <div className={item.inline === true ? 'col-lg-7 text-center': ''}>
                    <img className="zoomIn" src={item.img} alt={item.title}/>
                </div>
            </div>
        ))}
        </>
    )
}

function List(props) {
    const { content } = props;
    const list = content.map((item, key) => (
        <div className="d-flex align-items-start">
            <img className="dot" src={dot} alt="dot" />
            <li key={key}>{item}</li>
        </div>
    ))

    return (
        <ul>
            {list}
        </ul>
    )
}

function InformationArchitecture(props) {
    const { content } = props;

    return (
        <>
        <div className="textSection">
            <p>{content.paragraph}</p>
        </div>
        <img className="zoomIn" src={content.img} alt="InformationArchitecture" />
        </>
    )
}

function Mockup(props) {
    const { content } = props;

    return (
        <>
           {content.map((item, key) => ( // can't use forEach, it can't display properly
                <div className={item.inline === true ? 'd-flex mockupSection': 'd-block mockupSection'} key={key}>
                    <div className="textSection w-100">
                        <h4>{item.title}</h4>
                        {/* display paragraph only if it exists */}
                        {item.paragraph !== undefined ? item.paragraph.map((paragraphs, idx, ary) => (
                            <>
                                <p className={item.frame !== undefined ? "mobileOverview" : ""}>{paragraphs}</p>
                                { (ary.length > 1) && (idx + 1 !== ary.length) ? <br></br> : ""}
                            </>
                        )) : ""}
                   </div>
                   
                    <div className={item.video !== undefined ? 'd-block videoSection' : 'd-none'}>
                        <img className={item.frame !== undefined ? 'd-inline' : 'd-none'} src={item.frame} alt="frame" />

                        <video className={item.frame !== undefined ? 'mobileVideo' : 'desktopVideo'} autoPlay muted>
                            <source src={item.video} type="video/mp4"/>
                        </video>
                       {item.backgroundColor !== undefined ? <div className={`mockupBgc ${item.backgroundColor}`}></div> : ""} 
                    </div>
                    
                    <div className={item.img !== undefined ? 'd-flex justify-content-center imgSection' : 'd-none'}>
                        <div className={item.inline === false ? 'd-flex flex-column' : ""}>
                           {item.img !== undefined ? item.img.map(imgs => (
                               <img src={imgs} alt={item.title} />)) : ""}
                        </div>
                        {item.backgroundColor !== undefined ? <div className={`mockupBgc ${item.backgroundColor}`}></div> : ""} 
                    </div>
                </div>
            ))}
        </>
    )
}


function Uiux() {
    const { title } = useParams();
    let stepCount = 1;

    const handleScroll = () => {
        
        const star = document.querySelectorAll(".star");
        const spot = document.querySelectorAll(".star path");
        const svg = document.querySelectorAll(".star svg");
        const primaryLine = document.querySelectorAll(".star .primaryLine");
        const videoSection = document.querySelector(".videoSection");
        const video = document.querySelector(".videoSection video");

        let sectionIndex = 0;
        let sectionTop = star[0].getBoundingClientRect().top;
        
        star.forEach((item, idx, ary) => {
            if (idx === 0) {
                if (item.getBoundingClientRect().top <= 330) {
                    primaryLine[idx].style.height = `${window.pageYOffset - 180}px`;
                } else {
                    primaryLine[idx].style.height = '0px';
                }
            } else if (ary.length > idx + 1) {
                if (item.getBoundingClientRect().top <= 330) {
                    primaryLine[idx].style.height = `${Math.abs(330 - item.getBoundingClientRect().top)}px`;
                } else {
                    primaryLine[idx].style.height = '0px';
                }
            }

            if (sectionTop <= 0) {
                sectionTop = item.getBoundingClientRect().top;
                sectionIndex = idx;
            }
        })

        if (sectionTop <= 330) {
            spot[sectionIndex].style.fill = "#AD8255";
            svg[sectionIndex].classList.add("scale");
        } else {
            spot[sectionIndex].style.fill = "#E5E5E5";
            svg[sectionIndex].classList.remove("scale");
        }

        // if (videoSection.getBoundingClientRect().top <= 400) {
        //     video.setAttribute("autoPlay", "")
        //     video.setAttribute("muted", "")
        //     console.log(videoSection.getBoundingClientRect().top)
        // }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <main onScroll={handleScroll}>
            {/* use the result of filter function */}
            {uiuxData.filter(content => content.urlName === title).map((content, key) => (
                <div key={key}>
                    <section className="uiuxTitle">
                        <h2>{content.mainTitle}</h2>
                        <p>{content.description}</p>
                    </section>
                    
                    <section className="stepSection">
                        {content.research !== undefined ?
                            <div className="d-flex">
                                <SVGStar />
                                <article>
                                    <h3>Step {stepCount++}: Research</h3>
                                    <Research content={content.research} />
                                </article>
                            </div> : ""}
                        
                        {content.ppAnalysis !== undefined ?
                            <div className="d-flex">
                                <SVGStar />
                                <article>
                                    <h3>Step {stepCount++}: Pain Point Analysis</h3>
                                    <List content={content.ppAnalysis} />
                                </article>
                            </div> : ""}
                        
                        {content.informationArchitecture !== undefined ?
                            <div className="d-flex">
                                <SVGStar />
                                <article>
                                    <h3>Step {stepCount++}:  Information Architecture</h3>
                                    <InformationArchitecture content={content.informationArchitecture} />
                                </article>
                            </div> : ""}
                        
                        {content.wireframe !== undefined ?
                            <div className="d-flex">
                                <SVGStar />
                                <article>
                                    <h3>Step {stepCount++}: Wireframe</h3>
                                    <img className="zoomIn" src={content.wireframe} alt="wireframe"/>
                                </article>
                            </div> : ""}
                        
                        {content.mockup !== undefined ?
                            <div className="d-flex">
                                <SVGStar />
                                <article>
                                    <h3>Step {stepCount++}: Mockup</h3>
                                    <Mockup content={content.mockup} />
                                </article>
                            </div> : ""}
                        
                        <div className="d-flex">
                            <div className="star">
                                <span>
                                    <svg width="24" height="29" viewBox="0 0 24 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 0.000782013C9.08258 0.00422383 6.28559 1.16471 4.22263 3.22767C2.15966 5.29063 0.999181 8.08762 0.995739 11.0051C0.992245 13.3892 1.77102 15.7087 3.21261 17.6077C3.21261 17.6077 3.51272 18.0028 3.56174 18.0598L12 28.0117L20.4423 18.0548C20.4864 18.0018 20.7875 17.6077 20.7875 17.6077L20.7885 17.6047C22.2293 15.7065 23.0078 13.3881 23.0043 11.0051C23.0009 8.08762 21.8404 5.29063 19.7775 3.22767C17.7145 1.16471 14.9175 0.00422383 12 0.000782013ZM15.6015 16.007L12 13.7151L8.39864 16.007L8.99887 11.9314L5.9977 9.17737L10.1993 8.67017L12 5.00274L13.9128 8.67117L18.0024 9.17737L15.0012 11.9314L15.6015 16.007Z" fill="#AD8255" />
                                    </svg>
                                </span>
                            </div>
                            <WorkTogether />
                        </div>
                    </section>
                </div>
            ))}
            <Contact />
            <Footer />
        </main>
    );
}

export default Uiux;