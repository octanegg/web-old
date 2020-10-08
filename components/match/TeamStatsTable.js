import styles from "./TeamStatsTable.module.scss";

import numeral from "numeral";

const TeamStatsTable = (props) => {

    const IGNORED_FIELDS = ["goal_participation", "shooting_percentage", "mvp"];

    const renameFields = (value) => {
        const { isOverview } = props;

        switch (value) {
            case "shots":
                return isOverview ? "SHPG" : "Shots";
            case "goals":
                return isOverview ? "GPG" : "Goals";
            case "saves":
                return isOverview ? "SAPG" : "Saves";
            case "assists":
                return isOverview ? "APG" : "Assists";
            case "score":
                return isOverview ? "SPG" : "Score";
            case "rating":
                return "Rating";
        }
    }

    const { data, isOverview, orderBy } = props;
    const playersOrder = Object.keys(data).sort((a, b) => data[b][orderBy || "rating"] - data[a][orderBy || "rating"]);

    return <table className={styles.table}>
        <thead>
            <tr>
                <th>Player</th>
                {Object.keys(Object.values(data)[0]).filter(stat => !IGNORED_FIELDS.some(_ => _ === stat)).map(stat => <th key={stat}>{renameFields(stat)}</th>)}
            </tr>
        </thead>
        <tbody>
            {playersOrder.map(player => <tr key={player}>
                <td>{player}</td>
                {Object.entries(data[player]).filter(([stat, value]) => !IGNORED_FIELDS.some(_ => _ === stat)).map(([stat, value]) => <td key={`${player}|${stat}`}>{numeral(value).format(isOverview || stat === "rating" ? "0.00" : "0")}</td>)}
            </tr>)}
        </tbody>
    </table>;
}

export default TeamStatsTable;