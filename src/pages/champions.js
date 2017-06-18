import { connect } from "react-redux"
import PropTypes from "prop-types"
import React, { Component } from "react"
import { SlideRight, SlideLeft } from "animate-components"

import { CHAMPIONSHIP_RESET_CONFIRM } from "../constants/confirmations"
import { ANIMATION_SPEED } from "../constants/animation"

import { updateChampions } from "../actions/champions"
import GenerateRandom from "../components/generate-random"
import Textarea from "../components/form/textarea.js"
import constantDefaults from "../constants/defaults.json"
import HeaderOne from "../components/h1/h1"

import "./stylesheets/champions.scss"

class ChampionsPage extends Component {
  displayName = "ChampionsPage"

  state = {
    male: "",
    female: "",
  }

  componentDidMount() {
    if (this.props.roster.length === 0) {
      this.props.router.push("/roster")
    }
  }

  componentWillMount() {
    this.setState({
      male: this.props.championships
        .filter(champion => champion.male)
        .map(champion => champion.name)
        .join(", "),
      female: this.props.championships
        .filter(champion => !champion.male)
        .map(champion => champion.name)
        .join(", "),
    })
  }

  render() {
    const { animations, } = this.props
    return (
      <section className="page champions">
        <HeaderOne>
          What
          <span className="gold"> gold </span>
          do you have?!
          &nbsp;
          <GenerateRandom onClick={this._generateDefaultChampions} />
        </HeaderOne>
        <form onSubmit={this.handleSubmit}>
          <div className="row top-xs">
            <div className="col-xs-12 col-lg-6">
              <SlideLeft
                iterations={Number(animations)}
                duration={ANIMATION_SPEED}
              >
                <div className="box male">
                  <i className="icon fa fa-mars" />
                  <Textarea
                    value={this.state.male}
                    name="male"
                    onChange={this.handleChange}
                    placeholder="World Heavyweight Championship, Cruiserweight Championship"
                    label="Mens"
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
                    value={this.state.female}
                    name="female"
                    onChange={this.handleChange}
                    placeholder={"Womens World Championship"}
                    label="Womens"
                  />
                </div>
              </SlideRight>
            </div>
          </div>
          <div>
            <button type="submit">
              Press that gold and move on!
            </button>
          </div>
        </form>
      </section>
    )
  }

  _generateDefaultChampions = event => {
    event.preventDefault

    if (confirm(CHAMPIONSHIP_RESET_CONFIRM)) {
      this.setState({
        ...constantDefaults.championships,
      })
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    let championships = []

    Object.keys(this.state).forEach(stateKey => {
      let male = stateKey === "male"

      let newChampionship = this.state[stateKey]
        .split(",")
        .filter(name => name.length > 2)
        .filter(String)
        .map(name => {
          return {
            name: name.trim(),
            male,
          }
        })

      championships = championships.concat(newChampionship)
    })
    this.props.dispatch(updateChampions(championships))
    this.props.router.push("/shows")
  }
}

ChampionsPage.contextTypes = {
  router: PropTypes.object.isRequired,
}

export default connect(state => ({
  animations: state.game.animations,
  championships: state.championships,
  roster: state.roster,
}))(ChampionsPage)
