var userSamples = [
  {
    username: 'kenny',
    pw: '1'
  },
  {
    username: 'lena',
    pw: '1'
  },
  {
    username: 'aileen',
    pw: '1'
  },
  {
    username: 'javier',
    pw: '1'
  }
];

var tripSamples = [{
  name: 'Family trip to Europe'
}]

var destinationSamples = [{
  name: 'London',
  startDate: new Date('11/02/2017'),
  endDate: new Date('11/05/2017'),
  lat: 51.509865,
  lng: -0.118092
},
{
  name: 'Paris',
  startDate: new Date('11/05/2017'),
  endDate: new Date('11/08/2017'),
  lat: 48.864716,
  lng: 2.349014
},
{
  name: 'Barcelona',
  startDate: new Date('11/09/2017'),
  endDate: new Date('11/11/2017'),
  lat: 41.390205,
  lng: 2.154007
}];

let reservationSample =[{
  name: 'Hilton',
  category: 'Hotel',
  referenceNumber: '6758440293423',
  date: new Date('11/02/2017')
},
{
  name: 'Marriot',
  category: 'Hotel',
  referenceNumber: '1111440293423',
  date: new Date('11/05/2017')
},
{
  name: 'Best Western',
  category: 'Hotel',
  referenceNumber: '3342440293423',
  date: new Date('11/09/2017')
}
];

let objectiveSample = [{
  name: 'Try local restaurant',
  category: 'Place',
  date: new Date('11/03/2017'),
  checked: 0
},
{
  name: 'Go to museum',
  category: 'Place',
  date: new Date('11/03/2017'),
  checked: 0
}];

let preparationSample = [{
  name: 'Take passport',
  dueDate: new Date('11/01/2017'),
  checked: 0
},
{
  name: 'Buy new luggage',
  dueDate: new Date('10/29/2017'),
  checked: 0
}];

module.exports.userSamples = userSamples;
