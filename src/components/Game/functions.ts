import numbers from '../../data/numbers.json';
import sentences from '../../data/sentences.json';
import words from '../../data/words.json';

const _ = require('lodash');

export const shuffleList = (type: string) => {
  switch (type) {
    case 'words':
      return _.shuffle(words).slice(0, 150);
    case 'numbers':
      return _.shuffle(numbers).slice(0, 50);
    case 'sentences':
      let sentencesArray = _.shuffle(sentences);
      sentencesArray = sentencesArray.slice(0, 12);
      return sentencesArray;
    default:
      return _.shuffle(words).slice(0, 150);
  }
};
