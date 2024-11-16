function HomePage() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Welcome to Sam's Library</h1>
      <p>Your one-stop destination for all your reading needs.</p>
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
