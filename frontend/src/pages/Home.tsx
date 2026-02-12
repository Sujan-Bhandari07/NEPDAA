import Post from "../components/herocomp/Post"
import Rightside from "../components/herocomp/Rightside"
import Story from "../components/herocomp/Story"

const Home = () => {
  console.log("hello")

  return (
<div className="home flex w-[80vw] gap-[4%] min-h-screen ">
  <div className="min-w-[60%] w-[60%] flex flex-col gap-4  ">
    <Story/>
    <Post/>
  </div>
  <div className=" w-full">
    <Rightside/>
  </div>
</div>
  )
}

export default Home