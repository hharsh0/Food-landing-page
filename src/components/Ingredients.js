import React from 'react'
import SmallCard from './SmallCard'

function Ingredients({ data }) {
    console.log(data.extendedIngredients[0])
  return (
    <section class="text-gray-600 body-font">
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-col text-center w-full mb-20">
          <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Ingredients Required
          </h1>
          <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
            Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
            gentrify, subway tile poke farm-to-table. Franzen you probably
            haven't heard of them.
          </p>
        </div>
        {data.extendedIngredients.map((e) => {
            <SmallCard id={e.id} name={e.name} amount={e.measures.metric.amount} unit={e.measures.metric.unitLong} />
        })}
      </div>
    </section>
  );
}

export default Ingredients