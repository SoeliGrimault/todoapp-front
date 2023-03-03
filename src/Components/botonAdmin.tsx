import './BotonAdmin.css';
const Boton = () => {
  return (
    <div className='dropdown-menu ddm1'>
      <input type='checkbox' name='toggle' id='toggle'></input>
      <label htmlFor='toggle'>Menu</label>
      <ul>
        <li>
          <a href='/user/interface' title='Do something'>
            Do something
          </a>
        </li>
        <li>
          <a href='/user/profile' title='Do something else'>
            Do something else
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Boton;
