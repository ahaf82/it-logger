import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addTech } from '../../actions/techActions';
import M from 'materialize-css/dist/js/materialize.min.js'

const AddTechModal = ({ addTech }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const onSubmit = () => {
        if (firstName === '' || lastName === '') {
            M.toast({ html: 'Please enter a first and last name' })
        }
        addTech({
            firstName,
            lastName
        });

        M.toast({ html: `${firstName} ${lastName} was added as a tech` })

        setFirstName('');
        setLastName('');
    }

    return <div id="add-tech-modal" className="modal" style={modalStyle}>
        <div className="modal-content">
            <h4>Enter Technician</h4>
            <div className="row">
                <div className="input-field">
                    <input type="text" name="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} />
                </div>
                <label htmlFor="firstName" className="active">
                    First Name
                </label>
            </div>
            <div className="row">
                <div className="input-field">
                    <input type="text" name="lastName" value={lastName} onChange={e => setLastName(e.target.value)} />
                </div>
                <label htmlFor="lastName" className="active">
                    Last Name
                </label>
            </div>
        </div>
        <div className="modal-footer">
            <a href="#!" onClick={onSubmit} className="modal-close waves-effect waves-ligthen blue btn">Enter</a>
        </div>
    </div>
}

const modalStyle = {
    width: '75%',
    height: '75%'
}

AddTechModal.propTypes = {
    addTech: PropTypes.func.isRequired
}

export default connect(null, { addTech })(AddTechModal);
