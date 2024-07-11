import Feed from '@components/Feed'
const Home = () => {
  return (
    <section className=" w-full flex-center flex-col">
      <h1 className=" head_text text-center">
        Create and explore
        <br className="max-md:hidden" />
        <span className=" orange_gradient text-center">
          {" "}
          Prompts
        </span>
      </h1>
      <p className=" text-md mt-5 text-neutral-500 text-center">
        Prompt-G is a website for coders to
        explore, create and share creative prompts
      </p>
      {/* <div className="flex max-sm:flex-col blue_gradient max-sm:gap-1 gap-4 pt-4">
      <h1>Demo account</h1>
      <p>Email : <span className=' orange_gradient'>demo97846@gmail.com</span></p>
      <p>Password : <span className="orange_gradient">Demo2212@</span></p>
      </div> */}
      
      <Feed />
      <div className="flex flex-col my-5 font-nunito font-semibold items-center justify-center gap-2">
        <div>Continue to explore</div>
        <div className='rounded-md border border-black bg-neutral-900 py-1.5 px-5 text-white transition-all hover:bg-white hover:text-black text-center text-sm font-nunito flex items-center justify-center'>Show more</div>
      </div>
    </section>
  );
};

export default Home;
