import React, { Component } from "react"
import classNames from "classNames"
import PropTypes from "prop-types"
import { DropTarget } from "react-dnd"

const dustbinTarget = {
  drop(props, monitor) {
    props.onDrop(monitor.getItem())
  },
}

@DropTarget(props => props.accepts, dustbinTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))
export default class Team extends Component {
  static propTypes = {
    accepts: PropTypes.arrayOf(PropTypes.string).isRequired,
    canDrop: PropTypes.bool.isRequired,
    classes: PropTypes.string,
    teamId: PropTypes.string.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    onDrop: PropTypes.func.isRequired,
    onRemoveWrestler: PropTypes.func.isRequired,
    onSelectWinner: PropTypes.func.isRequired,
    wrestlers: PropTypes.array.isRequired,
  }
  render() {
    const {
      classes,
      teamId,
      connectDropTarget,
      wrestlers,
      onSelectWinner,
      onRemoveWrestler,
    } = this.props
    const hasWinner = wrestlers.find(wrestler => wrestler.winner)
    const hasManyWrestlers = wrestlers.length > 1
    const teamClasses = classNames(
      "team",
      "col-lg-6 col-sm-6 col-xs-12",
      {
        "has-winner": hasWinner,
      },
      {
        "has-many-wrestlers": hasManyWrestlers,
      }
    )

    return connectDropTarget(
      <div data-teamId={teamId} className={teamClasses}>
        <div className="box">
          <Choose>
            <When condition={wrestlers.length > 0}>
              {wrestlers.map(wrestler => {
                const key = `tw-${wrestler.id}`
                const trophyClasses = classNames("icon fa fa-trophy", {
                  active: wrestler.winner,
                })
                return (
                  <div
                    className="wrestler"
                    key={key}
                    data-wrestlerId={wrestler.id}
                  >
                    <span className="wrestler__name">
                      {wrestler.name}<sup>{wrestler.points}</sup>
                    </span>
                    &nbsp;
                    <span className="wrestler__icons">
                      <i
                        className="icon fa fa-trash"
                        title="Remove this wrestler from this match"
                        onClick={() => onRemoveWrestler(wrestler.id)}
                        aria-hidden="true"
                      />
                      &nbsp;
                      <i
                        className={trophyClasses}
                        title="Select the winner of the match"
                        onClick={() => onSelectWinner(wrestler.id)}
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                )
              })}
            </When>
            <Otherwise>
              Drop Wrestlers Here
            </Otherwise>
          </Choose>
        </div>
      </div>
    )
  }
}
