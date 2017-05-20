import React, { Component } from 'react';
import { Text, View, Sphere } from 'react-vr';
import { graphql, gql } from 'react-apollo';

import { ActivityIndicator } from 'react-native';

class Sun extends Component {
  state = {
    text: 'No data yet',
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.networkStatus === 1) {
      this.setState({ text: 'Nothing!' });
    } else if (nextProps.data.error) {
      this.setState({ text: 'Error!' });
    } else {
      this.setState({ text: 'Found something!' });
    }
  }

  render() {
    const { data: { events } } = this.props;

    return (
      <View>
        <Sphere
          radius={2}
          widthSegments={12}
          heightSegments={12}
          style={{
          color: 'yellow',
          transform: [{translate: [0, 10, -20]}],
        }}
        />
        <Text
          style={{
            backgroundColor: 'white',
            fontSize: 0.1,
            color: 'black',
            fontWeight: '300',
            layoutOrigin: [0.5, 0.5],
            paddingLeft: 0.3,
            paddingRight: 0.3,
            textAlign: 'center',
            textAlignVertical: 'center',
            transform: [{translate: [0, -0.2, -2]}],
          }}
        >
          { this.state.text }
          City:
          { events && events[0] && events[0].venueCity }
        </Text>
      </View>
    );
  }
};

const SCHEDULE_QUERY = gql`
  query schedule {
  events(slug: "reacteurope-2017") {
    schedule {
      title
      type
      startDate
      length
    }
    venueCity
    venueAddress
    venueName
    venueLatitude
    venueLongitude
  }
}`;


export default graphql(SCHEDULE_QUERY, {
  options: {
    // fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  },
  // props: ({ data: { events, networkStatus, error } }) => ({
  //   events, networkStatus, error
  // }),
})(Sun);
