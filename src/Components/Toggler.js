import './Common.css';

function Toggler(props) {

  return (
    <div className="toggler-wrapper">
        <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
            <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" value="b2b" checked={props.useCase === 'b2b'} onChange={props.onChange}/>
            <label class="btn btn-outline-primary btn-themed" for="btnradio1">B2B Mode</label>

            <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" value="b2c" checked={props.useCase === 'b2c'} onChange={props.onChange}/>
            <label class="btn btn-outline-primary" for="btnradio2">B2C</label>

        </div>
    </div>
  );
}

export default Toggler;
