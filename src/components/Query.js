import { graphql, gql } from 'react-apollo';

import Home from './Home';

const ScheduleData = graphql(gql`{
  feed (type: TOP, limit: 10) {
    repository {
      name, owner { login }
      # Uncomment the line below to get number of stars!
      # stargazers_count
    }
    postedBy { login }
  }
}`, { options: { notifyOnNetworkStatusChange: true } })(Home);

export default ScheduleData;
