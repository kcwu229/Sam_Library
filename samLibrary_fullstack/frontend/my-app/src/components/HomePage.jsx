import LibraryImage from "../assets/images/library.png";

function HomePage() {
  return (
    <div>
      <div className="relative flex items-center justify-center min-h-screen">
        <img
          src={LibraryImage}
          alt="Library"
          className="absolute w-full h-full inset-0 object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-80"></div>
        <div className="relative z-10 text-center text-white">
          <br />
          <br />
          <h1 className="text-5xl font-bold opacity-90 w-3/5 text-left ml-24">
            <i>
              Every book holds a dream waiting to be discovered. Let your
              imagination soar as you turn each page.
            </i>
          </h1>
          <p className="ml-24 mt-10 text-3xl opacity-65 w-3/5 text-left mb-14">
            <i>Journey through stories that inspire and transform.</i>
          </p>
          <button className="absolute right-60 text-white p-4 rounded text-xl bg-sam-orange text-left mb-16">
            Explore
          </button>
        </div>
      </div>
      <br />
      <h1 class="flex items-center justify-center">
        <br />
        <b className="w-7/12 items-center  text-4xl">
          Welcome to Sam's Library
        </b>
      </h1>
      <br />
      <div className="flex items-center justify-center">
        <br />
        <p class="w-7/12 items-center text-lg">
          Welcome to Sam's Library, your ultimate online destination for book
          lovers! Here, we believe that every book is a gateway to new
          adventures and endless possibilities. Our extensive collection spans a
          variety of genres, from timeless classics to modern bestsellers,
          ensuring there’s something for everyone. Whether you're seeking
          inspiration, knowledge, or simply a way to escape reality, you'll find
          it within our virtual shelves. Join our vibrant community of readers,
          share your thoughts, and explore curated lists to discover your next
          great read. Dive into the enchanting world of literature and let your
          imagination take flight at Sam's Library!
        </p>
      </div>
      <br />
      <div className="flex items-center justify-center">
        <p class="w-7/12 items-center text-lg">
          With just a click, you can explore thousands of titles, immerse
          yourself in captivating stories, and connect with fellow book
          enthusiasts. Our intuitive platform ensures that your next great read
          is always at your fingertips. Join us today and transform your reading
          experience into an extraordinary adventure!
        </p>
      </div>
      <div style={{ marginTop: "30px" }}>
        <img
          src="https://via.placeholder.com/600x300"
          alt="Library"
          style={{ width: "100%", height: "auto", borderRadius: "10px" }}
        />
      </div>
      <div style={{ marginTop: "30px" }}>
        <h2>Explore Our Collection</h2>
        <p>
          We have a wide range of books from various genres. Dive in and find
          your next read!
        </p>
      </div>
      <div style={{ marginTop: "30px" }}>
        <h2>Join Our Community</h2>
        <p>
          Connect with fellow book lovers, participate in events, and much more.
        </p>
      </div>
    </div>
  );
}

export default HomePage;
