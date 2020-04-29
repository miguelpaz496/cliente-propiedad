import React from 'react';
import { connect } from 'react-redux'
import { allaptos } from '../../Actions'

const Aptos = ({data,inicio}) => {
  const aptos = data.getAptos;

//props.inicio(aptos)

    if(aptos){
        inicio(aptos)
    }

  if (!aptos) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1>Loading</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1>Users</h1>
          <table className="table mt-2">
            <thead>
              <tr>
                <th>#</th>
                <th>First name</th>
              </tr>
            </thead>
            <tbody>
              {aptos && aptos.map((apto, index) => (
                <tr key={index}>
                  <th scope="row">{index+1}</th>
                  <td>{apto.nomenclatura}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
};

const mapDispatchToProps = dispatch => ({

    inicio(aptos) {
        
        dispatch(allaptos(aptos))

    }
  
  })
  

export default connect(null,mapDispatchToProps)(Aptos);