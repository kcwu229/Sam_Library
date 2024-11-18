import UserImage from "../assets/images/user.png";

function UserSection({ userLoggedIn }) {
  return userLoggedIn ? (
    <button>
      <img src={UserImage} className="w-8 h-8" />
    </button>
  ) : (
    <div className="mr-4">
      <a href="/login" className="px-4 py-2 text-sam-gray">
        Sign In
      </a>
      <a href="/sign-up">
        <button className="text-sam-gray px-4 py-2 rounded-2xl ml-4 bg-sam-orange">
          Sign Up
        </button>
      </a>
    </div>
  );
}

export default UserSection;
