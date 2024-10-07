import React, { useEffect,useState } from 'react'
import { types,calculate } from '../api'
import { useParams } from 'react-router-dom'
import "../styles/statistic.css"
import { FaTrashAlt } from "react-icons/fa";

const StatisticTest = () => {

  const [type, setType] = useState(1)
  const { type : param } = useParams();
  const [data, setData] = useState(['0.00','0.00','0.00','0.00'])
  const [options, setOptions] = useState({alpha:0.05, k : 0})
  const [results, setResults] = useState({})
  const [showResults, setShowResults] = useState(false)

  const handleAdd = () => {
    setData([...data, '0.00'])
  }

  const handleChangeOption = (event,type) => {
    setOptions({...options, [type]: event.target.value})
  }

  const handleDelete = (index) => {
    const newData = [...data]
    newData.splice(index, 1)
    setData(newData)
  }

  const handleChange = (event, index) => {
    const newData = [...data]
    newData[index] = event.target.value
    setData(newData)
  }

  const handleSubmit = () => {
    const results = calculate(type.id, data,options)
    setResults(results);  
    setShowResults(true);
  }

  useEffect(() => {
    setType(types[param - 1]);
  },[param, type])


  return (
    <div className='section'>
      <div className="header">
        <h1>{type?.name}</h1>
      </div>
      <div className="content">
        <div className="subheader">
          <h3>Agrega Los Datos</h3>
        </div>
        <div className="form">
        <div className="row mb-5 g-0" >
            <div className="col-6">
              <div className="col-3">
                  <label for="inputPassword6" class="col-form-label">Alpha:</label>
                  </div>
                  <div className="col-8">
                    <input type="number" step={0.01}  className="form-control" value={options.alpha} onChange={(event) => handleChangeOption(event,'alpha')}/>
                  </div>
            </div>
            <div className="col-6">
              <div className="col-3">
                  <label for="inputPassword6" class="col-form-label">K:</label>
                  </div>
                  <div className="col-8">
                    <input type="number" step={1}  className="form-control" value={options.k} onChange={(event) => handleChangeOption(event,'k')}/>
                  </div>
            </div>
            
                  
          </div>
                
          <div className="row w-100">
          {data.map((item, index) => (
              <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12" >              
                <div className="row mb-5 g-0" key={index}>
                  <div className="col-3">
                  <label for="inputPassword6" class="col-form-label">Dato { index + 1}:</label>
                  </div>
                  <div className="col-8">
                    <input type="number" step={0.01}  className="form-control" value={item} onChange={(event) => handleChange(event, index)}/>
                  </div>
                  <div className="col-1">
                    <button className='btn btn-outline-dark' onClick={() => handleDelete(index)}><FaTrashAlt/></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="row ">
            <div className="col-6">
              <button className='btn btn-outline-primary' onClick={handleAdd}>Añadir</button>
            </div>
            <div className="col-6">
              <button className='btn btn-primary ' onClick={handleSubmit}>Calcular</button>

            </div>
          </div>
            
          </div>

            {showResults && (
              <div className="results-container">
                <div className="subheader">
                  <h3>Resultados</h3>
                </div>
                <div className="results">
                  <div className="row">
                    {results.map((item, index) => (
                      <div className="col-6" key={index}>
                        <h4>{item.title}: </h4>
                        <p>{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          
      </div>
    </div>
  )
}

export default StatisticTest
