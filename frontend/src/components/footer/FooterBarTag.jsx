function FooterBarTag({ href, text }) {
  return (
    <li>
      <a href={href} className="hover:underline me-4 md:me-6">
        {text}
      </a>
    </li>
  );
}

export default FooterBarTag;
