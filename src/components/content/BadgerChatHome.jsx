import React, {memo} from "react"

function BadgerChatHome()
{
    return <>
        <h1>The GolfToday Mission</h1>
        <p>A project for CS571</p>
        <p>University of Wisconsin - Madison</p>
        <p>Summer 2025</p>
        <ol>
            Inspirations:
            <li>Hotel Tonight: https://www.hoteltonight.com/</li>
            <li>GolfNow: https://www.golfnow.com/</li>
        </ol>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/cWMf4gKaIiM?si=vWmnelGlsaq1ieSM"
                title="YouTube video player" frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen>
        </iframe>
    </>
}

export default memo(BadgerChatHome);
