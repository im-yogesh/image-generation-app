import React from 'react'

const Form = (props) => {
    const { handleSubmit, text, setText, setSize } = props;

    return (
        <form action="" className='d-flex flex-column' onSubmit={handleSubmit}>

            <input className='mb-4' type="text" placeholder='Enter some text...' value={text} onChange={e => setText(e.target.value)} />

            <select name="" id="" className='p-2 mb-4' onChange={e => setSize(e.target.value)}>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
            </select>

            <div className="btn-container">
                <button type="submit" className="btn btn-warning">Generate</button>
            </div>
        </form>
    )
}

export default Form