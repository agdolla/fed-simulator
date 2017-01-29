import "./stylesheets/championship"
import { connect } from "react-redux"
import * as championshipActions from "../../../actions/championship"
import ChampionshipBelt from "../../../components/championship-belt/championship-belt"
import Checkbox from "../../../components/form/checkbox"
import ColourPicker from "../../../components/form/colour"
import Input from "../../../components/form/input"
import Model from "../../../reducers/championship.model"
import React from "react"
import Select from "../../../components/form/select"
import Skeleton from "./skeleton"

class CreationismChampionshipPage extends React.Component {

  displayName = "CreationismChampionshipPage"

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    brands: React.PropTypes.array.isRequired,
  }

  state = {
    currentOptionIndex: 0,
    currentItem: {
      ...new Model().toJSON(),
    },
  }

  changeHandler = (event, target) => {
    let newCurrentItem = Object.assign({}, this.state.currentItem)
    newCurrentItem[Skeleton[this.state.currentOptionIndex].key] = target

    this.setState({
      currentItem: new Model(newCurrentItem).toJSON(),
    })
  }

  componentDidMount() {
    document.onkeydown = (e) => {
      switch (e.keyCode) {
        case 37: // left
          this.onChangeCurrentOptionIndex(1)
          break
        case 39: // right
          this.onChangeCurrentOptionIndex(-1)
          break
      }
    }
  }

  onChangeCurrentOptionIndex = (value) => {
    let newIndex = this.state.currentOptionIndex + value

    if (newIndex === -1) {
      newIndex = Skeleton.length - 1
    } else if (newIndex === Skeleton.length) {
      newIndex = 0
    }
    this.setState({
      currentOptionIndex: newIndex,
    })
  }

  onSave = () => {
    this.props.dispatch(
      championshipActions.create(
        this.state.currentItem,
      )
    )
  }

  render() {
    const currentOption = Skeleton[this.state.currentOptionIndex]
    const currentValue = this.state.currentItem[currentOption.key]
    let values = {
      label: currentOption.label,
      name: currentOption.key,
      defaultValue: currentValue,
      value: currentValue,
      changeHandler: this.changeHandler,
      showPreview: false,
    }
    return (
      <main className="page-section creationism-championship">
        <div className="inpage-content">
          <div className="row between-xs arrows__container">
            <div className="col-xs-1 start-xs arrow__left">
              <div className="box">
                <i onClick={() => this.onChangeCurrentOptionIndex(1)}
                  className="fa fa-arrow-left"
                  aria-hidden="true"></i>
              </div>
            </div>
            <div className="col-xs-10 center-xs middle-xs championship-belt">
              <div className="box">
                <ChampionshipBelt {...this.state.currentItem} />
                <div className="row options">
                  <div className="col-xs-12">
                    <div className="box">
                      <Choose>
                        <When condition={currentOption.type === "color"}>
                          <ColourPicker
                            color={currentValue}
                            {...values} />
                        </When>
                        <When condition={currentOption.type === "input"}>
                          <Input value={currentValue}
                            maxLength={50}
                            {...values} />
                        </When>
                        <When condition={currentOption.type === "select"}>
                          <Select options={currentOption.options}
                            {...values} />
                        </When>
                        <When condition={currentOption.type === "checkbox"}>
                          <div>
                            <Checkbox options={currentOption.options}
                             {...values} />
                          </div>
                        </When>
                      </Choose>
                    </div>
                  </div>
                </div>
                <div className="row options">
                  <button className="btn" onClick={this.onSave}>
                    Create Championship
                  </button>
                </div>
              </div>
            </div>
            <div className="col-xs-1 end-xs arrow__right">
              <div className="box">
                <i onClick={() => this.onChangeCurrentOptionIndex(-1)}
                  className="fa fa-arrow-right"
                  aria-hidden="true"></i>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default connect(state => ({
  brands: state.brands,
}))(CreationismChampionshipPage)
