
import { useState } from "react";
import ImageUploader from "../components/ImageUploader";
import MessageSender from "../components/MessageSender";
import { messageService } from "../services/messageService";
import type { NewMessage } from "../types/database";
import { useUser } from "../contexts/UserContexts";
import { pairService } from "../services/pairSercive";

export default function Dashboard(){
    const {user} = useUser();
    const [messageText, setMessageText] = useState<string>('');
    const [image, setImage] = useState<File|null>(null);


    const handleRemoveImage = () => {
        setImage(null);
    };

    const handleSend = async() => {
        if(!user){
            console.log('must login');
            return;
        }

        const pair = await pairService.pairById(user.id);
        const pairId = await pairService.getPairId(user.id);

        if(pairId && image && pair){        

            const img_url = await messageService.uploadImage(image,pairId)

            const newMessage : NewMessage = {
            from: user.id,
            to: pair,
            message: messageText,
            img_url: img_url
            }   
            await messageService.createMessage(newMessage);
        }
    };


    return(
        <div className="flex flex-col md:flex-row p-10 gap-10 h-screen justify-center items-center pb-30">
            <ImageUploader
                setImage={setImage}
                handleRemove = {handleRemoveImage}
                image={image}
            />
            <MessageSender
                setMessageText={setMessageText}
                handleSend={handleSend}
            />
        </div>
    );
}