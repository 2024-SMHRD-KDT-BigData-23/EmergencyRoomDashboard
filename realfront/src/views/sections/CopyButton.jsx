import React, { useState } from 'react';
import { Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import copyIcon from '../../assets/images/Copy-24.png';
// import '../../assets/scss/copybutton.scss';

const CopyButton = ({ text }) => {
    const [isCopied, setIsCopied] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    const handleCopy = (event) => {
        event.stopPropagation();
        navigator.clipboard.writeText(text);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const handleMouseEnter = () => {
        setShowTooltip(true);
    };

    const handleMouseLeave = () => {
        setShowTooltip(false);
    };

    return (
        <OverlayTrigger
            placement="top"
            overlay={<Tooltip>{isCopied ? 'Copied!' : 'Copy'}</Tooltip>}
            show={showTooltip}
        >
            <Button
                className="btn-light p-0 ms-1 copy-button"
                onClick={handleCopy}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <img src={copyIcon} alt="Copy Icon" width="19.38" height="19.38" style={{ verticalAlign: 'middle' }} />
            </Button>
        </OverlayTrigger>
    );
};

export default CopyButton;