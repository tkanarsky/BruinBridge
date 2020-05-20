const interests = [
    "Sports",
    "Music",
    "Gaming",
    "Reading",
    "Writing",
    "Art",
    "Using Emacs :)",
    "Cooking",
]

let interestsList = [];
for (var i = 0; i < interests.length; i++) {
  interestsList.push({
    label: interests[i],
    value: interests[i]
  });
}

export { interestsList };