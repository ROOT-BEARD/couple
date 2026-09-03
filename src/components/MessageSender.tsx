import { Card, TextArea, Button } from "@heroui/react";
import { SendHorizonal } from "lucide-react";

interface MessageSenderProps {
    handleSend:()=>void;
    setMessageText:(string:string)=>void;
};

export default function MessageSender({handleSend,setMessageText}:MessageSenderProps){
    return(
        <Card className="flex flex-col w-100">
            <TextArea
            onChange={(e)=>setMessageText(e.target.value)}
            placeholder="Send a Message..."
            variant='secondary'
            fullWidth/>
            <div className="flex w-full justify-end">
                <Button variant="outline" onClick={handleSend} className="hover:scale-110">
                    <SendHorizonal/>
                </Button>
            </div>
        </Card>
    );
}