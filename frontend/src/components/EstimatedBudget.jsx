import React from "react";

function EstimatedBudget({ budget }) {

  const flightsPercent = (budget.flights / budget.total) * 100;
  const hotelsPercent = (budget.accommodation / budget.total) * 100;
  const foodPercent = (budget.food / budget.total) * 100;
  const activitiesPercent = (budget.activities / budget.total) * 100;

  return (

    <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">

      <h3 className="text-2xl font-bold mb-6 text-gray-800">
        Estimated Budget
      </h3>

      <div className="grid lg:grid-cols-2 gap-10">

        {/* LEFT SIDE - BUDGET CARDS */}

        <div className="grid grid-cols-2 gap-4">

          <div className="bg-gray-50 p-5 rounded-xl shadow-sm hover:shadow-md transition text-center">
            <p className="text-gray-500">Flights ✈️</p>
            <p className="text-2xl font-bold text-blue-600">
              ${budget.flights}
            </p>
          </div>

          <div className="bg-gray-50 p-5 rounded-xl shadow-sm hover:shadow-md transition text-center">
            <p className="text-gray-500">Hotels 🏨</p>
            <p className="text-2xl font-bold text-green-600">
              ${budget.accommodation}
            </p>
          </div>

          <div className="bg-gray-50 p-5 rounded-xl shadow-sm hover:shadow-md transition text-center">
            <p className="text-gray-500">Food 🍜</p>
            <p className="text-2xl font-bold text-yellow-600">
              ${budget.food}
            </p>
          </div>

          <div className="bg-gray-50 p-5 rounded-xl shadow-sm hover:shadow-md transition text-center">
            <p className="text-gray-500">Activities 🎟️</p>
            <p className="text-2xl font-bold text-purple-600">
              ${budget.activities}
            </p>
          </div>

          <div className="col-span-2 bg-blue-600 text-white p-6 rounded-xl text-center shadow-lg">
            <p>Total Budget 💰</p>
            <p className="text-3xl font-bold">
              ${budget.total}
            </p>
          </div>

        </div>


        {/* RIGHT SIDE - BUDGET GRAPH */}

        <div className="space-y-5">

          <h4 className="text-lg font-semibold text-gray-700">
            Budget Distribution
          </h4>

          {/* Flights */}

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Flights</span>
              <span>{Math.round(flightsPercent)}%</span>
            </div>

            <div className="w-full bg-gray-200 h-3 rounded-full">
              <div
                className="bg-blue-500 h-3 rounded-full transition-all"
                style={{ width: `${flightsPercent}%` }}
              ></div>
            </div>
          </div>


          {/* Hotels */}

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Hotels</span>
              <span>{Math.round(hotelsPercent)}%</span>
            </div>

            <div className="w-full bg-gray-200 h-3 rounded-full">
              <div
                className="bg-green-500 h-3 rounded-full"
                style={{ width: `${hotelsPercent}%` }}
              ></div>
            </div>
          </div>


          {/* Food */}

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Food</span>
              <span>{Math.round(foodPercent)}%</span>
            </div>

            <div className="w-full bg-gray-200 h-3 rounded-full">
              <div
                className="bg-yellow-500 h-3 rounded-full"
                style={{ width: `${foodPercent}%` }}
              ></div>
            </div>
          </div>


          {/* Activities */}

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Activities</span>
              <span>{Math.round(activitiesPercent)}%</span>
            </div>

            <div className="w-full bg-gray-200 h-3 rounded-full">
              <div
                className="bg-purple-500 h-3 rounded-full"
                style={{ width: `${activitiesPercent}%` }}
              ></div>
            </div>
          </div>

        </div>

      </div>

    </div>

  );

}

export default EstimatedBudget;