import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import QuickColorPicker from "../color-pickers/color-picker"
import { updateStyle } from "../../actions/style"
import chromatism from "chromatism"

const noop = () => {}

import "./color-pickers.scss"

class ColorPickers extends React.Component {
  onChangeColor = color => {
    const newState = Object.assign({}, this.props.style, {
      color,
    })

    this.props.dispatch(updateStyle(newState))
  }

  onChangeBGColor = backgroundColor => {
    const newState = Object.assign({}, this.props.style, {
      backgroundColor,
    })

    this.props.dispatch(updateStyle(newState))
  }

  shouldComponentUpdate() {
    return true
  }

  render() {
    let { backgroundColor, color, } = this.props.style
    const borderColor = chromatism.mid(backgroundColor, color).hex
    const borderStyle = {
      border: `.33rem solid ${borderColor}`,
    }
    const colorContainer = {
      backgroundColor: color,
    }
    const bgColorContainer = {
      backgroundColor,
    }
    return (
      <div className="row around-xs colorPickers" style={borderStyle}>
        <div className="col-xs-6 col" style={bgColorContainer}>
          <QuickColorPicker onChange={this.onChangeBGColor} />
        </div>
        <div className="col-xs-6 col" style={colorContainer}>
          <QuickColorPicker onChange={this.onChangeColor} />
        </div>
      </div>
    )
  }
}

ColorPickers.displayName = "ColorPickers"

ColorPickers.propTypes = {
  onClick: PropTypes.func,
}

ColorPickers.defaultProps = {
  onClick: noop,
}

export default connect(state => ({
  style: state.style,
}))(ColorPickers)
