import PropTypes from 'prop-types';
import WhatsAppButton from './WhatsAppButton';

const ActionButtons = ({ handleSubmit, isSubmitClicked, handleSendWhatsApp }) => (
    <div className="flex flex-col sm:flex-row gap-4 w-full mb-6">
        <button
            onClick={handleSubmit}
            className="flex-1 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-lg transition-transform transform duration-300 ease-in-out hover:bg-blue-600 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300 active:bg-blue-700 active:shadow-md text-sm uppercase"
            aria-label="Submit form"
            aria-live="polite"
        >
            Submit
        </button>
        <div className="flex-1">
            <WhatsAppButton
                isSubmitClicked={isSubmitClicked}
                handleSendWhatsApp={handleSendWhatsApp}
            />
        </div>
    </div>
);

ActionButtons.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    isSubmitClicked: PropTypes.bool.isRequired,
    handleSendWhatsApp: PropTypes.func.isRequired,
};

export default ActionButtons;