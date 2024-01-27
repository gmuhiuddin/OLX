import { useState } from 'react';
import NodeContext from '../nodeContext';

function NodeState(props) {

    const [userData, setUserData] = useState();
    const [user, setUser] = useState();
console.log(user);
    const updateUserData = (data) => {
        setUserData(data);
    };

    return(
        <NodeContext.Provider value={{userData, updateUserData, user, setUser}}>
            {props.children}
        </NodeContext.Provider>
    )
};

export default NodeState;