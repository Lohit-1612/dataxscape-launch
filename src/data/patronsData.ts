export interface Patron {
  name: string;
  role: string;
  image: string;
}

export const PATRONS: Patron[] = [
  {
    name: 'Dr. P Chinnadurai',
    role: 'Secretary & Correspondent',
    image: '/images/patrons/chinnadurai.jpg',
  },
  {
    name: 'Dr. C SakthiKumar',
    role: 'Director',
    image: '/images/patrons/sakthikumar.jpg',
  },
  {
    name: 'Mrs. C Vijayarajeswari',
    role: 'Director',
    image: '/images/patrons/vijayarajeswari.jpg',
  },
  {
    name: 'Dr. Saranya Sree Sakthi Kumar',
    role: 'Director',
    image: '/images/patrons/saranya.jpg',
  },
];

export const CO_PATRONS: Patron[] = [
  {
    name: 'Dr. K. Mani',
    role: 'Principal',
    image: '/images/patrons/mani.jpg',
  },
  {
    name: 'Dr. S. Prasanna Devi',
    role: 'Chief Academic Officer',
    image: '/images/patrons/prasannadevi.jpg',
  },
];

export const CONVENER: Patron = {
  name: 'Dr. S. Malathi, M.E., Ph.D',
  role: 'Convener',
  image: '/images/patrons/malathi.jpg',
};
