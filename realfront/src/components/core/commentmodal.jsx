import React, { useState } from 'react';

const CommentModal = () => {
    const [selectedRecipient, setSelectedRecipient] = useState('Result Ward');

    const handleSelectRecipient = (recipient) => {
        setSelectedRecipient(recipient);
    };

    return (
        <div>
            <button type="button" className="btn btn-info btn-sm" data-bs-toggle="modal" style={{ color: 'white' }} data-bs-target="#exampleModal">Comment</button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">New message</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3" style={{ textAlign: 'left' }}>
                                    <label htmlFor="recipient-name" className="col-form-label">Recipient:</label>
                                    <div className="dropdown">
                                        <button
                                            className="btn btn-outline-dark dropdown-toggle"
                                            type="button"
                                            id="dropdownMenuButton1"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            {selectedRecipient}
                                        </button>
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                            <li>
                                                <a className="dropdown-item" href="#" onClick={() => handleSelectRecipient('Home')}>Home</a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="#" onClick={() => handleSelectRecipient('Ward')}>Ward</a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="#" onClick={() => handleSelectRecipient('ICU')}>ICU</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="mb-3" style={{ textAlign: 'left' }}>
                                    <label htmlFor="message-text" className="col-form-label">Message:</label>
                                    <textarea className="form-control" id="message-text"></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Apply</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommentModal;