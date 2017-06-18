import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { SlideRight, SlideLeft } from "animate-components"

import { updateRoster } from "../actions/roster"
import pointsToRandomValue from "../helpers/points-to-random-value"
import Textarea from "../components/form/textarea.js"
import GenerateRandom from "../components/generate-random"
import { ROSTER_CONFIRM_RESET } from "../constants/confirmations"
import constantDefaults from "../constants/defaults.json"
import HeaderOne from "../components/h1/h1"

import { ANIMATION_SPEED } from "../constants/animation"

import "./stylesheets/roster.scss"

class RosterPage extends Component {
  displayName = "RosterPage"

  state = {
    "male-lowercard": "",
    "male-midcard": "",
    "male-mainevent": "",
    "female-lowercard": "",
    "female-midcard": "",
    "female-mainevent": "",
  }

  componentWillMount() {
    const filterByMinMax = (male = true, min = 0, max = 100) =>
      this.props.roster
        .filter(
          wrestler =>
            wrestler.male === male &&
            wrestler.points >= min &&
            wrestler.points <= max
        )
        .map(wrestler => wrestler.name)
        .join()
    this.setState({
      "male-lowercard": filterByMinMax(true, 30, 60),
      "male-midcard": filterByMinMax(true, 60, 80),
      "male-mainevent": filterByMinMax(true, 80, 100),
      "female-lowercard": filterByMinMax(false, 30, 60),
      "female-midcard": filterByMinMax(false, 60, 80),
      "female-mainevent": filterByMinMax(false, 80, 100),
    })
  }

  render() {
    const { animations, } = this.props
    return (
      <section className="page roster">
        <HeaderOne className="sparkle">
          <span className="hang">🌚 Dream</span> Roster?&nbsp;
          <GenerateRandom onClick={this._generateDefaultRoster} />
        </HeaderOne>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-xs-12 col-lg-6">
              <SlideLeft
                iterations={Number(animations)}
                duration={ANIMATION_SPEED}
              >
                <div className="box male">
                  <i className="icon fa fa-mars" />
                  <Textarea
                    value={this.state["male-mainevent"]}
                    name="male-mainevent"
                    onChange={this.handleChange}
                    label="Mens Main event"
                  />
                  <Textarea
                    value={this.state["male-midcard"]}
                    name="male-midcard"
                    onChange={this.handleChange}
                    label="Mid card"
                  />
                  <Textarea
                    value={this.state["male-lowercard"]}
                    name="male-lowercard"
                    onChange={this.handleChange}
                    label="Lower card"
                  />
                </div>
              </SlideLeft>
            </div>
            <div className="col-xs-12 col-lg-6">
              <SlideRight
                iterations={Number(animations)}
                duration={ANIMATION_SPEED}
              >
                <div className="box female">
                  <i className="icon fa fa-venus" />
                  <Textarea
                    value={this.state["female-mainevent"]}
                    name="female-mainevent"
                    onChange={this.handleChange}
                    label="Womens Main Event"
                  />
                  <Textarea
                    value={this.state["female-midcard"]}
                    name="female-midcard"
                    onChange={this.handleChange}
                    label="Mid card"
                  />
                  <Textarea
                    value={this.state["female-lowercard"]}
                    name="female-lowercard"
                    onChange={this.handleChange}
                    label="Lower card"
                  />
                </div>
              </SlideRight>
            </div>
          </div>
          <div>
            <button type="submit">
              Update the books and get some gold
            </button>
          </div>
        </form>
      </section>
    )
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    let wrestlers = []

    Object.keys(this.state).forEach(stateKey => {
      let stateSplit = stateKey.split("-")
      let male = stateSplit[0] === "male"
      let points = pointsToRandomValue(stateSplit[1])
      let cost = points * 200

      let newWrestlers = this.state[stateKey]
        .split(",")
        .filter(name => name.length > 2)
        .filter(String)
        .map(name => {
          return {
            name,
            male,
            points,
            cost,
          }
        })

      wrestlers = wrestlers.concat(newWrestlers)
    })
    this.props.dispatch(updateRoster(wrestlers))
    this.props.router.push("/champions")
  }

  _generateDefaultRoster = event => {
    event.preventDefault

    if (confirm(ROSTER_CONFIRM_RESET)) {
      this.setState({
        ...constantDefaults.roster,
      })
    }
  }
}

RosterPage.contextTypes = {
  router: PropTypes.object.isRequired,
}

export default connect(state => ({
  animations: state.game.animations,
  federation: state.federation,
  roster: state.roster,
}))(RosterPage)

// Gender icons by Icon Geek; https://thenounproject.com/icongeek/collection/gender/?oq=gender&cidx=0&i=801870
