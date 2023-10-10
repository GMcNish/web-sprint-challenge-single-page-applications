import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from 'react-router-dom';
import axios from "axios";
import * as yup from 'yup'

import Form from './Form'
import Home from './Home'
import Confirmation from './Confirmation'
import './App.css'

const initialValues = {
    name: '',
    size: '',
    top1: false,
    top2: false,
    top3: false,
    top4: false,
    special: ''
}

const initialErrors = {
    name: '',
    size: '',
    special: ''
}

const e = { // This is a dictionary of validation error messages.
  // username
  nameRequired: 'name is required',
  nameMin: 'name must be at least 2 characters',
  nameMax: 'name cannot exceed 20 characters',
  sizeRequired: 'You must choose a size',
  sizeOptions: 'select large, medium or small',
  specialMax: 'cannot exceed 50 characters'
}

const schema = yup.object().shape({
  name: yup.string().trim()
  .required(e.nameRequired)
  .min(2, e.nameMin).max(20, e.nameMax),
  size: yup.string()
    .required(e.sizeRequired).trim()
    .oneOf(['large', 'medium', 'small'], e.favFoodOptions),
  special: yup.string()
    .max(50, e.specialMax), 
  top1: yup.boolean(),
  top2: yup.boolean(),
  top3: yup.boolean(),
  top4: yup.boolean(),
})

const App = () => {
  const [values, setValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialErrors)

  const onSubmit = evt => {
    const newOrder = {
      name: values.name.trim(),
      size: values.size,
      special: values.special
    }

    if (!newOrder.name || !newOrder.size || !newOrder.special) return

    axios.post('https://reqres.in/api/orders', newOrder)
    setValues(initialValues)
  }

  const onChange = (name, value) => {
    
    setValues({ ...values, [name]: value});
    yup.reach(schema, name).validate(value)
      .then(() => setFormErrors({ ...formErrors, [name]: '' }))
      .catch((err) => setFormErrors({ ...formErrors, [name]: err.errors[0] }))
  }


  return (
    <div className="App">
      <nav>
        <h1 className="pizza-header">Bloomtech Eats</h1>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link id="order-pizza" to="pizza">Order Pizza</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route id="order-pizza" path="pizza/*" element={<Form 
          values={values}
          change={onChange}
          submit={onSubmit}
          errors={formErrors}
        />}>
          <Route path='confirmation' element={<Confirmation />} ></Route>
        </Route>
      </Routes>
      
    </div>
    
  );
};

export default App;
