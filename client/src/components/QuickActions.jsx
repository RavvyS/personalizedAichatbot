import React from 'react';
import './QuickActions.css';

const QuickActions = ({ onAction }) => {
  const actions = [
    { label: '🚀 Projects', message: 'Tell me about your projects' },
    { label: '💼 Experience', message: 'What is your work experience?' },
    { label: '🛠️ Tech Stack', message: 'What technologies do you work with?' },
    { label: '🎓 Education', message: 'Tell me about your education' },
    { label: '📜 Certifications', message: 'What certifications do you have?' },
    { label: '📧 Contact', message: 'How can I contact you?' }
  ];

  return (
    <div className="quick-actions">
      {actions.map((action, index) => (
        <button
          key={index}
          className="quick-action-btn"
          onClick={() => onAction(action.message)}
        >
          {action.label}
        </button>
      ))}
    </div>
  );
};

export default QuickActions;