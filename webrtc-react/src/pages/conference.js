import React from "react";
import { Toolbar } from "../components/toolbar";
import { VideoContainer } from "../components/videosContainer";
import { videoConstraints } from "../data/config";


export class Conference extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resolution: 0,
            isMicOn: true,
            isCamOn: true,
            streams: [],
        };
        this.connection = new window.RTCMultiConnection();
    }

    componentDidMount() {
        this.connection = {
            ...this.state.connection,
            socketURL: "/",
            socketMessageEvent: "webrtc-react-app",
            mediaConstraints: {
                video: videoConstraints[this.state.resolution],
                audio: true,
            },
            session: {
                audio: this.state.isMicOn,
                video: this.state.isCamOn,
            },
            onstream: (event) => {
                this.setState({
                    streams: [...this.state.streams, event],
                })
            }

        }

    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.resolution !== prevState.resolution) {
            this.connection.mediaConstraints.video = videoConstraints[this.state.resolution];

        }

        if (this.state.connection.session !== prevState.connection.session) {
            this.connection.session = {
                audio: this.state.isMicOn,
                video: this.state.isCamOn,
            };
        }
    }



    // stuff = () => {

    //     connection.sdpConstraints.mandatory = {
    //         OfferToReceiveAudio: true,
    //         OfferToReceiveVideo: true,
    //     };


    //     connection.mediaConstraints = {
    //         video: videoConstraints[this.state.resolution],
    //         audio: true,
    //     };

    //     var bitrates = 512;
    //     var CodecsHandler = connection.CodecsHandler;

    //     connection.processSdp = function (sdp) {
    //         var codecs = "vp9";

    //         if (codecs.length) {
    //             sdp = CodecsHandler.preferCodec(sdp, codecs.toLowerCase());
    //         }

    //         if (resolutions === "HD") {
    //             sdp = CodecsHandler.setApplicationSpecificBandwidth(sdp, {
    //                 audio: 128,
    //                 video: bitrates,
    //                 screen: bitrates,
    //             });

    //             sdp = CodecsHandler.setVideoBitrates(sdp, {
    //                 min: bitrates * 8 * 1024,
    //                 max: bitrates * 8 * 1024,
    //             });
    //         }

    //         if (resolutions === "Ultra-HD") {
    //             sdp = CodecsHandler.setApplicationSpecificBandwidth(sdp, {
    //                 audio: 128,
    //                 video: bitrates,
    //                 screen: bitrates,
    //             });

    //             sdp = CodecsHandler.setVideoBitrates(sdp, {
    //                 min: bitrates * 8 * 1024,
    //                 max: bitrates * 8 * 1024,
    //             });
    //         }

    //         return sdp;
    //     };
    //     // https://www.rtcmulticonnection.org/docs/iceServers/
    //     // use your own TURN-server here!
    //     connection.iceServers = [
    //         {
    //             urls: [
    //                 "stun:stun.l.google.com:19302",
    //                 "stun:stun1.l.google.com:19302",
    //                 "stun:stun2.l.google.com:19302",
    //                 "stun:stun.l.google.com:19302?transport=udp",
    //             ],
    //         },
    //     ];
    // }

    //get roomID from param props

    // start conference button
    render() {
        return (
            <div>
                <h1>Conference </h1>
                <VideoContainer streams={this.state.streams} />
                <Toolbar />
            </div >
        );
    }
}
