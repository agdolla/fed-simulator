import { connect } from "react-redux"
import React, { Component } from "react"
import PropTypes from "prop-types"

class DefaultPage extends Component {
  componentWillMount() {
    const { championships, name, roster, router, started, untouched, } = this.props

    let pathName = "dashboard"

    if (started === false) {
      pathName = "/welcome"
    } else if (name === "") {
      pathName = "/name"
    } else if (untouched === true) {
      pathName = "/branding"
    } else if (roster.length === 0) {
      pathName = "/roster"
    } else if (championships.length === 0) {
      pathName = "/championships"
    }

    router.push(pathName)
  }

  render() {
    return null
  }
}

DefaultPage.displayName = "DefaultPage"

DefaultPage.contextTypes = {
  router: PropTypes.object.isRequired,
}

DefaultPage.propTypes = {
  started: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  untouched: PropTypes.bool.isRequired,
  roster: PropTypes.array.isRequired,
  championships: PropTypes.array.isRequired,
  router: PropTypes.object.isRequired,
}

export default connect(state => ({
  started: state.game.started,
  name: state.game.name,
  untouched: state.style.untouched,
  roster: state.roster,
  championships: state.championships,
}))(DefaultPage)
