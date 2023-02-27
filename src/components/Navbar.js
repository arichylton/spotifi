const Navbar = () => {
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark '>
      <div className='container-fluid '>
        <button
          className='navbar-toggler'
          type='button'
          data-mdb-toggle='collapse'
          data-mdb-target='#navbarCenteredExample'
          aria-controls='navbarCenteredExample'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <i className='fas fa-bars'></i>
        </button>

        <div
          className='collapse navbar-collapse justify-content-center'
          id='navbarCenteredExample'
        >
          <ul className='navbar-nav mb-2 mb-lg-0'>
            <li className='nav-item text-white'>
              <a className='nav-link active' aria-current='page' href='!#'>
                Home
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='!#'>
                Link
              </a>
            </li>

            <li className='nav-item dropdown'>
      

              <ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
                <li>
                  <a className='dropdown-item' href='!#'>
                    Action
                  </a>
                </li>
                <li>
                  <a className='dropdown-item' href='!#'>
                    Another action
                  </a>
                </li>
                <li>
                  <hr className='dropdown-divider' />
                </li>
                <li>
                  <a className='dropdown-item' href='!#'>
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
