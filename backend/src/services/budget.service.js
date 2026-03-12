// export const calculateBudget = (trip) => {

//   const baseFlight = {
//     Low: 300,
//     Medium: 600,
//     High: 1200
//   };

//   const hotelPerNight = {
//     Low: 40,
//     Medium: 100,
//     High: 250
//   };

//   const foodPerDay = {
//     Low: 20,
//     Medium: 50,
//     High: 120
//   };

//   const activityPerDay = {
//     Low: 15,
//     Medium: 40,
//     High: 100
//   };

//   const flights = baseFlight[trip.budgetType];

//   const accommodation = hotelPerNight[trip.budgetType] * trip.days;

//   const food = foodPerDay[trip.budgetType] * trip.days;

//   const activities = activityPerDay[trip.budgetType] * trip.days;

//   const total = flights + accommodation + food + activities;

//   return {
//     flights,
//     accommodation,
//     food,
//     activities,
//     total
//   };

// };