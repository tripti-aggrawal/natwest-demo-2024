import { render } from '@testing-library/react';
import { useState } from 'react';
import B2B from './B2B';
import './Common.css';
import Toggler from './Toggler';
import b2cLoanA from '../assets/loan-a.png';
import b2cLoanB from '../assets/loan-b.png';

function Widget(props) {

  const [useCase, setUseCase] = useState('b2b');
  
  const renderUseCase = () => {
    if (useCase === 'b2b') {
        return <B2B />
    } else {
        return <B2C />
    }
  }

  const handleEventChange = (changeEvent) => {
    setUseCase(changeEvent.target.value);
    props.updateAppState(changeEvent.target.value);
  }

  return (
    <div className={useCase === 'b2b' ? "widget-wrapper widget-b2b-pos" : "widget-wrapper widget-b2c-pos"}>
        <Toggler useCase={useCase} onChange={handleEventChange} />
        <div style={{marginBottom: '2rem'}}>
            { renderUseCase() }

            <br />
            <div className='powered-by'>
                <small>Powered by</small> <img src={require('../../src/assets/nw.svg').default} alt="natwest bank logo" height={"auto"} width={72} />
            </div>
        </div>


    </div>
  );
}

function B2C() {
    const types = [
        {type: 'Mortgage', icon: 'home'}, 
        {type: 'Car', icon: 'car'}, 
        {type: 'Marriage', icon: 'diamond'}, 
        {type: 'Personal', icon: 'user'}, 
    ];
    const [loanType, setLoanType] = useState('Mortgage');

    const onTypechange = (event) => {
        setLoanType(event.target.value);
    }
    return (
        <div className='b2c-wrapper'>
            <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
            {
                types.map((element, index) => {
                    return (
                        <>
                            <input type="radio" class="btn-check" name={"radio-"+element.type} id={"radio"+element.icon} autocomplete="off" value={element.type} checked={loanType === element.type} onChange={onTypechange} />
                            <label class="btn btn-outline-primary btn-themed" for={"radio"+element.icon}>
                                &nbsp;&nbsp;<i class={"fa fa-custom-size fa-"+element.icon} aria-hidden="true"></i>&nbsp;&nbsp;
                                {/* <small>{element.type}</small> */}
                            </label>
                        </>
                        // <div className="card text-bg-dark custom-card-prop">
                        //     <i class={"fa fa-custom-size fa-"+element.icon} aria-hidden="true"></i>
                        //     <p>{element.type}</p>
                        // </div>
                    )
                })
            }
            </div>

            <div class="card custom-card">
                <div class="card-body">
                    <h5 class="card-title"><strong>{loanType}, Hassle-free and quick!</strong></h5>
                    {/* <p class="card-text small-text"> - never easy before to check your eligibility and get quote without: </p> */}
                    <div className='img-placeholder' style={{backgroundImage: `url(${loanType === 'Mortgage' ? b2cLoanA: b2cLoanB} )`}}></div>
                    <ul className='small-text lighter-text'>
                        <li>Instant quote on approval</li>
                        <li>No agent fee or involved</li>
                        <li>Secure data guaranteed</li>
                        <li>Preventive use of credit scores</li>
                    </ul>
                    <a href="#" class="btn btn-outline-dark btn-lg mod-borders">Get a {loanType}</a>
                </div>
            </div>
        </div>
    )
}


export default Widget;
