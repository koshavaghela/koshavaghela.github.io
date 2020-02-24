import React, { Component } from 'react'
import FormsSection from './components/FormsSection'
import Header from './components/Header'
import ImageSection from './components/ImageSection'
import MapSection from './components/MapSection'
import Modal from './components/Modal'
import Navbar from './components/Navbar'
import Section from './components/Section'
import Timeline from './components/Timeline'
import content from './content.json'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoggedIn: true,
    }
  }

  checkSecretCode = value => {
    if (value === process.env.REACT_APP_SECRET_CODE) {
      this.setState({
        isLoggedIn: true,
      })
      window.gtag('event', 'login')
    }
  }

  isFuture = date => new Date(date) > new Date()

  render() {
    const { isLoggedIn } = this.state

    return (
      <div className="app">
        {isLoggedIn && (
          <Navbar
            items={[
              'ourStory',
              'info',
              'map',
              'miscInfo',
              'rsvp',
              'imageUpload',
            ]
              .filter(item => {
                const startDate = content[item].startDate
                const endDate = content[item].endDate
                return !(
                  (startDate && this.isFuture(startDate)) ||
                  (endDate && !this.isFuture(endDate))
                )
              })
              .map(item => ({
                id: content[item].id,
                title: content[item].title,
              }))}
          />
        )}
        <Header
          {...content.header}
          scrollTo={content.ourStory.id}
          isLoggedIn={isLoggedIn}
          onInputChange={this.checkSecretCode}
        />
        {isLoggedIn && (
          <div className="app-content">
            <Section
              {...content.ourStory}
            />
            <ImageSection 
              id={content.imageSep.id}
              image={content.imageSep.image} />
            <Section {...content.info}
              childComponent={<Timeline items={content.timeline} />}
            />
            <ImageSection 
              id={content.imageSepOne.id}
              image={content.imageSepOne.image} />
            <Section {...content.location} />
            <MapSection
              center={content.map.center}
              zoom={9}
              locations={content.map.locations}
              id={content.map.id}
            />
            <ImageSection 
              id={content.imageSepTwo.id}
              image={content.imageSepTwo.image} />
            <Section
              title={content.miscInfo.title}
              text={content.miscInfo.text}
              id={content.miscInfo.id}
              childComponent={
                <Modal
                  buttonText={content.miscInfo.modalButton}
                  title={content.miscInfo.modalTitle}
                  text={content.miscInfo.modalText}
                />
              }
            />
            {this.isFuture(content.rsvp.endDate) && (
              <FormsSection {...content.rsvp} />
            )}
            {!this.isFuture(content.imageUpload.startDate) && (
              <FormsSection {...content.imageUpload} newWindow />
            )}
            <Section {...content.footer} />
          </div>
        )}
      </div>
    )
  }
}

export default App
