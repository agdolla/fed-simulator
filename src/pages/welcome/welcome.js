import React from "react"
import { Link } from "react-router"
import PropTypes from "prop-types"

import HeaderOne from "../../components/h1/h1"

import "./welcome.scss"

const noop = () => {}

const WelcomePage = ({ generateFederation = noop, }) => {
  return (
    <section className="page welcome">
      <HeaderOne>Welcome to Federation Simulator</HeaderOne>
      <div className="row">
        <div className="col-xs-12 highlight grow">
          <div className="box">
            <i className="icon fa fa-plus" /> <Link to="/name">I'll build this company from the ground up, dammit</Link>
          </div>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-xs-12 highlight grow">
          <div className="box" onClick={generateFederation}>
            <i className="icon fa fa-play" /> This is an invasion, create everything for me
          </div>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-xs-12 highlight shrink">
          <div className="box">
            <i className="icon fa fa-info-circle" />
            <ul>
              <li>Create and manage your roster</li>
              <li>Manage your own touring schedule</li>
              <li>Simulate random or created matches</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

WelcomePage.propTypes = {
  generateFederation: PropTypes.func.isRequired,
}

export default WelcomePage
