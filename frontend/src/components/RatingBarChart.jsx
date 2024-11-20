import { FaStar } from "react-icons/fa";
function RatingBarChart() {
  // Example ratings data, replace with actual ratings data

  return (
    <div class="col-span-12 xl:col-span-4 flex items-center">
      <div class="box flex flex-col gap-y-4 w-full max-xl:max-w-3xl mx-auto">
        <div class="flex items-center w-full">
          <p class="font-medium text-lg py-[1px] text-black mr-[2px]">5</p>
          <FaStar className="text-yellow-700" />
          <p class="h-2 w-full sm:min-w-[278px] rounded-[30px] bg-gray-200 ml-5 mr-3">
            <span class="h-full w-[30%] rounded-[30px] bg-indigo-500 flex"></span>
          </p>
          <p class="font-medium text-lg py-[1px] text-black mr-[2px]">30</p>
        </div>
        <div class="flex items-center w-full">
          <p class="font-medium text-lg py-[1px] text-black mr-[2px]">4</p>
          <FaStar className="text-yellow-700" />
          <p class="h-2 w-full xl:min-w-[278px] rounded-[30px] bg-gray-200 ml-5 mr-3">
            <span class="h-full w-[40%] rounded-[30px] bg-indigo-500 flex"></span>
          </p>
          <p class="font-medium text-lg py-[1px] text-black mr-[2px]">40</p>
        </div>
        <div class="flex items-center">
          <p class="font-medium text-lg py-[1px] text-black mr-[2px]">3</p>
          <FaStar className="text-yellow-700" />
          <p class="h-2 w-full xl:min-w-[278px] rounded-[30px] bg-gray-200 ml-5 mr-3">
            <span class="h-full w-[20%] rounded-[30px] bg-indigo-500 flex"></span>
          </p>
          <p class="font-medium text-lg py-[1px] text-black mr-[2px]">20</p>
        </div>
        <div class="flex items-center">
          <p class="font-medium text-lg py-[1px] text-black mr-[2px]">2</p>
          <FaStar className="text-yellow-700" />
          <p class="h-2 w-full xl:min-w-[278px] rounded-[30px] bg-gray-200 ml-5 mr-3">
            <span class="h-full w-[16%] rounded-[30px] bg-indigo-500 flex"></span>
          </p>
          <p class="font-medium text-lg py-[1px] text-black mr-[2px]">16</p>
        </div>
        <div class="flex items-center">
          <p class="font-medium text-lg py-[1px] text-black mr-[2px]">1</p>
          <FaStar className="text-yellow-700" />
          <p class="h-2 w-full xl:min-w-[278px] rounded-[30px] bg-gray-200 ml-5 mr-3">
            <span class="h-full w-[8%] rounded-[30px] bg-indigo-500 flex"></span>
          </p>
          <p class="font-medium text-lg py-[1px] text-black mr-[2px]">8</p>
        </div>
      </div>
    </div>
  );
}

export default RatingBarChart;
