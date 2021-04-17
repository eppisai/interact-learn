import React from 'react'
import Iframe from 'react-iframe'


export default function ConvertToPPT() {
        return <Iframe url="https://chalkboard1.herokuapp.com/"
        id="videop"
        allow="camera https://chalkboard1.herokuapp.com/; microphone https://chalkboard1.herokuapp.com/"
        />
}
