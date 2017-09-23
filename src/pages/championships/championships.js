import { connect } from "react-redux"
import PropTypes from "prop-types"
import React, { Component } from "react"

import { CHAMPIONSHIP_RESET_CONFIRM } from "../../constants/confirmations"

import { updateChampions, generateChampionships } from "../../actions/champions"
import GenerateRandom from "../../components/generate-random"
import Textarea from "../../components/form/textarea.js"
import HeaderOne from "../../components/h1/h1"
import Button from "../../components/button/button"

class ChampionshipsPage extends Component {
  displayName = "ChampionshipsPage"

  state = {
    male: "",
    female: "",
  }

  componentWillMount() {
    const { championships, } = this.props

    this.setState({
      male: championships.filter(champion => champion.male).map(champion => champion.name).join(", "),
      female: championships.filter(champion => !champion.male).map(champion => champion.name).join(", "),
    })
  }

  render() {
    return (
      <section className="page championships">
        <HeaderOne>
          What
          <span className="gold"> gold </span>
          do you have?! &nbsp;
          <GenerateRandom onClick={this._generateDefaultChampions} />
        </HeaderOne>
        <form onSubmit={this.handleSubmit}>
          <div className="row top-xs">
            <div className="col-xs-12 col-lg-6">
              <div className="box male">
                <Textarea
                  value={this.state.male}
                  name="male"
                  onChange={this.handleChange}
                  placeholder="World Heavyweight Championship, Cruiserweight Championship"
                  label="Mens"
                />
              </div>
            </div>
            <div className="col-xs-12 col-lg-6">
              <div className="box female">
                <Textarea value={this.state.female} name="female" onChange={this.handleChange} placeholder={"Womens World Championship"} label="Womens" />
              </div>
            </div>
          </div>
          <div>
            <Button onClick={this.handleSubmit} type="submit" value="Press that gold and move on!" />
          </div>
        </form>
      </section>
    )
  }

  _generateDefaultChampions = event => {
    event.preventDefault

    if (confirm(CHAMPIONSHIP_RESET_CONFIRM)) {
      this.props.dispatch(generateChampionships())
      this.redirect()
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

    const { dispatch, } = this.props

    Object.keys(this.state).forEach(stateKey => {
      let male = stateKey === "male"

      let newChampionship = this.state[stateKey].split(",").filter(name => name.length > 2).filter(String).map(name => {
        return {
          name: name.trim(),
          male,
        }
      })

      championships = championships.concat(newChampionship)
    })
    dispatch(updateChampions(championships))
    this.redirect()
  }

  redirect = () => {
    this.props.router.push("/default")
  }
}

ChampionshipsPage.propTypes = {
  championships: PropTypes.array,
  router: PropTypes.object,
  dispatch: PropTypes.func,
}

ChampionshipsPage.contextTypes = {
  router: PropTypes.object.isRequired,
}

export default connect(state => ({
  championships: state.championships,
  roster: state.roster,
}))(ChampionshipsPage)
