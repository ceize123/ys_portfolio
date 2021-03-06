import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import uiuxData from '../uiuxData';
import dot from '../../imgs/dot.png';
import magnifier from '../../imgs/work/uiux/magnify.png';
import { Contact, WorkTogether, PageLoading } from '../general.js';
import Footer from "../Footer.js";
import { Modal } from "react-bootstrap";

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

function ModalDisplay(props) {
    const { content } = props;
    const [lgShow, setLgShow] = useState(false);

    return (
    <>
    <div className="d-md-none d-block">
        <img
            onClick={() => setLgShow(true)}
            className="magnifier"
            src={magnifier} alt="magnifier" />
    </div>      
    <img className="zoomIn"
        onClick={() => setLgShow(true)}
        src={content.img} alt={content} />      
    <Modal size="xl"        
        show={lgShow}
        fullscreen="md-down"
        onHide={() => setLgShow(false)}
        aria-labelledby="modal-sizes-lg"
    >
    <Modal.Header closeButton></Modal.Header>
    <Modal.Body className="modal-body">
        <img className="mx-auto d-block" src={content.img} alt="modal_image" />
    </Modal.Body>
    </Modal>
    </>
    );
}

function Overview(props) {
    const { content } = props;
    
    return (
        <div className="overviewPanel">
            <div className="row gx-0">
                <h3 className="offset-1">Project Overview</h3>
                <div className="offset-1 col-md-7 col-10">
                    <h5 className="mb-2">Challenges</h5>
                    <p className="mb-4">{content.challenges}</p>
                    <h5 className="mb-2">Objectives</h5>
                    <List content={content.objectives}/>
                </div>
                <div className="offset-1 col-md-3 col-10">
                    <div className="d-flex d-md-block align-items-center overviewRight justify-content-between">
                        <h5 className="mb-md-2 mb-1">Project Scope</h5>
                        <p className="mb-md-3">{content.scope}</p>
                    </div>
                    <div className="d-flex d-md-block align-items-center overviewRight justify-content-between">
                        <h5 className="mb-md-2 mb-1">Tool</h5>
                        <p className="mb-md-3">{content.tool}</p>
                    </div>
                    <div className="d-flex d-md-block align-items-center overviewRight justify-content-between">
                        <h5 className="mb-md-2 mb-1">Role</h5>
                        <p className="mb-md-3">{content.role}</p>
                    </div>
                    <div className="d-flex d-md-block align-items-center overviewRight justify-content-between">
                        <h5 className="mb-md-2 mb-1">Team</h5>
                        <p className="mb-md-3">{content.team}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ArticleWithImg(props) {
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
            <div className='d-block textSection' key={key}>
                <div className="mb-4">
                    <h4>{item.title}</h4>
                    {item.content ? item.title !== "Mockup" ?
                        <List2 content={item.content} /> :
                        <Mockup content={item.content} />
                    : item.paragraph.length === 1 ? 
                            <p>{item.paragraph}</p> : 
                            item.bullet === undefined ? 
                                <List content={item.paragraph} /> :
                                item.paragraph.map((paragraphs, idx, ary) => (
                                <>
                                    <p>{paragraphs}</p>
                                    {idx + 1!== ary.length ? <br></br> : ""}    
                                    
                                </>))
                        }
                    
                </div>
                {item.img ?
                    <div className='imgSection'>
                        <ModalDisplay content={item}/>
                    </div> : <div></div>
                }
            </div>
        ))}
        </>
    )
}

function List(props) {
    const { content } = props;
    const list = content.map((item, key) => (
        <div className="d-flex align-items-start" key={key}>
            <img className="dot" src={dot} alt="dot" />
            <li>{item}</li>
        </div>
    ))

    return (
        <ul>
            {list}
        </ul>
    )
}

function List2(props) {
    const { content } = props;
    const list = content.map((item, key) => (
        <div className="listSection" key={key}>
            <p className="listTitle">{item.title}</p>
            {
                item.paragraph.map((par, key) => (
                    <div className="d-flex align-items-start" key={key}>
                        <li>{par}</li>
                    </div>
                ))
            }
            {item.img ?
                <div className='imgSection d-flex justify-content-center'>
                    <ModalDisplay content={item}/>
                </div> : <div></div>
            }
        </div>
    ))

    return (
        <ul className="textSection">
            {list}
        </ul>
    )
}

function Mockup(props) {
    const { content } = props;

    // detect size
    const [windowWidth, setwindowWidth] = useState(window.innerWidth)
    const handleResize = () => {
        setwindowWidth(window.innerWidth)
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
        window.addEventListener('resize', handleResize);
        }
    }, [])

    const [showVideo, setShowVideo] = useState(false);
    const showVideoEvent = () => {
        if (windowWidth >= 1200) {
            let videoSec = document.querySelectorAll('.videoSection');
            let ary = [];
            for (let i = 0; i < videoSec.length; i++) {
                ary.push(videoSec[i].getBoundingClientRect().top - window.screen.height);
            }
            if (ary[0] < 0) {
                setShowVideo(true);
            } else {
                setShowVideo(false);
            }
            
        } else {
            setShowVideo(true);
        }
    };

    
    useEffect(() => {
            window.addEventListener("scroll", showVideoEvent);
        return () => {
            window.addEventListener("scroll", showVideoEvent);
        };
    }, [showVideoEvent]);

    return (
        <>
           {content.map((item, key) => ( // can't use forEach, it can't display properly
               <div className={item.inline === true ?
                   'd-lg-flex justify-content-between d-block mockupSection' :
                   'd-block mockupSection'} key={key}
               >
                    <div className="textSection">
                        <h4>{item.title}</h4>
                        {/* display paragraph only if it exists */}
                        {item.paragraph !== undefined ? item.paragraph.map((paragraphs, idx, ary) => (
                            <>
                                <p className={item.frame !== undefined ? "mobileOverview" : ""}>{paragraphs}</p>
                                { (ary.length > 1) && (idx + 1 !== ary.length) ? <br></br> : ""}
                            </>
                        )) : ""}
                   </div>
                   {/* video block */}
                   <div className={item.video !== undefined ? 'd-block videoSection text-center' : 'd-none'}>
                       <img className={item.frame !== undefined ? 'd-inline frame' : 'd-none'} src={item.frame} alt="frame" />
                       {showVideo ?
                           <video
                                className={item.frame !== undefined ? 'mobileVideo frame' : 'desktopVideo'}
                                autoPlay={windowWidth >= 1200 ? true : false}
                                controls={windowWidth >= 1200 ? false : true}
                                muted loop poster={item.poster}>
                                <source src={item.video} type="video/mp4"/>
                           </video> :
                           <div className={item.frame !== undefined ? 'mobileVideo frame' : 'desktopVideo'}></div> }   
                        {item.backgroundColor !== undefined ?
                            <div className={`d-none d-lg-block mockupBgc ${item.backgroundColor}`}></div> : 
                            ""} 
                    </div>
                    {/* img block */}
                    <div className={item.img !== undefined ? 'd-flex justify-content-center imgSection' : 'd-none'}>
                        <div className={item.inline === false ? 'd-flex flex-column' : "d-flex flex-column flex-xl-row align-items-end"}>
                           {item.img !== undefined ? item.img.map(imgs => (
                               <img className={item.inline === false ? "desktopImg": "mobileImg"}src={imgs} alt={item.title} />)) : ""}
                        </div>
                        {item.backgroundColor !== undefined ? <div className={`mockupBgc ${item.backgroundColor}`}></div> : ""} 
                    </div>
                </div>
            ))}
        </>
    )
}

function PrototypeAndTest(props) {
    const { content } = props;

    // detect size
    const [windowWidth, setwindowWidth] = useState(window.innerWidth)
    const handleResize = () => {
        setwindowWidth(window.innerWidth)
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
        window.addEventListener('resize', handleResize);
        }
    }, [])

    const [showVideo, setShowVideo] = useState(false);
    const showVideoEvent = () => {
        if (windowWidth >= 1200) {
            let videoSec = document.querySelectorAll('.videoSection');
            let ary = [];
            for (let i = 0; i < videoSec.length; i++) {
                ary.push(videoSec[i].getBoundingClientRect().top - window.screen.height);
            }
            if (ary[0] < 0) {
                setShowVideo(true);
            } else {
                setShowVideo(false);
            }
            
        } else {
            setShowVideo(true);
        }
    };

    useEffect(() => {
            window.addEventListener("scroll", showVideoEvent);
        return () => {
            window.addEventListener("scroll", showVideoEvent);
        };
    }, [showVideoEvent]);
    
    return (
        <>
            {content.map((item, key) => ( // can't use forEach, it can't display properly
            <div className='d-block textSection prototype' key={key}>
                <div className="mb-4">
                    <h4>{item.title}</h4>
                    {item.content !== undefined ? <List2 content={item.content} /> : ""}
                </div>
                <div className={item.video !== undefined ? 'd-block videoSection text-center' : 'd-none'}>
                    {showVideo ?
                        <video
                            className={item.mobile === true ? 'mobileVideo' : 'desktopVideo'}
                            autoPlay={windowWidth >= 1200 ? true : false}
                            controls={windowWidth >= 1200 ? false : true}
                            muted loop poster={item.poster}>
                            <source src={item.video} type="video/mp4"/>
                        </video> : ""} 
                </div>
            </div>
        ))}
        </>
    )
}

function Uiux() {
    const { title } = useParams();
    let stepCount = 1;
    let sectionIndex = 0;
    
    const handleScroll = () => {
        
        const star = document.querySelectorAll(".star");
        const spot = document.querySelectorAll(".star path");
        const svg = document.querySelectorAll(".star svg");
        const primaryLine = document.querySelectorAll(".star .primaryLine");
        
        star.forEach((item, idx, ary) => {
            if (ary.length > idx + 1) {
                // if (item.getBoundingClientRect().top <= 330)
                if (item.getBoundingClientRect().top <= 300) {
                    primaryLine[idx].style.height = `${Math.abs(300 - item.getBoundingClientRect().top)}px`;
                    spot[sectionIndex].style.fill = "#AD8255";
                    svg[sectionIndex].classList.add("scale");
                } else {
                    primaryLine[idx].style.height = '0px';
                }
            }

            // handle stars
            // if (item.getBoundingClientRect().top <= 270)
            if (item.getBoundingClientRect().top <= 300) {
                sectionIndex = idx
            }
            if (sectionIndex + 1 === star.length) {
                if (star[sectionIndex].getBoundingClientRect().top >= 300) {
                    spot[sectionIndex].style.fill = "#E5E5E5";
                    svg[sectionIndex].classList.remove("scale");
                }
            } else if (sectionIndex > 0 && sectionIndex < star.length) {
                if (star[sectionIndex + 1].getBoundingClientRect().top >= 300) {
                    spot[sectionIndex + 1].style.fill = "#E5E5E5";
                    svg[sectionIndex + 1].classList.remove("scale");
                }
            } else if (sectionIndex === 0){
                //for first star
                if (star[sectionIndex].getBoundingClientRect().top >= 300) {
                    spot[sectionIndex].style.fill = "#E5E5E5";
                    svg[sectionIndex].classList.remove("scale");
                    //for second star
                } else if (star[sectionIndex + 1].getBoundingClientRect().top >= 300) {
                    spot[sectionIndex + 1].style.fill = "#E5E5E5";
                    svg[sectionIndex + 1].classList.remove("scale");
                }
            }
            
        })
    };


    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [handleScroll]);

    return (
        <main>
            {/* use the result of filter function */}
            {uiuxData.filter(content => content.urlName === title).map((content, key) => (
                <div key={key}>
                    <PageLoading title="UI/UX Design" subtitle={content.mainTitle} />
                    <section className="uiuxBanner">
                        <img src={content.banner} alt={content.mainTitle}/>
                    </section>

                    <section className="overview">
                        <Overview content={content.overview} />
                    </section>
                    
                    <section className="stepSection">
                        {content.research !== undefined ?
                            <div className="d-flex">
                                <SVGStar />
                                <article>
                                    <h3>Step {stepCount++}: Research</h3>
                                    <ArticleWithImg content={content.research} />
                                </article>
                            </div> : ""}
                        
                        {content.define !== undefined ?
                            <div className="d-flex">
                                <SVGStar />
                                <article>
                                    <h3>Step {stepCount++}: Define</h3>
                                    <List content={content.define} />
                                </article>
                            </div> : ""}
                        
                        {content.ideate !== undefined ?
                            <div className="d-flex">
                                <SVGStar />
                                <article>
                                    <h3>Step {stepCount++}:  Ideate</h3>
                                    <ArticleWithImg content={content.ideate} />
                                </article>
                            </div> : ""}
                        
                        {content.prototypeAndTest !== undefined ?
                            <div className="d-flex">
                                <SVGStar />
                                <article>
                                    <h3>Step {stepCount++}: Prototype and Test</h3>
                                    <PrototypeAndTest content={content.prototypeAndTest} />
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
            <Footer/>
        </main>
    );
}

export default Uiux;