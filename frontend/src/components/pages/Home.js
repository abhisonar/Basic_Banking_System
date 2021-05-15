import React, { Component } from 'react'
import HeroSection from '../HeroSection'
import Services from '../Services'

export class Home extends Component {
    render() {
        return (
            <div>
                <HeroSection />
                <Services/>
            </div>
        )
    }
}

export default Home
