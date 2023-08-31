const Search = () => {
  return (
    <header>
      <p className="header__subtitle">Discover & Secure Your Dream Domain Names</p>
      <h2 className="header__title">Journey starts with a Domain Name.</h2>
      <div className="header__search">
        <input
          type="text"
          className="header__input"
          placeholder="Find your domain"
        />
        <button
          type="button"
          className='header__button'
        >
          Buy It
        </button>
      </div>
    </header>
  );
}

export default Search;