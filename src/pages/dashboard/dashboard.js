import React from "react"
import { connect } from "react-redux"
import sortBy from "lodash.sortby"
import PropTypes from "prop-types"
import orderBy from "lodash.orderby"

import HeaderOne from "../../components/h1/h1"
import Simulator from "../../components/simulator"
import Wrestlers from "../../components/wrestlers/container"
import Ranking from "../../components/ranking/ranking"

import { COST_COLUMNS, RANKED_COLUMNS } from "../../constants/ranking"

import "./dashboard.scss"

export const DashboardPage = ({ style, expensiveWrestlers, cheapWrestlers, rankedMaleWrestlers, rankedFemaleWrestlers, }) => {
  return (
    <section className="page dashboard zoom">
      <HeaderOne>
        Dashboard{" "}
        <span className="medium-title">
          <Simulator />
        </span>
      </HeaderOne>
      <div className="row">
        <div className="col-xs-12 col-sm-6 col-lg-6">
          <div className="box">
            <Ranking style={style} amountToShow={10} rows={rankedMaleWrestlers} columns={RANKED_COLUMNS} title="Ranked Male Wrestlers" />
          </div>
        </div>
        <div className="col-xs-12 col-sm-6 col-lg-6">
          <div className="box">
            <Ranking style={style} amountToShow={10} rows={rankedFemaleWrestlers} columns={RANKED_COLUMNS} title="Ranked Female Wrestlers" />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 col-sm-6 col-lg-6">
          <div className="box">
            <Ranking style={style} amountToShow={5} rows={expensiveWrestlers} columns={COST_COLUMNS} title="Expensive Wrestlers" />
          </div>
        </div>
        <div className="col-xs-12 col-sm-6 col-lg-6">
          <div className="box">
            <Ranking style={style} amountToShow={5} rows={cheapWrestlers} columns={COST_COLUMNS} title="Cheaper Wrestlers" />
          </div>
        </div>
      </div>
      <Wrestlers style={style} />
    </section>
  )
}

DashboardPage.displayName = "DashboardPage"

DashboardPage.propTypes = {
  animations: PropTypes.bool.isRequired,
  cheapWrestlers: PropTypes.array.isRequired,
  expensiveWrestlers: PropTypes.array.isRequired,
  rankedFemaleWrestlers: PropTypes.array.isRequired,
  rankedMaleWrestlers: PropTypes.array.isRequired,
  style: PropTypes.object.isRequired,
}

export default connect(state => ({
  cheapWrestlers: sortBy(state.roster, "cost"),
  expensiveWrestlers: sortBy(state.roster, "cost").reverse(),
  rankedMaleWrestlers: orderBy(state.roster.filter(wrestler => wrestler.male), "points", "desc"),
  rankedFemaleWrestlers: orderBy(state.roster.filter(wrestler => !wrestler.male), "points", "desc"),
  roster: state.roster,
  iconColour: state.style.backgroundColor,
  ...state.game,
  style: state.style,
}))(DashboardPage)
