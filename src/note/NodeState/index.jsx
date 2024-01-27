import { useState } from 'react';
import NodeContext from '../nodeContext';

function NodeState(props) {

    const [userData, setUserData] = useState();

    const updateUserData = (data) => {
        setUserData(data);
    };

    return(
        <NodeContext.Provider value={{userData, updateUserData}}>
            {props.children}
        </NodeContext.Provider>
    )
};

export default NodeState;