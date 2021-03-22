import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title }) => {
    const onClick = (e) => {
        console.log("Click")
    }

    return (
        <header className="header">
            <h1>{title}</h1>
            <Button color="green" text="Hello" onClick={onClick}/>
        </header>
    )
}

// Default props value
Header.defaultProps = {
    title: "Task Tracker"
}

// Define prop types
Header.propTypes = {
    title: PropTypes.string,
}

export default Header
