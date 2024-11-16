function NavBarTag({ href, text, className, ariaCurrent }) {
  return (
    <li>
      {ariaCurrent ? (
        // If contains ariaCurrent, then it will be a normal link
        <a
          href={href}
          onClick={(e) => ""}
          class={`block py-2 px-3  text-lg text-stone-400 text-font-medium
          ${className} `}
        >
          {text}
        </a>
      ) : (
        // If does not have ariaCurrent, then it will be a normal link
        <a
          href={href}
          onClick={(e) => ""}
          class={`block py-2 px-3
               text-sam-black
                text-lg
                ${className}`}
          aria-current={ariaCurrent}
        >
          {text}
        </a>
      )}
    </li>
  );
}

export default NavBarTag;
