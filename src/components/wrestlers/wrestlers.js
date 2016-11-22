import React from "react"
import Wrestler from "../wrestler/wrestler"
import { Draggable } from "react-drag-and-drop"
import "./stylesheets/main"

const Wrestlers = ({
  title,
  wrestlers,
  canDragAndDrop = true
}) => {
  return (
    <div className="clearfix">
      <If condition={wrestlers.length > 0}>
        <h3 className="wrestlers__seperator">
          {title}
        </h3>
        <div className="wrestlers__container">
          {wrestlers.map((wrestler, key) => {
            return (
              <Draggable
                key={key}
                type="wrestler"
                enabled={canDragAndDrop}
                data={wrestler.id}>
                <Wrestler
                  key={key}
                  name={wrestler.name}
                />
              </Draggable>
            )
          })}
        </div>
      </If>
    </div>
  )
}

export default Wrestlers
