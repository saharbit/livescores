import { Fixture } from "../../../../shared/types";
import _ from "lodash";
import dayjs from "dayjs";

export function getFixturesByDate(fixtures: Fixture[]) {
    return _.groupBy(fixtures, (fixture: Fixture) =>
        dayjs(fixture.date).format("DD/MM/YYYY")
    );
}

export function getFixturesByLeague(fixtures: Fixture[]) {
    return _.groupBy(fixtures, (fixture) => fixture.league.id);
}