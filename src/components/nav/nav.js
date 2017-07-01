import React from "react"
import { Link } from "react-router"
import { connect } from "react-redux"

import Animations from "../animations"
import Cash from "../cash/container"
import ColorPickers from "../color-pickers/color-pickers"
import defaultState from "./default.json"

import "./navigation.scss"

const Navigation = ({
  backgroundColor = "black",
  color = "white",
  navigation = defaultState,
}) => {
  const style = { backgroundColor, color, }
  return (
    <nav style={style} className="navigation">
      <ul className="navigation__list">
        {navigation.map((item, key) => {
          const title = { __html: item.title, }
          return (
            <li
              key={key}
              className={`navigation__item navigation--${item.url}`}
            >
              <Choose>
                <When condition={item.title === "Branding"}>
                  <ColorPickers />
                </When>
                <When condition={item.title === "Animations"}>
                  <Animations />
                </When>
                <When condition={item.title === "Cash"}>
                  <Cash />
                </When>
                <When condition={item.title === "Settings"}>
                  <Link to={item.url}>
                    <i className="icon fa fa-cog" style={style} />
                  </Link>
                </When>
                <Otherwise>
                  <Link className="pulse" style={{ color, }} to={item.url}>
                    <div dangerouslySetInnerHTML={title} />
                  </Link>
                </Otherwise>
              </Choose>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default connect(state => ({
  game: state.game,
  color: state.style.color,
  backgroundColor: state.style.backgroundColor,
}))(Navigation)
