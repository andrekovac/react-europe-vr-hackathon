import React, { Component } from 'react';
import {
  asset,
  Pano,
  Text,
  View,
  PointLight,
  SpotLight,
  AmbientLight,
  CylindricalPanel,
  Plane,
  Image,
} from 'react-vr';
import { graphql, gql } from 'react-apollo';

import Rain from './Rain';
import Sun from './Sun';

class Home extends Component {
  state = {
    textColor: 'blue',
    tintColor: 'purple',
    text: 'No data yet',
    event: null,
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

  renderPano = () => (
    <Pano
      source={asset('outdoors.jpg')}
      style={{ tintColor: this.state.tintColor }}
    />
  );

  renderLight = () => (
    <AmbientLight intensity={0} />
// <PointLight intensity={20} distance={40} style={{ color: 'red' }} />
  );

  renderMenu = () => {
    const { data } = this.props;

    return (
      <View style={{
        flex: 1,
        flexDirection: 'row',
        width: 4,
        alignItems: 'center',
        justifyContent: 'space-between',
        transform: [{translate: [-1, 1, -5]}],
      }}>
        <View
          style={{ margin: 0.3, height: 1, backgroundColor: '#53A1F4'}}
          onEnter={() => {
            this.setState({ event: '2016' });
            data.refetch();
          }}
          onExit={() => this.setState({
              textColor: 'white', tintColor: 'white' })}
        >
          <Image
            source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
            style={{width: 0.4, height: 0.4}}
          />
          <Text style={{fontSize: 0.4, textAlign: 'center', padding: 0.1}}>React Europe 2016</Text>
        </View>
        <View
          style={{ margin: 0.3, height: 1 , backgroundColor: '#53A1F4'}}
          onEnter={() => {
            this.setState({ event: '2017' });
            data.refetch();
          }}
          onExit={() => this.setState({
              textColor: 'white', tintColor: 'white' })}
        >
          <Image
            source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
            style={{width: 0.4, height: 0.4}}
          />
          <Text style={{fontSize: 0.4, textAlign: 'center', padding: 0.1}}>React Europe 2017</Text>
        </View>
      </View>
    );
  };

  renderReminder = () => (
    <Text
      style={{
        fontSize: 0.3,
        color: 'black',
        fontWeight: '300',
        textAlign: 'center',
        textAlignVertical: 'center',
        transform: [
          {translate: [0, 0, -3]},
        ],
      }}
    >
      ...pick an event
    </Text>
  );

  render() {
    const { data } = this.props;

    return (
      <View>
        {this.renderPano()}
        {this.renderMenu()}
        {!this.state.event && this.renderReminder()}
        <Rain start={this.state.event !== null} />
        <Sun
          schedule={data.events && data.events[0] && data.events[0].schedule}
          start={this.state.event !== null}
        />
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
      speakers {
        id,
        name,
        avatarUrl,
      },
    }
    venueCity
    venueAddress
    venueName
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
})(Home);
