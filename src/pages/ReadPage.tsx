import { useEffect, useState } from "react";
import type { NewMessage } from "../types/database";
import { useUser } from "../contexts/UserContexts";
import { messageService } from "../services/messageService";
import { Card } from "@heroui/react";
import { pairService } from "../services/pairSercive";

export default function ReadPage() {
    const {user, isLoading} = useUser();
    const [topMessage, setTopMessage] = useState<NewMessage | null>(null);

    const getTopMessage = async () => {
        if(!user){
            return;
        }

        const pair = await pairService.pairById(user.id);

        if(pair)
        {
            const message = await messageService.getMostRecentMessage(pair);
            setTopMessage(message);
        }
    }

    useEffect(()=>{
        getTopMessage();
    },[user, isLoading]);

    return(
        <div className="flex flex-col md:flex-row p-10 gap-10 h-screen justify-center items-center pb-30">
            <Card variant="secondary" className="p-2 max-w-sm flex justify-center items-center overflow-hidden">
                <img
                    className="max-h-full md:max-h-full w-auto rounded-xl object-contain"
                    src={topMessage?.img_url}
                    alt="Shared image"
                />
            </Card>
            <Card variant="secondary">
                {topMessage?topMessage.message:''}
            </Card>
        </div>
    );
}