import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Countdown.css'

class Countdown extends Component {
  constructor(props) {
    super(props)

    this.state = {
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
    }
  }

  componentDidMount() {
    this.updateCountdown()
    // Update every second
    this.interval = setInterval(this.updateCountdown, 1000)
  }

  componentWillUnmount() {
    this.stop()
  }

  updateCountdown = () => {
    const date = this.calculateCountdown(this.props.date)
    date ? this.setState(date) : this.stop()
  }

  calculateCountdown(targetDate) {
    let diff =
      (Date.parse(new Date(targetDate)) - Date.parse(new Date())) / 1000

    // Clear countdown when date is reached
    if (diff <= 0) return false

    const timeLeft = {
      years: 0,
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
    }

    // Calculate time difference between now and target date
    if (diff >= 365.25 * 86400) {
      // 365.25 * 24 * 60 * 60
      timeLeft.years = Math.floor(diff / (365.25 * 86400))
      diff -= timeLeft.years * 365.25 * 86400
    }
    if (diff >= 86400) {
      // 24 * 60 * 60
      timeLeft.days = Math.floor(diff / 86400)
      diff -= timeLeft.days * 86400
    }
    if (diff >= 3600) {
      // 60 * 60
      timeLeft.hours = Math.floor(diff / 3600)
      diff -= timeLeft.hours * 3600
    }
    if (diff >= 60) {
      timeLeft.min = Math.floor(diff / 60)
      diff -= timeLeft.min * 60
    }
    timeLeft.sec = diff

    return timeLeft
  }

  stop() {
    clearInterval(this.interval)
  }

  addLeadingZeros(value) {
    value = String(value)
    while (value.length < 2) {
      value = '0' + value
    }
    return value
  }

  render() {
    const countDown = this.state

    return (
      <div className={this.props.className}>
        <span className="countdown-col">
          <span className="countdown-col-element">
            <strong className="countdown-col-element-number">
              {this.addLeadingZeros(countDown.days)}
            </strong>
            <span className="countdown-col-element-text">
              {countDown.days <= 1 ? 'day' : 'days'}
            </span>
          </span>
        </span>

        <span className="countdown-col">
          <span className="countdown-col-element">
            <strong className="countdown-col-element-number">
              {this.addLeadingZeros(countDown.hours)}
            </strong>
            <span className="countdown-col-element-text">
              {countDown.hours <= 1 ? 'hour' : 'hours'}
            </span>
          </span>
        </span>

        <span className="countdown-col">
          <span className="countdown-col-element">
            <strong className="countdown-col-element-number">
              {this.addLeadingZeros(countDown.min)}
            </strong>
            <span className="countdown-col-element-text">
              {countDown.min <= 1 ? 'minute' : 'minutes'}
            </span>
          </span>
        </span>

        <span className="countdown-col">
          <span className="countdown-col-element">
            <strong className="countdown-col-element-number">
              {this.addLeadingZeros(countDown.sec)}
            </strong>
            <span className="countdown-col-element-text">
              {countDown.sec <= 1 ? 'second' : 'seconds'}
            </span>
          </span>
        </span>
      </div>
    )
  }
}

Countdown.propTypes = {
  className: PropTypes.string,
  date: PropTypes.string.isRequired,
}

Countdown.defaultProps = {
  date: new Date(),
}

export default Countdown
