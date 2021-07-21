import {gql} from "@apollo/client";

export const getLeaderboardPitching = gql`
    query LeaderboardPitching($input:FilterLeaderboardInput!)
    { leaderboard_pitching(input: $input)
    { leaderboard_pitching
    {
        pitcher_name
        pitch_type
        velocity
        spin_rate
        vertical_break
        horizontal_break
        pitcher_datraks_id
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
