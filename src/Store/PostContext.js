import { createContext, useState } from "react";

// Create the context
export const postContext = createContext(null);

function Post({ children }) {
    // useState inside the Post component
    const [postDetails, setPostDetails] = useState();

    return (
        <postContext.Provider value={{ postDetails, setPostDetails }}>
            {children}
        </postContext.Provider>
    );
}

export default Post;
