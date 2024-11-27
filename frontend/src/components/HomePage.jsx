import LibraryImage from "../assets/images/library.png";
import ArticleImage1 from "../assets/images/article1.png";
import ArticleImage2 from "../assets/images/article2.png";
import ArticleImage3 from "../assets/images/article3.png";
import { FaShieldAlt } from "react-icons/fa";
import { GrLicense } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function HomePage() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const articles = [
    {
      title: "The Future of Libraries in the Digital Age",
      date: "October 12, 2024",
      image: ArticleImage1,
    },
    {
      title: "Exploring the World of Fantasy Fiction",
      date: "September 25, 2024",
      image: ArticleImage2,
    },
    {
      title: "Top 10 Must-Read Books of 2024",
      date: "August 15, 2024",
      image: ArticleImage3,
    },
  ];

  function navigateBookPage() {
    navigate("/books");
  }

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div>
      <div className="relative flex items-center justify-center min-h-screen">
        <img
          src={LibraryImage}
          alt="Library"
          className="absolute w-full h-full inset-0 object-cover"
        />
        <div
          id="color-filter"
          className="absolute inset-0 bg-black opacity-80"
        ></div>
        <div className="relative z-10 text-center text-white">
          <br />
          <br />
          <h1 className="text-2xl md:text-5xl font-bold text-sam-gray opacity-90 w-3/5 text-left ml-32">
            <i className={`${visible ? "animate-fade delay-1000" : ""}`}>
              Every book holds a dream waiting to be discovered. Let your
              imagination soar as you turn each page.
            </i>
          </h1>
          <p className="ml-40 mt-10 md:text-3xl text text-sam-gray opacity-65 w-3/5 md:text-left mb-14">
            <i className={`${visible ? "animate-fade delay-1100" : ""}`}>
              Journey through stories that inspire and transform.
            </i>
          </p>

          <button
            onClick={navigateBookPage}
            className={`rounded-2xl absolute md:right-60 text-sam-gray p-4 md:font-light md:text-xl bg-sam-orange text-left mb-16 ${
              visible ? "animate-fade delay-3000" : ""
            }`}
          >
            Explore
          </button>
        </div>
      </div>
      <div className="w-full bg-sam-gray">
        <h1 className="flex items-center justify-center text-left">
          <b className="w-7/12 items-center text-4xl mt-10 text-sam-light-brown pt-20">
            Welcome
          </b>
        </h1>
        <br />
        <div className="flex items-center justify-center">
          <p className="w-7/12 items-center mt-10 text-gray-600 font-light">
            Dive into Sam's Library, your go-to online haven for book lovers!
            Here, every book opens the door to new adventures and endless
            possibilities. Our diverse collection, from timeless classics to the
            latest bestsellers, has something for everyone. Whether you're
            seeking inspiration or a thrilling escape, our virtual shelves are
            brimming with captivating stories.
          </p>
        </div>
        <br />
        <div className="flex items-center justify-center">
          <p className="w-7/12 items-center mb-10 text-gray-600 font-light">
            With just a click, explore thousands of titles and connect with a
            vibrant community of fellow readers. Discover your next great read
            today and transform your reading experience into an extraordinary
            adventure at Sam's Library! Let your imagination soar!
          </p>
        </div>
      </div>
      <br />
      <div className="w-full bg-white">
        <h1 className="flex items-center justify-center text-right pt-20">
          <b
            className="w-7/12 items-center text-4xl mt-20 text-gray-600"
            id="about"
          >
            About Us
          </b>
        </h1>
        <br />
        <div className="flex items-center justify-center">
          <p className="w-7/12 items-center mt-10 pb-20 text-gray-600 font-light">
            At Sam's Library, we celebrate the transformative power of stories.
            Our mission is to create a welcoming haven for readers, where every
            book serves as a portal to new adventures. With a carefully curated
            collection of diverse titles, we connect hearts and minds through
            the magic of storytelling. Whether you’re a seasoned bibliophile or
            just starting your reading journey, our community invites you to
            explore and discover. Join us in celebrating the joy of literature
            and let your next great adventure unfold at Sam's Library!
          </p>
        </div>
      </div>

      <div className="w-full bg-sam-gray pb-20">
        <h1 className="flex items-center justify-center text-sam-light-brown pt-20">
          <b className="w-7/12 items-center text-4xl mt-20" id="news">
            News and Articles
          </b>
        </h1>
        <br />
        <div className="flex items-center justify-center">
          <p className="w-7/12 items-center text-lg mt-10 pb-10 text-gray-600 font-light">
            Find the latest buzz in the literary world—new releases, author
            spotlights, and thought-provoking articles.
          </p>
          <br />
        </div>
        <div>
          <div className="flex flex-col items-center justify-center ">
            {articles.map((article, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-center mb-2 w-7/12 mt-10"
              >
                <div>
                  <img
                    src={article.image}
                    className="md:w-3/4 md:h-32 object-cover mr-4"
                  />
                </div>
                <div className="flex-grow text-left">
                  <p className="text-gray-600 font-normal">{article.date}</p>
                  <h2 className="text-2xl text-gray-600 font-medium">
                    {article.title}
                  </h2>
                </div>

                <div className="flex justify-end">
                  <button
                    className="mt-4 text-white px-6 py-2 md:ml-7 rounded-xl bg-lime-600"
                    onClick={(e) => {
                      alert("Coming soon!");
                    }}
                  >
                    Read
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full bg-white">
        <h1 className="flex items-center justify-center text-right pt-20">
          <b
            className="w-7/12 items-center text-4xl mt-20 text-gray-600"
            id="policy"
          >
            Privacy Policy
            <FaShieldAlt
              className="items-center text-8xl mt-20 text-lime-600"
              id="policy"
            />
          </b>
        </h1>

        <br />
        <div className="flex items-center justify-center">
          <p className="w-7/12 items-center text-lg mt-10 pb-1 text-gray-600 font-light">
            At Sam's Library, your privacy is our priority. This Privacy Policy
            outlines how we collect, use, and protect your personal information
            when you visit our website and interact with our services.
          </p>
        </div>
        <div className="flex items-center justify-center">
          <p className="w-7/12 items-center text-lg pb-20 text-gray-600 font-light">
            We may update this Privacy Policy periodically. Any changes will be
            posted on this page, and we encourage you to review it regularly.
            Thank you for trusting Sam's Library with your information. We are
            committed to protecting your privacy and enhancing your reading
            experience!
          </p>
        </div>
      </div>
      <div className="w-full bg-sam-gray">
        <h1 className="flex items-center justify-center text-left pt-20">
          <b
            className="w-7/12 items-center text-4xl mt-20 text-sam-light-brown"
            id="license"
          >
            Licensing
            <GrLicense className="items-center text-8xl mt-20 text-amber-400" />
          </b>
        </h1>

        <br />
        <div className="flex items-center justify-center">
          <p className="w-7/12 items-center text-lg mt-10 pb-10 text-gray-600 font-light">
            All content available on Sam's Library, including text, images, and
            multimedia, is protected by copyright and intellectual property
            laws. Users are granted a limited, non-exclusive license to access
            and use our materials for personal, non-commercial purposes only.
          </p>
        </div>
        <div className="flex items-center justify-center">
          <p className="w-7/12 items-center text-lg pb-20 text-gray-600 font-light">
            If you contribute articles, reviews, or other content to Sam's
            Library, you grant us a non-exclusive, royalty-free license to use,
            reproduce, and distribute your contributions on our platform and
            through our promotional channels.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
