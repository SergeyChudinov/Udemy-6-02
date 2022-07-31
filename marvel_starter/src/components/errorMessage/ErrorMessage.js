import img from './error.gif'

{/* <img src={process.env.PUBLIC_URL + '/error.gif'} alt="" /> */}

const ErroeMessage = () => {
    return (
        <img style={{display: 'block', width: '250px', height: '250px', objectFit: 'contain', margin: '0 auto'}} src={img} alt="Error" />
    )
}

export default ErroeMessage;