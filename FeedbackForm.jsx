import React, { useState } from 'react';

function FeedbackForm() {
    const [feedback, setFeedback] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('/send-feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ feedback })
        });
        if (response.ok) {
            alert('Thank you for your feedback!');
            setFeedback('');  // Reset feedback field
        } else {
            alert('Failed to send feedback. Please try again later.');
        }
    };

    return (
        <div style={{ position: 'fixed', bottom: '60px', right: '20px', zIndex: 1000, background: 'white', padding: '10px', boxShadow: '0 2px 6px rgba(0,0,0,0.25)' }}>
            <h3>Feedback Form</h3>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Enter your feedback here..."
                    rows="4"
                    required
                    style={{ width: '300px' }}
                ></textarea>
                <br />
                <button type="submit">Send Feedback</button>
            </form>
        </div>
    );
}

export default FeedbackForm;
