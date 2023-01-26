import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as Point from '../../Logic/PointsCounting/Point';
import { Score } from '../../Logic/PointsCounting/Score';

export type PlayerScoreProps = {
  playerName : string,
  score : Score,
  isTiebreak : boolean
}

export class PlayerScore extends React.Component<PlayerScoreProps> {
  constructor(props: PlayerScoreProps) {
    super(props);
  }

  render(): React.ReactNode {
    return (
      <View style={styles.container}>
        <Text style={styles.name}>{this.props.playerName}</Text>
        <Text style={styles.score}>
          { createScoreView(this.props.score, this.props.isTiebreak) }
        </Text>
      </View>
    );
  }
}

const createScoreView = (score : Score, isTiebreak : boolean) => {
  return isTiebreak ?
    `${score.sets} | ${score.gems} | ${score.pts}` :
    `${score.sets} | ${score.gems} | ${Point.Point.pointToStr(score.pts)}`;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  name: {
    marginVertical: 5,
    fontSize: 25
  },

  score: {
    marginVertical: 5,
    fontSize: 25
  }
});
