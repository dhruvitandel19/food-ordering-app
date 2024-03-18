import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import HomeCard from '../component/HomeCard'
import Cardfeature from '../component/Cardfeature'
import { GrPrevious, GrNext } from "react-icons/gr"
import FilterProduct from '../component/FilterProduct'




const Home = () => {
  const productData = useSelector((state) => state.product.productList)
  console.log(productData)
  const homeProductCartList = productData.slice(1, 5)
  const homeProductCartListVegetable = productData.filter(el => el.category === "vegetable", [])
  console.log(homeProductCartListVegetable)

  const loadingArray = new Array(4).fill(null)
  const loadingArrayFeature = new Array(10).fill(null)

  const slideProductRef = useRef()
  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200
  }
  const preveProduct = () => {
    slideProductRef.current.scrollLeft -= 200
  }

  const categoryList = [...new Set(productData.map(el => el.category))]
  console.log(categoryList)

  //filter data display
  const [filterby, setFilterBy] = useState("")
  const [dataFilter, setDataFilter] = useState(productData)

  useEffect(() => {
    setDataFilter(productData)
  }, [productData])


  const handleFilterProduct = (category) => {
    const filter = productData.filter(el => el.category.toLowerCase() === category.toLowerCase())
    setDataFilter(() => {
      return [
        ...filter
      ]
    })
  }
  return (
    <div className="p-2 md:p-4 ">
      <div className="md:flex gap-4 py-2">


        <div className=" md:w-1/2 ">
          <div className="flex gap-3 px-2 ">

          </div>
          <h2 className='md:text-7xl font-bold text-4xl  flex-col p-16  py-16'>HEALTY LIFE WITH  <span className="text-green-600  ">FRESH VEGGIE'S</span></h2>
          <p className=" py-1 text-base">Though the sight of a salad bowl is looked at with distaste, we all know the importance veggies play in having a healthy body.</p>
          <button className="font-bold bg-green-400 py-1 px-4 rounded-md ">Order Now</button>
        </div>
        <div className="md:w-1/2 flex flex-wrap gap-5 p-4 justify-center">
          {homeProductCartList[0]
            ? homeProductCartList.map((el) => {
              return (
                <HomeCard
                  key={el._id}
                  id={el._id}
                  image={el.image}
                  name={el.name}
                  price={el.price}
                  category={el.category}
                />
              );
            })
            : loadingArray.map((el, index) => {
              return (
                <HomeCard
                  key={index}
                  loading={"Loading..."}
                />
              )
            })

          }
        </div>
      </div>

      <div className="">
        <div className='flex w-full items-center'>
          <h2 className="font-bold text-2xl text-slate-800 mb-4 ">Fresh Vegetables</h2>
          <div className="ml-auto flex gap-4">
            <button onClick={preveProduct} className='bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded'><GrPrevious /></button>
            <button onClick={nextProduct} className='bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded'><GrNext /></button>
          </div>
        </div>
        <div className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all" ref={slideProductRef}>
          {
            homeProductCartListVegetable[0] ? homeProductCartListVegetable.map(el => {
              return (
                <Cardfeature
                  key={el._id}
                  id={el._id}
                  name={el.name}
                  category={el.category}
                  price={el.price}
                  image={el.image}
                />
              )
            })
              :
              loadingArrayFeature.map(el => <Cardfeature loading="Loading..." />)
          }
        </div>
      </div>

      <div className='my-5'>
        <h2 className="font-bold text-2xl text-slate-800 mb-4 ">Your Product</h2>
        <div className='flex justify-center '>
          {
            categoryList[0] && categoryList.map(el => {
              return (
                <FilterProduct category={el} onClick={() => handleFilterProduct(el)} />
              )
            })
          }

        </div>
        <div className='flex flex-wrap justify-center gap-4 my-4'>
          {
            dataFilter.map(el => {
              return (
                <Cardfeature
                  key={el._id}
                  id={el._id}
                  image={el.image}
                  name={el.name}
                  category={el.category}
                  price={el.price}
                />
              )
            })
          }
        </div>

      </div>
    </div>


  )
}

export default Home