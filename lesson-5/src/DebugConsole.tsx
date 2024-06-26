import React, { useEffect, useState } from 'react';
import './DebugConsole.css';

const DebugConsole: React.FC = () => {
    const [logs, setLogs] = useState<string[]>([]);

    useEffect(() => {
        if (typeof console !== "undefined") {
            if (typeof console.log !== 'undefined') {
                console.olog = console.log;
            } else {
                console.olog = function () { };
            }
        }

        console.log = function (message) {
            console.olog && console.olog(message);
            setLogs(prevLogs => [...prevLogs, message]);

            setTimeout(() => {
                setLogs(prevLogs => prevLogs.slice(1));
            }, 3000);
        };
        console.error = console.debug = console.info = console.log;

        return () => {
            console.log = console.olog || console.log;
            console.error = console.debug = console.info = console.log;
        };
    }, []);

    return (
        <div id="debugDiv" className="debug-console">
            {logs.map((log, index) => (
                <div key={index} className="log-message">
                    {log}
                </div>
            ))}
        </div>
    );
};

export default DebugConsole;
