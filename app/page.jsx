import Feed from '@components/Feed'
const Home = () => {
  return (
    <section className=" w-full flex-center flex-col">
      <h1 className=" head_text text-center">
        Discover and Share
        <br className="max-md:hidden" />
        <span className=" orange_gradient text-center">
          {" "}
          Ai Prompts
        </span>
      </h1>
      <p className=" desc text-center">
        Promptgpt is a open-source ai powered prompting tool for modern website to
        explore, create and share creative prompts
      </p>
      <div className="flex max-sm:flex-col blue_gradient max-sm:gap-1 gap-4 pt-4">
      <h1>Demo account</h1>
      <p>Email : <span className=' orange_gradient'>demo97846@gmail.com</span></p>
      <p>Password : <span className="orange_gradient">Demo2212@</span></p>
      </div>
      
      <Feed />
    </section>
  );
};

export default Home;
