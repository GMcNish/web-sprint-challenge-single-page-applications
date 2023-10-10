import React from 'react'

export default function Form(props) {
  const {
    values,
    submit,
    change,
    errors
  } = props

  const onChange = evt => {
    let { type, name, value, checked } = evt.target
    value = type == 'checkbox' ? checked : value
    change(name, value)
  }

  const onSubmit = evt => {
    evt.preventDefault()
    submit()
  }
  
  return (
    <div className='form-list-wrapper'>
      <h1 className='pizza-header'>Build Your Own Pizza</h1>


      <form id='pizza-form' className='container' onSubmit={onSubmit}>

      <div className='errors'>
          <div>{errors.name}</div>
          <div>{errors.size}</div>
          <div>{errors.special}</div>
        </div>

        <div className="inputGroup">
          <label htmlFor='name-input' >Tell us your name!</label>
          <input 
            id='name-input'
            name='name'
            type='text'
            placeholder='Type name'
            value={values.name}
            onChange={onChange}
            
          /></div>
          <div className="inputGroup">
          <label htmlFor='sizeChoice'> Choice of Size</label>
          <select id='size-dropdown' name='size' value={values.size} onChange={onChange}>
            <option value='1'>Select</option>
            <option value='large'>Large</option>
            <option value='medium'>Medium</option>
            <option value='small'>Small</option>
          </select></div>

          <div className="inputGroup">
            <label> What Toppings? <br /><br />
              <input onChange={onChange} checked={values.top1} id='top1' type='checkbox' name='top1' />
              Pineapple
            </label>
            <label>
              <input onChange={onChange} checked={values.top2} id='top1' type='checkbox' name='top2' />
              Ham
            </label>
            <label>
              <input onChange={onChange} checked={values.top3} id='top1' type='checkbox' name='top3' />
              Bacon
            </label>
            <label>
              <input onChange={onChange} checked={values.top4} id='top1' type='checkbox' name='top4' />
              Extra Cheese
            </label>
          </div>

          <div className="inputGroup">
          <label htmlFor='special-text' >Any special instructions?</label><br />
          <input 
            id='special-text'
            name='special'
            type='textbox'
            placeholder='Type special instructions'
            value={values.special}
            onChange={onChange}
          />
          </div>

          
        
        
        <input type='submit' className="md-button order-button" id='order-button' />
      </form>
    </div>
  )
}