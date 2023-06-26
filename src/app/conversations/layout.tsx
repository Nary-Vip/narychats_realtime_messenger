import getConversastionList from "../actions/getConversation";
import getUsers from "../actions/getUsers";
import SideBar from "../components/sidebar/SideBar";
import ConversationList from "./components/ConversationList";

export default async function ConversationLayout({children}:{children:React.ReactNode}){
    const conversationList = await getConversastionList()
    const users = await getUsers()
    
    return(
        <SideBar>
            <div className="h-full">
                <ConversationList users={users} initialItems={conversationList}/>
                {children}
            </div>
        </SideBar>
    )
}