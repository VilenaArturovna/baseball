import {gql} from "@apollo/client";

export const getLeaderboardBatting = gql`
    query LeaderboardBatting($input:FilterLeaderboardInput!)
    { leaderboard_batting(input: $input)
    { leaderboard_batting {
        batter_name
        exit_velocity
        launch_angle
        distance
        batter_datraks_id
        age
        school {
            id
            name
        }
        teams {
            id
            name
        }
        favorite
    }
    }
    }
`
