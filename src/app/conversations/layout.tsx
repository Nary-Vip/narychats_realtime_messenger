import getConversastionList from "../actions/getConversation";
import SideBar from "../components/sidebar/SideBar";
import ConversationList from "./components/ConversationList";

export default async function ConversationLayout({children}:{children:React.ReactNode}){
    const conversationList = await getConversastionList()
    return(
        <SideBar>
            <div className="h-full">
                <ConversationList initialItems={conversationList}/>
                {children}
            </div>
        </SideBar>
    )
}