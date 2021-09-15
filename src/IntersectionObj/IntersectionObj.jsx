import React, { useEffect } from "react";
import video1 from "./v1.mp4";
import video2 from "./v2.mp4";
import video3 from "./v3.mp4";
import video4 from "./v4.mp4";
import "./IntersectionObj.css";

const IntersectionObject = () => {
    const condition = {
        threshold: "0.8",
        root: null
    }
    function cb(entries) {
        entries.forEach((entry) => {
            let child  = entry.target.children[0];
            child.play().then(() => {
                if (entry.isIntersecting == false)
                    child.pause();
            })
        })
    }
    useEffect(() => {
        const objectObserver = new IntersectionObserver(cb, condition);
        let elements = document.querySelectorAll(".video-container");
        elements.forEach((element) => {
            objectObserver.observe(element);
        })
    }, []);


    return (
        <div>
            <h1>
                Intersection Object
            </h1>
            <div className="video-container">
                <Video src={video1} id="a"></Video>
            </div>
            <div className="video-container">
                <Video src={video2} id="b"></Video>
            </div>
            <div className="video-container">
                <Video src={video3} id="c"></Video>
            </div>
            <div className="video-container">
                <Video src={video4} id="d"></Video>
            </div>
        </div>
    );
}

const Video = (props) => {
    return (
        <video className="video-styles" controls muted={true} id={props.id} loop="true">
            <source src={props.src}></source>
        </video>
    )
}

export default IntersectionObject;