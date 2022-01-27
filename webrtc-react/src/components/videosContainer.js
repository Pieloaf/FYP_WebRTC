import React from "react";

export class VideoContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        this.props.streams.forEach(stream => {
            stream.mediaElement.removeAttribute("src");
            stream.mediaElement.removeAttribute("srcObject");
            stream.mediaElement.muted = true;
            stream.mediaElement.volume = 0;

        })
    }

    render() {
        return (
            <div className="videos-container" >
                {this.props.streams.map(stream => {
                    return (
                        <video key={stream.streamid} autoPlay playsInline muted={stream.type === "local"}>
                            <source src={stream.stream} />
                        </video>
                    )
                })}
            </div>
        );
    }
}