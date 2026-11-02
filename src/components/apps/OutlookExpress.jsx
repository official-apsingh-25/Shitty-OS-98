import React, { useState } from 'react';
import { useOS } from '../../context/OSContext';
import { initialEmails } from '../../data/emails1998';

export const OutlookExpress = () => {
  const { playSound } = useOS();

  // State to hold emails per folder
  const [emailStore, setEmailStore] = useState(initialEmails);
  const [currentFolder, setCurrentFolder] = useState('inbox');
  const [selectedEmailId, setSelectedEmailId] = useState(initialEmails.inbox[0]?.id || null);

  // New message compose modal state
  const [composeModal, setComposeModal] = useState(false);
  const [composeData, setComposeData] = useState({ to: '', subject: '', body: '' });

  // Compute folder counts
  const folderList = [
    {
      id: 'inbox',
      name: 'Inbox',
      icon: '📥',
      count: emailStore.inbox.filter((e) => !e.read).length,
      total: emailStore.inbox.length,
    },
    {
      id: 'sent',
      name: 'Sent Items',
      icon: '📤',
      count: 0,
      total: emailStore.sent.length,
    },
    {
      id: 'drafts',
      name: 'Drafts',
      icon: '📝',
      count: emailStore.drafts.length,
      total: emailStore.drafts.length,
    },
    {
      id: 'deleted',
      name: 'Deleted Items',
      icon: '🗑️',
      count: 0,
      total: emailStore.deleted.length,
    }
  ];

  const currentEmailList = emailStore[currentFolder] || [];
  const activeEmail = currentEmailList.find((e) => e.id === selectedEmailId) || currentEmailList[0] || null;

  // Handle selecting an email
  const handleSelectEmail = (mail) => {
    playSound('click');
    setSelectedEmailId(mail.id);

    // Mark as read
    if (!mail.read) {
      setEmailStore((prev) => ({
        ...prev,
        [currentFolder]: prev[currentFolder].map((e) =>
          e.id === mail.id ? { ...e, read: true } : e
        ),
      }));
    }
  };

  // Handle Sending a new message
  const handleSendMail = (e) => {
    e.preventDefault();
    if (!composeData.to || !composeData.subject) {
      alert('Please fill out recipient and subject.');
      return;
    }
    playSound('ding');
    const newMail = {
      id: `sent-${Date.now()}`,
      sender: 'alex.vance98@geocities.com',
      recipient: composeData.to,
      toName: composeData.to,
      subject: composeData.subject,
      date: '11/02/1998 04:30 PM',
      body: composeData.body,
    };
    setEmailStore((prev) => ({
      ...prev,
      sent: [newMail, ...prev.sent],
    }));
    setComposeModal(false);
    setComposeData({ to: '', subject: '', body: '' });
    alert('Message sent successfully via SMTP!');
  };

  return (
    <div className="flex-1 flex flex-col bg-win-gray font-w95 text-xs h-full select-none">
      {/* 1. Menu Bar */}
      <div className="flex items-center space-x-3 px-1.5 py-0.5 border-b border-win-dark text-black shrink-0">
        <span className="hover:bg-win-navy hover:text-white px-1 cursor-default">File</span>
        <span className="hover:bg-win-navy hover:text-white px-1 cursor-default">Edit</span>
        <span className="hover:bg-win-navy hover:text-white px-1 cursor-default">View</span>
        <span className="hover:bg-win-navy hover:text-white px-1 cursor-default">Tools</span>
        <span className="hover:bg-win-navy hover:text-white px-1 cursor-default">Message</span>
        <span className="hover:bg-win-navy hover:text-white px-1 cursor-default">Help</span>
      </div>

      {/* 2. Outlook Express Toolbar */}
      <div className="flex items-center space-x-1 px-1.5 py-1 border-b border-win-dark bg-win-gray shrink-0 overflow-x-auto no-scrollbar">
        <button
          onClick={() => { playSound('click'); setComposeModal(true); }}
          className="win-outset active:win-pressed px-2 py-0.5 bg-win-gray flex items-center space-x-1 font-bold shrink-0"
        >
          <span>✉️</span>
          <span>New Mail</span>
        </button>

        <button
          onClick={() => {
            playSound('ding');
            alert('Connected to POP3 server (mail.earthlink-dialup.net)... No new messages on server.');
          }}
          className="win-outset active:win-pressed px-2 py-0.5 bg-win-gray flex items-center space-x-1 shrink-0"
        >
          <span>🔄</span>
          <span>Send/Recv</span>
        </button>

        <div className="w-[1px] h-4 bg-win-dark mx-1 shrink-0" />

        <button
          onClick={() => {
            if (!activeEmail) return;
            playSound('click');
            setComposeData({
              to: activeEmail.sender || activeEmail.recipient || '',
              subject: `Re: ${activeEmail.subject}`,
              body: `\n\n--- Original Message (${activeEmail.date}) ---\n${activeEmail.body}`,
            });
            setComposeModal(true);
          }}
          disabled={!activeEmail}
          className={`win-outset active:win-pressed px-2 py-0.5 bg-win-gray shrink-0 ${
            !activeEmail ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Reply
        </button>

        <button
          onClick={() => {
            if (!activeEmail) return;
            playSound('click');
            setComposeData({
              to: '',
              subject: `Fwd: ${activeEmail.subject}`,
              body: `\n\n--- Forwarded Message ---\n${activeEmail.body}`,
            });
            setComposeModal(true);
          }}
          disabled={!activeEmail}
          className={`win-outset active:win-pressed px-2 py-0.5 bg-win-gray shrink-0 ${
            !activeEmail ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Forward
        </button>
      </div>

      {/* 3. Classic 3-Pane Interface */}
      <div className="flex-1 flex flex-col sm:flex-row overflow-hidden p-1 space-y-1 sm:space-y-0 sm:space-x-1">
        {/* Left Pane: Folders Tree */}
        <div className="w-full sm:w-40 win-inset bg-white p-1 sm:p-1.5 shrink-0 select-none overflow-x-auto sm:overflow-y-auto max-sm:max-h-20">
          <div className="hidden sm:flex font-bold text-[11px] mb-1.5 px-1 items-center space-x-1 text-blue-900 border-b border-gray-200 pb-1">
            <img src="/icons/outlook-express.svg" alt="" className="w-4 h-4 pixelated" />
            <span>Outlook Express</span>
          </div>

          <div className="flex sm:flex-col space-x-1 sm:space-x-0 sm:space-y-0.5">
            {folderList.map((folder) => {
              const isActive = currentFolder === folder.id;
              return (
                <button
                  key={folder.id}
                  onClick={() => {
                    playSound('click');
                    setCurrentFolder(folder.id);
                    setSelectedEmailId(emailStore[folder.id]?.[0]?.id || null);
                  }}
                  className={`shrink-0 text-left px-2 py-1 flex items-center justify-between cursor-default border sm:border-0 ${
                    isActive
                      ? 'bg-win-navy text-white font-bold border-black'
                      : 'hover:bg-blue-50 text-black font-normal border-gray-200 bg-gray-50 sm:bg-transparent'
                  }`}
                >
                  <span className="truncate flex items-center space-x-1.5 mr-1">
                    <span>{folder.icon}</span>
                    <span>{folder.name}</span>
                  </span>
                  {folder.count > 0 && (
                    <span className="text-[10px] font-bold">({folder.count})</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Split: Top Message Table + Bottom Preview */}
        <div className="flex-1 flex flex-col overflow-hidden space-y-1 min-h-0">
          {/* Top-Right Pane: Message List Table */}
          <div className="h-32 sm:h-44 win-inset bg-white overflow-y-auto overflow-x-auto shrink-0">
            <table className="min-w-full text-left text-xs border-collapse">
              <thead className="bg-win-gray sticky top-0 border-b border-win-dark select-none">
                <tr>
                  <th className="p-1 border-r border-win-dark w-6 text-center">!</th>
                  <th className="p-1 border-r border-win-dark w-44">From / To</th>
                  <th className="p-1 border-r border-win-dark">Subject</th>
                  <th className="p-1 w-36">Received</th>
                </tr>
              </thead>
              <tbody>
                {currentEmailList.length > 0 ? (
                  currentEmailList.map((mail) => {
                    const isSelected = selectedEmailId === mail.id;
                    const isUnread = mail.read === false;

                    return (
                      <tr
                        key={mail.id}
                        onClick={() => handleSelectEmail(mail)}
                        className={`cursor-default select-none border-b border-gray-100 ${
                          isSelected
                            ? 'bg-win-navy text-white'
                            : isUnread
                            ? 'font-bold bg-blue-50/40 text-black'
                            : 'hover:bg-blue-50 text-gray-800'
                        }`}
                      >
                        <td className="p-1 text-center">{isUnread ? '✉️' : '📄'}</td>
                        <td className="p-1 truncate max-w-[130px]">
                          {mail.fromName || mail.sender || mail.toName || mail.recipient}
                        </td>
                        <td className="p-1 truncate max-w-[220px]">
                          {mail.subject}
                        </td>
                        <td className="p-1 text-[11px] whitespace-nowrap">
                          {mail.date}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="4" className="p-4 text-center text-gray-400 italic">
                      There are no messages in this folder.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Bottom-Right Pane: Email Reading Area */}
          <div className="flex-1 win-inset bg-white p-3 overflow-y-auto select-text flex flex-col">
            {activeEmail ? (
              <div>
                {/* Vintage Header Area */}
                <div className="border border-gray-300 bg-gray-50 p-2 win-outset mb-3 text-xs space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-gray-600 w-16">From:</span>
                    <span className="text-blue-900 font-bold">{activeEmail.fromName || activeEmail.sender}</span>
                  </div>
                  {activeEmail.recipient && (
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-gray-600 w-16">To:</span>
                      <span className="text-black">{activeEmail.toName || activeEmail.recipient}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-gray-600 w-16">Date:</span>
                    <span className="text-black font-mono">{activeEmail.date}</span>
                  </div>
                  <div className="flex items-center space-x-2 border-t border-gray-200 pt-1">
                    <span className="font-bold text-gray-600 w-16">Subject:</span>
                    <span className="font-bold text-black">{activeEmail.subject}</span>
                  </div>
                </div>

                {/* Email Body */}
                <div className="text-xs whitespace-pre-wrap leading-relaxed font-sans text-gray-900 p-1">
                  {activeEmail.body}
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-400 italic select-none">
                Select a message to view its contents.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4. Bottom Status Bar */}
      <div className="h-5 px-2 flex items-center justify-between text-[11px] text-gray-700 bg-win-gray border-t border-win-dark shrink-0">
        <span>{currentEmailList.length} message(s) in {currentFolder}</span>
        <span>Connected to POP3/SMTP</span>
      </div>

      {/* 5. Compose New Email Dialog */}
      {composeModal && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/40 font-w95 p-2">
          <div className="w-[92vw] sm:w-[480px] max-w-[480px] bg-win-gray win-outset p-2 text-xs shadow-2xl">
            <div className="win-titlebar-active px-2 py-1 flex items-center justify-between text-white font-bold mb-2">
              <span>New Message - Outlook Express</span>
              <button
                onClick={() => setComposeModal(false)}
                className="win-outset active:win-pressed !p-0 w-3.5 h-3 text-[9px] text-black bg-win-gray"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSendMail}>
              <div className="space-y-1.5 mb-2">
                <div className="flex items-center">
                  <span className="w-16 font-bold text-gray-800">To:</span>
                  <input
                    type="email"
                    required
                    value={composeData.to}
                    onChange={(e) => setComposeData({ ...composeData, to: e.target.value })}
                    placeholder="recipient@1998.com"
                    className="flex-1 win-inset bg-white px-2 py-0.5 outline-none font-mono text-xs"
                    autoFocus
                  />
                </div>
                <div className="flex items-center">
                  <span className="w-16 font-bold text-gray-800">Subject:</span>
                  <input
                    type="text"
                    required
                    value={composeData.subject}
                    onChange={(e) => setComposeData({ ...composeData, subject: e.target.value })}
                    className="flex-1 win-inset bg-white px-2 py-0.5 outline-none font-sans text-xs"
                  />
                </div>
              </div>

              <div className="win-inset bg-white p-1 mb-2">
                <textarea
                  rows="9"
                  value={composeData.body}
                  onChange={(e) => setComposeData({ ...composeData, body: e.target.value })}
                  placeholder="Type your message here..."
                  className="w-full h-full outline-none resize-none font-sans text-xs text-black"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button type="submit" className="win-outset active:win-pressed px-4 py-1 bg-win-gray font-bold">
                  Send Mail
                </button>
                <button
                  type="button"
                  onClick={() => setComposeModal(false)}
                  className="win-outset active:win-pressed px-3 py-1 bg-win-gray"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OutlookExpress;
