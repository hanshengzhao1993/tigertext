// songs
const allSongs = [
  {
    name: 'imagine',
    level: 'easy',
    song: ['c', 'cmaj7', 'f', 'am', 'dm', 'g', 'e7']
  },
  {
    name: 'somewhere_over_the_rainbow',
    level: 'easy',
    song: ['c', 'em', 'f', 'g', 'am']
  },
  {
    name: 'tooManyCooks',
    level: 'easy',
    song: ['c', 'g', 'f']
  },
  {
    name: 'iWillFollowYouIntoTheDark',
    level: 'medium',
    song: ['f', 'dm', 'bb', 'c', 'a', 'bbm']
  },
  {
    name: 'babyOneMoreTime',
    level: 'medium',
    song: ['cm', 'g', 'bb', 'eb', 'fm', 'ab']
  },
  {
    name: 'creep',
    level: 'medium',
    song: ['g', 'gsus4', 'b', 'bsus4', 'c', 'cmsus4', 'cm6']
  },
  {
    name: 'paperBag',
    level: 'hard',
    song: ['bm7', 'e', 'c', 'g', 'b7', 'f', 'em', 'a', 'cmaj7', 'em7', 'a7', 'f7', 'b']
  },
  {
    name: 'toxic',
    level: 'hard',
    song: ['cm', 'eb', 'g', 'cdim', 'eb7', 'd7', 'db7', 'ab', 'gmaj7','g7']
  },
  {
    name: 'bulletproof',
    level: 'hard',
    song: ['d#m', 'g#', 'b', 'f#', 'g#m', 'c#']
  }
];

let songs = [];
let labels = {};
let allChords = [];
let labelProbabilities = {};
let chordCountsInLabels = {};
let probabilityOfChordsInLabels = {};
const numberOfSongs = allSongs.length;

const train = (song) => {
  if(labels[song.level] === undefined){
    labels[song.level] = 1;
  } else {
    labels[song.level]++;
  }
  songs.push([song.level, song.song]);
};
const setLabelProbabilities = (allLabels, probability, songNum) => {
  for(var key in allLabels){
    probability[key] = allLabels[key]/ songNum;
  }
};
const setChordCountsInLabels = (songsArray, chordLabelsObject) => {
  songsArray.forEach((song)=>{
    if(chordLabelsObject[song.level] === undefined){
      chordLabelsObject[song.level] = {};
    }
    song.song.forEach((lyric)=>{
      if(chordLabelsObject[song.level][lyric] === undefined){
        chordLabelsObject[song.level][lyric] = 1;
      } else {
        chordLabelsObject[song.level][lyric]++;
      }
    })
  })
}
const setProbabilityOfChordsInLabels = (labeledChords, probabilityChords) => {
  let totalCount = {};
  for(var key in labeledChords){
    totalCount[key] = Object.keys(labeledChords[key]).map((lyricKey)=>{return labeledChords[key][lyricKey]}).reduce((a,b)=>{return a + b} ,0)
  }
  for(var key in labeledChords){
    if(probabilityChords[key] === undefined){
      probabilityChords[key] = {};
    }
    for(var lyric in labeledChords[key]){
      probabilityChords[key][lyric] = labeledChords[key][lyric] / totalCount[key];
    }
  }
}

const classify = (chords, label) => {
  var classified = {};
  Object.keys(label).forEach(function(obj){
    var first = label[obj] + 1.01;
    chords.forEach(function(chord){
      var probabilityOfChordInLabel = probabilityOfChordsInLabels[obj][chord];
      if(probabilityOfChordInLabel === undefined){
        first + 1.01;
      } else {
        first = first * (probabilityOfChordInLabel + 1.01);
      }
    });
    classified[obj] = first;
  });
  console.log(classified);
};


// Loop through the object;
allSongs.forEach((song)=>{
  train(song);
})

setLabelProbabilities(labels, labelProbabilities, numberOfSongs);
setChordCountsInLabels(allSongs, chordCountsInLabels);
setProbabilityOfChordsInLabels(chordCountsInLabels, probabilityOfChordsInLabels);
classify(['d', 'g', 'e', 'dm'], labelProbabilities);
classify(['f#m7', 'a', 'dadd9', 'dmaj7', 'bm', 'bm7', 'd', 'f#m'], labelProbabilities);
