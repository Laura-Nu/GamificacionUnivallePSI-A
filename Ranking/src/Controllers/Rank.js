import { Component } from 'react';

const ranks = {
  Bronce: { I: 0, II: 200, III: 400 },
  Plata: { I: 700, II: 900, III: 1100 },
  Oro: { I: 1400, II: 1600, III: 1800 },
  Platino: { I: 2100, II: 2300, III: 2500 },
  Diamante: { I: 2800, II: 3000, III: 3200 },
};

class Rank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: props.score,
    };
  }

  GetRank = () => {
    const { score } = this.props;
    let actualRank = '';
    let actualSubrank = '';

    for (const rank in ranks) {
      for (const subrank in ranks[rank]) {
        const pointsTo = ranks[rank][subrank];
        if (score >= pointsTo) {
          actualRank = rank;
          actualSubrank = subrank;
        } else {
          break;
        }
      }
    }
    var fullRank = actualRank + " " + actualSubrank;
    return { fullRank };
  };
}

export default Rank;
