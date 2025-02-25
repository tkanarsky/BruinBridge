const majors = [
  "Aerospace Engineering",
  "African American Studies",
  "African and Middle Eastern Studies",
  "American Indian Studies",
  "American Literature and Culture",
  "Ancient Near East and Egyptology",
  "Anthropology",
  "Applied Economics",
  "Applied Linguistics",
  "Applied Mathematics",
  "Applied Statistics",
  "Arabic",
  "Architectural Studies",
  "Art",
  "Art History",
  "Asian American Studies",
  "Asian Humanities",
  "Asian Languages and Linguistics",
  "Asian Religions",
  "Asian Studies",
  "Astrophysics",
  "Atmospheric and Oceanic Sciences",
  "Atmospheric and Oceanic Sciences/Mathematics",
  "Biochemistry",
  "Bioengineering",
  "Biology",
  "Biophysics",
  "Business Economics",
  "Central and East European Languages and Cultures",
  "Chemical Engineering",
  "Chemistry",
  "Chemistry/Materials Sciences",
  "Chicana and Chicano Studies",
  "Chinese",
  "Civil Engineering",
  "Classical Civilization",
  "Climate Sciences",
  "Cognitive Science",
  "Communication",
  "Comparative Literature",
  "Computational and Systems Biology",
  "Computer Engineering",
  "Computer Science",
  "Computer Science and Engineering",
  "Dance",
  "Data Theory",
  "Design | Media Arts",
  "Earth and Environmental Science",
  "Ecology, Behavior, and Evolution",
  "Economics",
  "Electrical Engineering",
  "Engineering Geology",
  "English",
  "Environmental Science",
  "Ethnomusicology",
  "European Studies",
  "Film & Television",
  "Financial Actuarial Mathematics",
  "French",
  "French and Linguistics",
  "Gender Studies",
  "General Chemistry",
  "Geography",
  "Geography/Environmental Studies",
  "Geology",
  "Geophysics",
  "German",
  "Global Jazz Studies",
  "Greek",
  "Greek and Latin",
  "History",
  "Human Biology and Society",
  "International Development Studies",
  "Iranian Studies",
  "Italian",
  "Italian and Special Fields",
  "Japanese",
  "Jewish Studies",
  "Korean",
  "Latin",
  "Latin American Studies",
  "Linguistics",
  "Linguistics and Anthropology",
  "Linguistics & Asian Languages & Culture",
  "Linguistics and Computer Science",
  "Linguistics and English",
  "Linguistics and French",
  "Linguistics and Italian",
  "Linguistics and Philosophy",
  "Linguistics and Psychology",
  "Linguistics and Scandinavian Languages",
  "Linguistics and Spanish",
  "Marine Biology",
  "Materials Engineering",
  "Mathematics",
  "Mathematics/Applied Science",
  "Mathematics for Teaching",
  "Mathematics of Computation",
  "Mathematics/Economics",
  "Mechanical Engineerings",
  "Microbiology, Immunology, and Molecular Genetics",
  "Middle Eastern Studies",
  "Molecular, Cell, and Developmental Viology",
  "Music",
  "Music Composition",
  "Music Education",
  "Musicology",
  "Neuroscience",
  "Nordic Studies",
  "Nursing",
  "Physiological Sciences",
  "Philosophy",
  "Physics",
  "Political Science",
  "Portugese",
  "Psychobiology",
  "Psychology",
  "Public Affairs",
  "Russian Language and Literature",
  "Russian Studies",
  "Scandinavian Languages and Culture",
  "Sociology",
  "Spanish",
  "Spanish and Community and Culture",
  "Spanish and Linguistics",
  "Spanish and Portugese",
  "Statistics",
  "Study of Religion",
  "Theater",
  "World Arts and Cultures"
];

let majorList = [];
for (var i = 0; i < majors.length; i++) {
  majorList.push({
    label: majors[i],
    value: majors[i]
  });
}

export { majorList };
