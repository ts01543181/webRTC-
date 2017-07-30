navigator.webkitGetUserMedia({video: true, audio: true}, (stream) => {
    const Peer = require('simple-peer')

    let peer = new Peer({
        initiator: location.hash === '#init',
        trickle: false,
        stream:stream
    })

    peer.on('signal', (data) => {
        document.getElementById('yourId').value = JSON.stringify(data)
    })

    document.getElementById('connect').addEventListener('click', () => {
        let otherId = JSON.parse(document.getElementById('otherId').value)
        peer.signal(otherId)
    })

    document.getElementById('send').addEventListener('click', () => {
        let yourMessage = document.getElementById('yourMessage').value
        peer.send(yourMessage)
    })


    peer.on('data', (data) => {
        document.getElementById('messages').textContent += data + '\n'
    })

    peer.on('stream', (stream) => {
        let video = document.createElement('video')
        document.body.appendChild(video)

        video.src = window.URL.createObjectURL(stream)
        video.play()
    })
}, (err) => {
    console.error(err)
})

