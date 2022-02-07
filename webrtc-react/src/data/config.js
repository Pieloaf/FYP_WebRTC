export const videoConstraints = [{
    width: {
        ideal: 1280
    },
    height: {
        ideal: 720
    },
    frameRate: {
        ideal: 30
    }
}, {
    width: {
        ideal: 1920,
    },
    height: {
        ideal: 1080,
    },
    frameRate: 30,
}]

export const iceServers = [{
    'urls': [
        'stun:stun.l.google.com:19302',
        'stun:stun1.l.google.com:19302',
        'stun:stun2.l.google.com:19302',
        'stun:stun.l.google.com:19302?transport=udp'
    ]
}]