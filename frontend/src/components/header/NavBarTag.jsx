function NavBarTag({ href, text, className, ariaCurrent }) {
  return (
    <li>
      {ariaCurrent ? (
        // If contains ariaCurrent, then it will be a normal link
        <div className="p-1 bg-white rounded-xl font-medium hover:bg-sam-light-brown hover:text-white">
          <a
            href={href}
            onClick={(e) => null}
            className={`block py-2 px-3 bg-gray-600" font-bold
          ${className} `}
          >
            {text}
          </a>
        </div>
      ) : (
        // If does not have ariaCurrent, then it will be a normal link
        <div className="p-1 font-medium">
          <a
            href={href}
            onClick={(e) => null}
            className={`block p-1 py-2 px-3 text-sam-gray
                ${className}`}
            aria-current={ariaCurrent}
          >
            {text}
          </a>
        </div>
      )}
    </li>
  );
}

export default NavBarTag;
