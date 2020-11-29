import React from 'react'
import './css/style.css'
import './css/normalize.min.css'

const SpinnerView = () => {
    return (
        <div className="container-spin">
            <div className="body-spinner">
                    <div className='cssload-loader'></div>
                    <div className='cssload-inner cssload-one'></div>
                    <div className='cssload-inner cssload-two'></div>
                    <div className='cssload-inner cssload-three'></div>
            </div>
        </div>
    )
}
export default SpinnerView
