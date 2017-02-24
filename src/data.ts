/**
 * Created by githop on 2/23/17.
 */


export interface Shaper {
  id?: number
  first: string
  last: string
  imageFile: string
  bio: string
}

export let Shapers: Shaper[] = [
  {
    first: 'Tom',
    last: 'Hopkins',
    imageFile: require('./images/githopProf.jpg'),
    bio: ''
  },
  {
    first: 'Etan',
    last: 'Weiss',
    imageFile: require('./images/Etan - 17.jpg'),
    bio: 'I work for Crestone Capital as an Investment Analyst. I assist with a range of investment research services for Crestone, including investment manager reporting, monitoring and due diligence. Prior to joining Crestone, I completed four internships with Blue Ridge Capital in New York. I earned a Bachelor of Arts in sociology from Hamilton College. I moved to Boulder in late 2014, and joined Global Shapers in mid-2016. I also serve as a weekly volunteer for Attention Homes in Boulder.'
  },
  {
    first: 'Charlie',
    last: 'Kuhn',
    imageFile: '',
    bio: ''
  },
  {
    first: 'Matt ',
    last: 'Kobzik',
    imageFile: '',
    bio: ''
  },
  {
    first: 'Emma',
    last: 'Ruffin',
    imageFile: require('./images/emmaProfpic.jpg'),
    bio: 'Emma is a vision-holder and chief collaborator with C3 Boulder: The Climate Culture Collaborative, a community capacity building group that seeks to break down silos and bring people together for a magnified impact around climate action in Boulder. She also serves as the director of the Climate Action track with Impact Hub Boulder. She employs permaculture principals and Theory U into her everyday work and play, and loves to garden, create art, laugh with people and explore the wildness of ourselves and our planet. She believes that change happens at the local level, which is one of the many reasons why she was excited to co-create among peers in the Global Shapers Boulder Hub. She also serves as a mentor with the Youth Global Leaders program out of Philanthropiece. Her general motto: life I love you, all is groovy (thank you Simon and G-funk!)'
  },
  {
    first: 'Christopher',
    last: 'Senesi',
    imageFile: '',
    bio: ''
  },
  {
    first: 'Chris',
    last: 'Smith',
    imageFile: require('./images/cSmithProfpic.jpg'),
    bio: `Christopher Smith is a freelance web designer and content writer, and aspiring web developer. He graduated from the University of Colorado Boulder in May of 2014 with a BA in Chinese Languages and Civilizations. Shortly thereafter he relocated to Sichuan,China to teach English at a private university. However after a year abroad of travel and work the allure of Colorado's Front Range brought him back to Boulder where he is currently pursuing his personal and professional goals. When he is not traveling abroad you can find him holed up in your local coffee shop learning computer languages or planning his next adventure. He someday hopes to use web development as a tool to collaborate with companies and organizations engaged in conscious enterprise`,
  },
  {
    first: 'Molly',
    last: 'Ganley',
    imageFile: '',
    bio: ''
  },
  {
    first: 'Marissa',
    last: 'Sutera',
    imageFile: '',
    bio: ''
  },
  {
    first: 'Mascot',
    last: 'hey oh',
    imageFile: require('./images/mascotProfpic.png'),
    bio: ''
  }
];